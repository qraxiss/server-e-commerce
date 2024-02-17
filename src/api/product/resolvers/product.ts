export const createProductWithSlugType = `
  type Mutation  {
    cretateProductWithSlug(data: ProductInput!): Product!
  }
`;

export async function createProductWithSlug(obj, options, { context }) {
  let data = JSON.parse(JSON.stringify(options.data));

  const result = await strapi
    .service("api::product.product")
    .createWithSlug(data);

  return result;
}
