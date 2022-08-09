import { objectType, extendType, arg, nonNull } from "nexus";
import { BigIntScaler } from "./BigIntScaler";
import { AuthenticationError } from "apollo-server-express";
// defining city type
export const City = objectType({
  name: "City",
  definition(t) {
    t.nonNull.field("index", { type: BigIntScaler }),
      t.string("Country"),
      t.string("City"),
      t.field("Population", { type: BigIntScaler }),
      t.float("Latitude"),
      t.float("Longitude");
  },
});

// general query for extracting from cities
export const CitiesQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("cities", {
      type: "City",
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.cities.findMany();
      },
    });
  },
});

//Search By City index
export const CitiesSearch = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("citySearch", {
      type: "City",
      args: {
        index: nonNull(arg({ type: BigIntScaler })),
      },
      resolve: (_parent, args, ctx) => {
        return ctx.prisma.cities.findMany({
          where: {
            index: args.index,
          },
        });
      },
    });
  },
});

//update by city index
export const CitiesUpdate = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateCity", {
      type: "City",
      args: {
        index: nonNull(arg({ type: BigIntScaler })),
        Country: arg({ type: "String" }),
        City: arg({ type: "String" }),
        Population: arg({ type: BigIntScaler }),
        Latitude: arg({ type: "Float" }),
        Longitude: arg({ type: "Float" }),
      },
      resolve: (_parent, args, ctx) => {
        if (!ctx.isAuthorized) {
          //throw not authorized exception
          throw new AuthenticationError("Not authorized");
        }
        return ctx.prisma.cities.update({
          where: {
            index: args.index,
          },
          data: {
            Country: args.Country,
            City: args.City,
            Population: args.Population,
            Latitude: args.Latitude,
            Longitude: args.Longitude,
          },
        });
      },
    });
  },
});

//delete by city index
export const CitiesDelete = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteCity", {
      type: City,
      args: {
        index: nonNull(arg({ type: BigIntScaler })),
      },
      resolve: async (_parent, args, ctx) => {
        if (!ctx.isAuthorized) {
          //throw not authorized exception
          throw new AuthenticationError("Not authorized");
        }
        return ctx.prisma.cities.delete({
          where: {
            index: args.index,
          },
        });
      },
    });
  },
});

//add new record
export const CitiesAdd = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createCity", {
      type: "City",
      args: {
        index: nonNull(arg({ type: BigIntScaler })),
        Country: arg({ type: "String" }),
        City: arg({ type: "String" }),
        Population: arg({ type: BigIntScaler }),
        Latitude: arg({ type: "Float" }),
        Longitude: arg({ type: "Float" }),
      },
      resolve: async (_parent, args, ctx) => {
        if (!ctx.isAuthorized) {
          //throw not authorized exception
          throw new AuthenticationError("Not authorized");
        }
        return ctx.prisma.cities.create({
          data: {
            index: args.index,
            Country: args.Country,
            City: args.City,
            Population: args.Population,
            Latitude: args.Latitude,
            Longitude: args.Longitude,
          },
        });
      },
    });
  },
});
