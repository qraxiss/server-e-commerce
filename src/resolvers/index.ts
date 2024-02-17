import {
  getParentCategories,
  getParentCategoriesType,
  cretateCategoryWithSlug,
  createCategoryWithSlugType,
  getCategoryWithSlug,
  getCategoryWithSlugType,
} from "./category";

import {
  createProductWithSlug,
  createProductWithSlugType,
  getProductWithSlug,
  getProductWithSlugType,
} from "./product";

import { getCart, getCartType } from "./cart";

let typeList = [
  getCartType,
  getParentCategoriesType,
  createProductWithSlugType,
  createCategoryWithSlugType,
  getProductWithSlugType,
  getCategoryWithSlugType,
];

export function createCustomMutationResolver({ strapi }) {
  return {
    typeDefs: typeList.join("\n"),
    resolversConfig: {
      Query: {
        getParentCategories: {
          auth: false,
        },
        getProductWithSlug: {
          auth: false,
        },
        getCategoryWithSlug: {
          auth: false,
        },
      },
    },
    resolvers: {
      Query: {
        getCart:{
          resolve: getCart
        },
        getParentCategories: {
          resolve: getParentCategories,
        },
        getProductWithSlug: {
          resolve: getProductWithSlug,
        },
        getCategoryWithSlug: {
          resolve: getCategoryWithSlug,
        },
      },
      Mutation: {
        cretateCategoryWithSlug: {
          resolve: cretateCategoryWithSlug,
        },
        cretateProductWithSlug: {
          resolve: createProductWithSlug,
        },
      },
    },
  };
}
