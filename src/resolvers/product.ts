export const createProductWithSlugType = `
  type Mutation  {
    createProductWithSlug(data: ProductInput!): Product!
  }
`

export async function createProductWithSlug(obj, options, { context }) {
    let data = JSON.parse(JSON.stringify(options.data))

    const result = await strapi.service('api::product.product').createWithSlug(data)

    return result
}

export const productBySlugType = `
  type Query {
    productBySlug (slug: String!): Product!
  }
`

export async function productBySlug(obj, args, context) {
    const data = await strapi.db.query('api::product.product').findOne({
        where: {
            slug: args.slug
        }
    })

    return data
}

export const productsBySlugType = `
  type Query {
    productsBySlug (slugs: [String]!): [Product]!
  }
`

export async function productsBySlug(obj, args, context) {
  
  
  const data = await strapi.db.query('api::product.product').findMany({
    filters: {
      slug: {
        $in: JSON.parse(args.slugs),
      },
    },
    
  })

  return data
}