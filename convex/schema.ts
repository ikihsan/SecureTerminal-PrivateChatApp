import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    realName: v.string(),
    username: v.string(),
    email: v.string(),
    passwordHash: v.string(),
    connectionCode: v.string(),
    createdAt: v.number(),
    settings: v.any(),
    bannedUntil: v.optional(v.number()),
  })
    .index("by_username", ["username"])
    .index("by_email", ["email"]),

  sessions: defineTable({
    userId: v.id("users"),
    createdAt: v.number(),
    lastSeen: v.number(),
    deviceHash: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_device", ["deviceHash"]),

  connections: defineTable({
    userA: v.id("users"),
    userB: v.id("users"),
    createdAt: v.number(),
    status: v.union(v.literal("connected"), v.literal("blocked"), v.literal("pending")),
    conversationId: v.optional(v.string()),
  })
    .index("by_users", ["userA", "userB"]),

  rooms: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    members: v.array(v.id("users")),
    createdAt: v.number(),
    isPublic: v.boolean(),
  })
    .index("by_owner", ["ownerId"]),

  channels: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    createdAt: v.number(),
    readOnly: v.boolean(),
  })
    .index("by_owner", ["ownerId"]),

  messages: defineTable({
    roomId: v.optional(v.id("rooms")),
    channelId: v.optional(v.id("channels")),
    conversationId: v.optional(v.string()),
    privateConversationId: v.optional(v.string()),
    authorId: v.optional(v.id("users")),
    text: v.optional(v.string()),
    mediaMeta: v.optional(v.object({
      storageId: v.optional(v.id("_storage")),
      url: v.optional(v.string()),
      mime: v.string(),
      size: v.number(),
      ttlSec: v.number(),
      expiresAt: v.number(),
    })),
    createdAt: v.number(),
    expiresAt: v.optional(v.number()),
  })
    .index("by_room", ["roomId"])
    .index("by_channel", ["channelId"])
    .index("by_conversation", ["conversationId"])
    .index("by_private_conversation", ["privateConversationId"])
    .index("by_expires", ["expiresAt"]),

  attempts: defineTable({
    deviceHash: v.string(),
    ip: v.string(),
    count: v.number(),
    lastAttempt: v.number(),
    ttl: v.number(),
  })
    .index("by_device_ip", ["deviceHash", "ip"]),

  bans: defineTable({
    deviceHash: v.string(),
    ip: v.string(),
    reason: v.string(),
    timestamp: v.number(),
    bannedUntil: v.number(),
  })
    .index("by_device_ip", ["deviceHash", "ip"]),

  media: defineTable({
    storageId: v.id("_storage"),
    uploadedBy: v.id("users"),
    uploadedAt: v.number(),
    ttlSec: v.number(),
    expiresAt: v.number(),
  }),
});