export const mutation = `
  type Query {
    getParentCategories: [CategoryEntity]!
  }
`;

export async function getParentCategories() {
  let data = await strapi.db.query("api::category.category").findMany({
    populate: {
      parent: "*",
      childs: "*",
    },
    where: {
      parent: null,
      $not: {
        childs: null,
      },
    },
  });

  return data;
}
