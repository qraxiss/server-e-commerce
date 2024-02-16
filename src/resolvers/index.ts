import { cart, mutation as pcmutation } from "./cart";
import {
  getParentCategoriesMutation,
  getParentCategories,
  createCategoryWithSlugMutation,
  cretateCategoryWithSlug,
} from "./category";

import {
  createProductWithSlugMutation,
  cretateProductWithSlug,
} from "./product";

let typeList = [
  pcmutation,
  getParentCategoriesMutation,
  createCategoryWithSlugMutation,
  createProductWithSlugMutation,
];

export function createCustomMutationResolver({ strapi }) {
  return {
    typeDefs: typeList.join("\n"),
    resolversConfig: {
      "Query.getParentCategories": {
        auth: false,
      },
    },
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
        cretateProductWithSlug: {
          resolve: cretateProductWithSlug,
        },
      },
    },
  };
}
