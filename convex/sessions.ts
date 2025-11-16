import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    userId: v.id("users"),
    createdAt: v.number(),
    lastSeen: v.number(),
    deviceHash: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("sessions", args);
  },
});