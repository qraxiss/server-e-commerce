export const createProductWithSlugType = `
  type Mutation  {
    cretateProductWithSlug(data: ProductInput!): Product!
  }
`

export async function createProductWithSlug(obj, options, { context }) {
    let data = JSON.parse(JSON.stringify(options.data))

    const result = await strapi.service('api::product.product').createWithSlug(data)

    return result
}

export const getProductWithSlugType = `
  type Query {
    getProductWithSlug (slug: String!): Product!
  }
`

export async function getProductWithSlug(obj, args, context) {
    const data = await strapi.db.query('api::product.product').findOne({
        where: {
            slug: args.slug
        }
    })

    return data
}
