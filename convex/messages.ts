import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getByConversation = query({
  args: {
    conversationId: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("conversationId"), args.conversationId))
      .filter((q) => q.or(q.eq(q.field("expiresAt"), undefined), q.gt(q.field("expiresAt"), now)))
      .collect();
    console.log(`Messages for conversation ${args.conversationId}:`, messages);
    return messages;
  },
});

export const getMedia = query({
  args: {
    id: v.id("media"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const send = mutation({
  args: {
    conversationId: v.string(),
    text: v.string(),
    authorId: v.id("users"),
    mediaMeta: v.optional(v.object({
      storageId: v.optional(v.id("_storage")),
      url: v.optional(v.string()),
      mime: v.string(),
      size: v.number(),
      ttlSec: v.number(),
      expiresAt: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      authorId: args.authorId,
      text: args.text,
      mediaMeta: args.mediaMeta,
      createdAt: Date.now(),
      expiresAt: args.mediaMeta ? Date.now() + args.mediaMeta.ttlSec * 1000 : undefined,
    });
    if (args.mediaMeta) {
      await ctx.db.insert("media", {
        storageId: args.mediaMeta.storageId!,
        uploadedBy: args.authorId,
        uploadedAt: Date.now(),
        ttlSec: args.mediaMeta.ttlSec,
        expiresAt: args.mediaMeta.expiresAt,
      });
    }
    console.log(`Message sent:`, { messageId, ...args });
    return messageId;
  },
});

export const createMedia = mutation({
  args: {
    storageId: v.id("_storage"),
    uploadedBy: v.id("users"),
    ttlSec: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("media", {
      storageId: args.storageId,
      uploadedBy: args.uploadedBy,
      uploadedAt: Date.now(),
      ttlSec: args.ttlSec,
      expiresAt: Date.now() + args.ttlSec * 1000,
    });
  },
});