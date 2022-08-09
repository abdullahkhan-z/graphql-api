import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginCacheControl,
} from "apollo-server-core";
import { schema } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { createContext } from "./graphql/context";
import { BaseRedisCache } from "apollo-server-cache-redis";
import { isCSRFEnabled, isPlaygroundEnabled, isCacheEnabled } from "./config";
import Redis from "ioredis";

const app = express();
const apolloServer = new ApolloServer({
  schema,
  resolvers,
  csrfPrevention: isCSRFEnabled(),

  cache: isCacheEnabled()
    ? new BaseRedisCache({
        //@ts-ignore
        client: new Redis({
          host: process.env.REDIS_URL,
          port: process.env.REDIS_PORT,
        }),
      })
    : "bounded", // default cache implementation,
  plugins: [
    isPlaygroundEnabled()
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
    ApolloServerPluginCacheControl({
      defaultMaxAge: process.env.CACHE_MAX_AGE
        ? parseInt(process.env.CACHE_MAX_AGE)
        : 60,
      calculateHttpHeaders: false,
    }),
  ],
  context: createContext,
});
apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app });
});

export default app;
