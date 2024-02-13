import gql from "graphql-tag";
import { cart, mutation as pcmutation } from "./cart";

let typeList = [pcmutation];

export function createCustomMutationResolver({ strapi }) {
  return {
    typeDefs: typeList.join("\n"),

    resolvers: {
      Query: {
        cart: {
          resolve: cart,
        },
      },
    },
  };
}
