import gql from "graphql-tag";
import { cart, mutation as pcmutation } from "./cart";
import {
  getParentCategoriesMutation,
  getParentCategories,
  createCategoryWithSlugMutation,
  cretateCategoryWithSlug,
} from "./categories";

let typeList = [
  pcmutation,
  getParentCategoriesMutation,
  createCategoryWithSlugMutation,
];

export function createCustomMutationResolver({ strapi }) {
  return {
    typeDefs: typeList.join("\n"),

    resolvers: {
      Query: {
        cart: {
          resolve: cart,
        },
        getParentCategories: {
          resolve: getParentCategories,
        },
      },
      Mutation: {
        cretateCategoryWithSlug: {
          resolve: cretateCategoryWithSlug,
        },
      },
    },
  };
}
