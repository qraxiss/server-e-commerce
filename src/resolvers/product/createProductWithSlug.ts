export const mutation = `
  type Mutation  {
    cretateProductWithSlug(data: ProductInput!): Product!
  }
`;

export async function cretateProductWithSlug(obj, options, { context }) {
  let data = JSON.parse(JSON.stringify(options.data));

  //   console.log(data);
  const result = await strapi
    .service("api::product.product")
    .createWithSlug(data);

  return result;
}
