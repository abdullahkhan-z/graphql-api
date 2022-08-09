import { context } from "./context";
export const resolvers = {
  Query: {
    //@ts-ignore
    city: (_parent: any, _args: any, ctx: context, info) => {
      info.cacheControl.setCacheHint({ maxAge: 60, scope: "PRIVATE" });
      return ctx.prisma.cities.findMany();
    },
    //@ts-ignore
    developmentIndex: (_parent: any, _args: any, ctx: context, info) => {
      info.cacheControl.setCacheHint({ maxAge: 60, scope: "PRIVATE" });
      return ctx.prisma.development_index.findMany();
    },
  },
};
