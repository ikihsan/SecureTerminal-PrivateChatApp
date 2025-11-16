import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import bcrypt from "bcryptjs";

export const signup = action({
  args: {
    realName: v.string(),
    email: v.string(),
    username: v.string(),
    connectionCode: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<{ userId: Id<"users"> }> => {
    // Check if username or email exists
    const existingEmail = await ctx.runQuery(api.users.getByEmail, { email: args.email });
    if (existingEmail) {
      throw new Error("Email already exists");
    }
    const existingUsername = await ctx.runQuery(api.users.getByUsername, { username: args.username });
    if (existingUsername) {
      throw new Error("Username already exists");
    }

    const passwordHash = await bcrypt.hash(args.password, 10);
    const userId: Id<"users"> = await ctx.runMutation(api.users.create, {
      realName: args.realName,
      username: args.username,
      email: args.email,
      passwordHash,
      connectionCode: args.connectionCode,
      createdAt: Date.now(),
      settings: {},
    });

    return { userId };
  },
});

export const login = action({
  args: {
    identifier: v.string(), // email or username
    password: v.string(),
    deviceHash: v.string(),
  },
  handler: async (ctx, args): Promise<{ userId: Id<"users">; sessionId: Id<"sessions"> }> => {
    let user;
    // Check if identifier is email or username
    user = await ctx.runQuery(api.users.getByEmail, { email: args.identifier });
    if (!user) {
      user = await ctx.runQuery(api.users.getByUsername, { username: args.identifier });
    }
    if (!user) {
      throw new Error("ACCESS DENIED - USER NOT FOUND");
    }

    const isValid = await bcrypt.compare(args.password, user.passwordHash);
    if (!isValid) {
      throw new Error("ACCESS DENIED - INVALID CREDENTIALS");
    }

    // Create session
    const sessionId: Id<"sessions"> = await ctx.runMutation(api.sessions.create, {
      userId: user._id,
      createdAt: Date.now(),
      lastSeen: Date.now(),
      deviceHash: args.deviceHash,
    });

    return { userId: user._id, sessionId };
  },
});