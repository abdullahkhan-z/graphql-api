import { Kind, ValueNode } from "graphql";
import { scalarType } from "nexus";

export const BigIntScaler = scalarType({
  name: "BigIntScaler",
  description: "Hanldes BigInt from DB",
  serialize(value: any) {
    return value.toString();
  },
  parseValue(value: any) {
    return value;
  },
  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value);
    }
  },
});
