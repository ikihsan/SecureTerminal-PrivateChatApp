import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getByDeviceIp = query({
  args: {
    deviceHash: v.string(),
    ip: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("attempts")
      .withIndex("by_device_ip", (q) => q.eq("deviceHash", args.deviceHash).eq("ip", args.ip))
      .first();
  },
});

export const upsert = mutation({
  args: {
    deviceHash: v.string(),
    ip: v.string(),
    count: v.number(),
    lastAttempt: v.number(),
    ttl: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("attempts")
      .withIndex("by_device_ip", (q) => q.eq("deviceHash", args.deviceHash).eq("ip", args.ip))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
    } else {
      await ctx.db.insert("attempts", args);
    }
  },
});