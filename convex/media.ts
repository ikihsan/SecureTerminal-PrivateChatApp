import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

export const generateUploadUrl = action({
  args: {
    ttlSec: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getStorageUrl = action({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});