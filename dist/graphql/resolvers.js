"use strict";
exports.__esModule = true;
exports.resolvers = void 0;
exports.resolvers = {
  Query: {
    city: function () {
      return [
        {
          index: 1,
          Country: "a",
          City: "b",
          Population: 1,
          Latitude: 1.0,
          Longitude: 1.0,
        },
      ];
    },
    developmentIndex: function () {
      return [
        {
          index: 1,
          HDI_Rank: 1,
          Country: "a",
          GDI_Value: 1.0,
          GDI_Group: 1,
          HDI_Female: 1.0,
          HDI_Male: 1.0,
        },
      ];
    },
  },
};
//# sourceMappingURL=resolvers.js.map
