import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

export const authorizeEntryCode = action({
  args: {
    code: v.string(),
    deviceHash: v.string(),
    ip: v.string(),
  },
  handler: async (ctx, args) => {
    // Fixed entry code for demo
    const correctCode = "anonymous";

    if (args.code === correctCode) {
      return { status: "ok" };
    }

    // Increment attempts
    const existing = await ctx.runQuery(api.attempts.getByDeviceIp, { deviceHash: args.deviceHash, ip: args.ip });
    let count = 1;
    if (existing) {
      count = existing.count + 1;
    }

    if (count >= 3) {
      // Ban
      await ctx.runMutation(api.bans.create, {
        deviceHash: args.deviceHash,
        ip: args.ip,
        reason: "code_fail_3",
        timestamp: Date.now(),
        bannedUntil: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      return { status: "banned", attemptsLeft: 0 };
    } else {
      // Update attempts
      await ctx.runMutation(api.attempts.upsert, {
        deviceHash: args.deviceHash,
        ip: args.ip,
        count,
        lastAttempt: Date.now(),
        ttl: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      });
      return { status: "fail", attemptsLeft: 3 - count };
    }
  },
});