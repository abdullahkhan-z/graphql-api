import { objectType } from "nexus";

export const response = objectType({
  name: "response",
  definition(t) {
    t.string("response");
  },
});

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.string("response"), t.string("user_id"), t.string("token");
  },
});
