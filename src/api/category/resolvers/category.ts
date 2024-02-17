export const createCategoryWithSlugType = `
  type Mutation  {
    cretateCategoryWithSlug(data: CategoryInput!): Category!
  }
`;

export async function cretateCategoryWithSlug(obj, options, { context }) {
  let data = JSON.parse(JSON.stringify(options.data));

  const result = await strapi
    .service("api::category.category")
    .createWithSlug(data);

  return result;
}

export const getParentCategoriesType = `
  type Query {
    getParentCategories: [CategoryEntity]!
  }
`;

export async function getParentCategories() {
  let data = await strapi.db.query("api::category.category").findMany({
    populate: {
      childs: "*",
    },
    where: {
      $not: {
        childs: null,
      },
    },
  });

  return data;
}
