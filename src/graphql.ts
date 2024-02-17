import {
  getParentCategories,
  getParentCategoriesType,
  cretateCategoryWithSlug,
  createCategoryWithSlugType,
} from "./api/category/resolvers/category";

import {
  createProductWithSlug,
  createProductWithSlugType,
  getProductWithSlug,
  getProductWithSlugType,
} from "./api/product/resolvers/product";

let typeList = [
  getParentCategoriesType,
  createProductWithSlugType,
  createCategoryWithSlugType,
  getProductWithSlugType,
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
      },
    },
    resolvers: {
      Query: {
        getParentCategories: {
          resolve: getParentCategories,
        },
        getProductWithSlug: {
          resolve: getProductWithSlug,
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
