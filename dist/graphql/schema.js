"use strict";
var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
exports.__esModule = true;
exports.typeDefs = void 0;
var apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql)(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        "\n    type city {\n        index: Int\n        Country: String\n        City: String\n        Population: Int\n        Latitude: Float\n        Longitude: Float\n    }\n\n    type developmentIndex {\n        index: Int\n        HDI_Rank: Int\n        Country: String\n        GDI_Value: Float\n        GDI_Group: Int\n        HD_Female: Float\n        HD_Male: Float\n    }\n    type Query {\n        city(index: Int!):[city]\n        developmentIndex(index: Int!):[developmentIndex]\n    }\n    \n    type Mutation {\n        createCity(Country:String, City:String, Population:Int, Latitude:Float, Longitude:Float):city!,\n        createDevelopmentIndex(HDI_Rank:Int, Country:String, GDI_Value:Float, GDI_Group:Int, HD_Female:Float, HD_Male:Float):developmentIndex!\n    }\n        ",
      ],
      [
        "\n    type city {\n        index: Int\n        Country: String\n        City: String\n        Population: Int\n        Latitude: Float\n        Longitude: Float\n    }\n\n    type developmentIndex {\n        index: Int\n        HDI_Rank: Int\n        Country: String\n        GDI_Value: Float\n        GDI_Group: Int\n        HD_Female: Float\n        HD_Male: Float\n    }\n    type Query {\n        city(index: Int!):[city]\n        developmentIndex(index: Int!):[developmentIndex]\n    }\n    \n    type Mutation {\n        createCity(Country:String, City:String, Population:Int, Latitude:Float, Longitude:Float):city!,\n        createDevelopmentIndex(HDI_Rank:Int, Country:String, GDI_Value:Float, GDI_Group:Int, HD_Female:Float, HD_Male:Float):developmentIndex!\n    }\n        ",
      ]
    ))
);
var templateObject_1;
//# sourceMappingURL=schema.js.map
