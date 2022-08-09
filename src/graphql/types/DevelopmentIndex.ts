import { objectType, extendType, arg, nonNull } from "nexus";
import { BigIntScaler } from "./BigIntScaler";
import { AuthenticationError } from "apollo-server-express";

export const DevelopmentIndex = objectType({
  name: "development_index",
  definition(t) {
    t.nonNull.field("index", { type: BigIntScaler }),
      t.field("HDI_Rank", { type: BigIntScaler }),
      t.string("Country"),
      t.float("GDI_Value"),
      t.field("GDI_Group", { type: BigIntScaler }),
      t.float("HDI_Female"),
      t.float("HDI_Male");
  },
});

export const DevelopmentIndicesQueries = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.list.field("development_index", {
      type: DevelopmentIndex,
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.cities.findMany();
      },
    });
  },
});

//search by index
export const DevelopmentIndicesSearch = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("development_indexSearch", {
      type: DevelopmentIndex,
      args: {
        index: nonNull(arg({ type: BigIntScaler })),
      },
      resolve: (_parent, args, ctx) => {
        return ctx.prisma.development_index.findMany({
          where: {
            index: args.index,
          },
        });
      },
    });
  },
});
//add new record
export const DevelopmentIndicesMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("addDevelopmentIndex", {
      type: DevelopmentIndex,
      args: {
        index: nonNull(arg({ type: BigIntScaler })),
        HDI_Rank: arg({ type: BigIntScaler }),
        Country: arg({ type: "String" }),
        GDI_Value: arg({ type: "Float" }),
        GDI_Group: arg({ type: BigIntScaler }),
        HDI_Female: arg({ type: "Float" }),
        HDI_Male: arg({ type: "Float" }),
      },
      resolve: (_parent, args, ctx) => {
        if (!ctx.isAuthorized) {
          //throw not authorized exception
          throw new AuthenticationError("Not authorized");
        }
        return ctx.prisma.development_index.create({
          data: {
            index: args.index,
            HDI_Rank: args.HDI_Rank,
            Country: args.Country,
            GDI_Value: args.GDI_Value,
            GDI_Group: args.GDI_Group,
            HDI_Female: args.HDI_Female,
            HDI_Male: args.HDI_Male,
          },
        });
      },
    });
  },
});

//delete by index
export const DevelopmentIndicesDelete = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteDevelopmentIndex", {
      type: DevelopmentIndex,
      args: {
        index: nonNull(arg({ type: BigIntScaler })),
      },
      resolve: (_parent, args, ctx) => {
        if (!ctx.isAuthorized) {
          //throw not authorized exception
          throw new AuthenticationError("Not authorized");
        }
        return ctx.prisma.development_index.delete({
          where: {
            index: args.index,
          },
        });
      },
    });
  },
});

//update by index
export const DevelopmentIndicesUpdate = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateDevelopmentIndex", {
      type: DevelopmentIndex,
      args: {
        index: nonNull(arg({ type: BigIntScaler })),
        HDI_Rank: arg({ type: BigIntScaler }),
        Country: arg({ type: "String" }),
        GDI_Value: arg({ type: BigIntScaler }),
        GDI_Group: arg({ type: BigIntScaler }),
        HDI_Female: arg({ type: "Float" }),
        HDI_Male: arg({ type: "Float" }),
      },
      resolve: (_parent, args, ctx) => {
        if (!ctx.isAuthorized) {
          //throw not authorized exception
          throw new AuthenticationError("Not authorized");
        }
        return ctx.prisma.development_index.update({
          where: {
            index: args.index,
          },
          data: {
            HDI_Rank: args.HDI_Rank,
            Country: args.Country,
            GDI_Value: args.GDI_Value,
            GDI_Group: args.GDI_Group,
            HDI_Female: args.HDI_Female,
            HDI_Male: args.HDI_Male,
          },
        });
      },
    });
  },
});
