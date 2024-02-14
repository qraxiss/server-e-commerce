export const mutation = `
  type Mutation  {
    cretateCategoryWithSlug(data: CategoryInput!): Category!
  }
`;

export async function cretateCategoryWithSlug(obj, options, { context }) {
  let data = JSON.parse(JSON.stringify(options.data));

  //   console.log(data);
  const result = await strapi
    .service("api::category.category")
    .createWithSlug(data);

  return result;
}
