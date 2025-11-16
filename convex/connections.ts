import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createRequest = mutation({
  args: {
    targetUsername: v.string(),
    connectionCode: v.string(),
    currentUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Find target user
    const targetUser = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.targetUsername))
      .first();
    if (!targetUser || targetUser.connectionCode !== args.connectionCode) {
      throw new Error("Invalid username or connection code");
    }
    const existing = await ctx.db
      .query("connections")
      .withIndex("by_users", (q) => q.eq("userA", args.currentUserId).eq("userB", targetUser._id))
      .first();
    if (existing) {
      throw new Error("Already connected");
    }
    // Insert the connection from current to target
    // Insert the connection from current to target
    const conversationId = [args.currentUserId, targetUser._id].sort().join('-');
    await ctx.db.insert("connections", {
      userA: args.currentUserId,
      userB: targetUser._id,
      createdAt: Date.now(),
      status: "connected",
      conversationId,
    });
    // Check if reverse exists
    const reverse = await ctx.db
      .query("connections")
      .withIndex("by_users", (q) => q.eq("userA", targetUser._id).eq("userB", args.currentUserId))
      .first();
    if (!reverse) {
      // Insert reverse
      await ctx.db.insert("connections", {
        userA: targetUser._id,
        userB: args.currentUserId,
        createdAt: Date.now(),
        status: "connected",
        conversationId,
      });
    }
  },
});

export const getConnections = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const allConnections = await ctx.db
      .query("connections")
      .filter((q) => q.eq(q.field("userA"), args.userId) || q.eq(q.field("userB"), args.userId))
      .collect();

    // Filter for mutual connections: only include if both directions are "connected"
    const mutualConnections = [];
    for (const conn of allConnections) {
      if (conn.status !== "connected") continue;
      const otherUserId = conn.userA === args.userId ? conn.userB : conn.userA;
      const reverse = await ctx.db
        .query("connections")
        .withIndex("by_users", (q) => q.eq("userA", otherUserId).eq("userB", args.userId))
        .filter((q) => q.eq(q.field("status"), "connected"))
        .first();
      if (reverse) {
        mutualConnections.push(conn);
      }
    }

    return await Promise.all(mutualConnections.map(async (conn) => {
      const userA = await ctx.db.get(conn.userA);
      const userB = await ctx.db.get(conn.userB);
      const conversationId = [conn.userA, conn.userB].sort().join('-');
      return {
        ...conn,
        userAName: userA?.realName || "Unknown",
        userBName: userB?.realName || "Unknown",
        conversationId,
      };
    }));
  },
});