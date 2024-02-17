import {
  getParentCategories,
  getParentCategoriesType,
  cretateCategoryWithSlug,
  createCategoryWithSlugType,
} from "./api/category/resolvers/category";

import {
  createProductWithSlug,
  createProductWithSlugType,
} from "./api/product/resolvers/product";

let typeList = [
  getParentCategoriesType,
  createProductWithSlugType,
  createCategoryWithSlugType,
];

export function createCustomMutationResolver({ strapi }) {
  return {
    typeDefs: typeList.join("\n"),
    resolversConfig: {
      Query: {
        getParentCategories: {
          auth: false,
        },
      },
    },
    resolvers: {
      Query: {
        getParentCategories: {
          resolve: getParentCategories,
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
