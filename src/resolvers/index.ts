import gql from "graphql-tag";
import { user, mutation as pcmutation } from "./user";

let typeList = [pcmutation];

export function createCustomMutationResolver({ strapi }) {
  return {
    typeDefs: typeList.join("\n"),

    resolvers: {
      Query: {
        user: {
          resolve: user,
        },
      },
    },
  };
}
