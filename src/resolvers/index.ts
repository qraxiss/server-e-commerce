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

    resolvers: {
      Query: {
        cart: {
          auth: false,
          resolve: cart,
        },
        getParentCategories: {
          auth: false,
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
