import { objectType, extendType, arg, nonNull } from "nexus";
import { BigIntScaler } from "./BigIntScaler";
import { response, AuthPayload } from "./Misc";
import { APP_SECRET } from "../utils";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const User = objectType({
  name: "user",
  definition(t) {
    t.nonNull.field("user_id", { type: BigIntScaler }),
      t.string("username"),
      t.string("passwordHash");
  },
});

export const signUp = extendType({
  type: "Mutation",
  definition(t) {
    t.field("signUp", {
      type: response,
      args: {
        username: nonNull(arg({ type: "String" })),
        password: nonNull(arg({ type: "String" })),
      },
      //@ts-ignore
      resolve: async (_parent, args, ctx) => {
        const hash = crypto
          .createHash("sha512")
          .update(args.password)
          .digest("hex");
        console.log(hash);
        await ctx.prisma.users.create({
          data: {
            username: args.username,
            passwordHash: hash,
          },
        });
        return { response: "User Created" };
      },
    });
  },
});

export const signIn = extendType({
  type: "Query",
  definition(t) {
    t.field("signIn", {
      type: AuthPayload,
      args: {
        username: nonNull(arg({ type: "String" })),
        password: nonNull(arg({ type: "String" })),
      },
      //@ts-ignore
      resolve: async (_parent, args, ctx) => {
        const hash = crypto
          .createHash("sha512")
          .update(args.password)
          .digest("hex");
        const user = await ctx.prisma.users.findMany({
          where: {
            username: args.username,
            passwordHash: hash,
          },
        });
        if (user.length > 0) {
          const token = jwt.sign(
            {
              user_id: user[0].user_id,
              username: user[0].username,
            },
            APP_SECRET
          );
          return {
            response: "User Signed In",
            user_id: user[0].user_id,
            token: token,
          };
        }
        return { response: "User Not Found", user_id: "", token: "" };
      },
    });
  },
});
