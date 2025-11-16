import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    deviceHash: v.string(),
    ip: v.string(),
    reason: v.string(),
    timestamp: v.number(),
    bannedUntil: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("bans", args);
  },
});