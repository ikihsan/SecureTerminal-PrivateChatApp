import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const getByUsername = query({
  args: {
    username: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
  },
});

export const getById = query({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
export const create = mutation({
  args: {
    realName: v.string(),
    username: v.string(),
    email: v.string(),
    passwordHash: v.string(),
    connectionCode: v.string(),
    createdAt: v.number(),
    settings: v.any(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", args);
  },
});