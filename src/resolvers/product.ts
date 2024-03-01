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
    const data = await strapi.entityService.findMany('api::product.product', {
        filters: {
            slug: {
                $in: JSON.parse(args.slugs)
            }
        }
    })

    return data
}

export const filterProductsType = `
  type Query {
      filterProducts (values: [String]!, categories:[String!]!): [Product]! 
  }
`

export async function filterProducts(obj, args, context) {
    let allProducts = []

    for (let indexi = 0; indexi < args.categories.length; indexi++) {
        const category = args.categories[indexi]

        for (let indexy = 0; indexy < args.values.length; indexy++) {
            const value = args.values[indexy]

            const option = await strapi.db.query('api::option.option').findOne({
                where: {
                    value
                },
                populate: {
                    products: {
                        populate: {
                            categories: {
                                fields: ['slug'],
                                slug: true,
                                where: {
                                    slug: category
                                }
                            }
                        }
                    }
                }
            })

            let products = option.products.filter((product: any) => {
                return product.categories.length !== 0
            })

            for (let indexz = 0; indexz < products.length; indexz++) {
                const product = products[indexz]

                let newProduct = allProducts.find((productz: any) => {
                    return product.id === productz.id
                })

                console.log(product, newProduct)

                if (!newProduct) {
                    allProducts.push(product)
                }
            }
        }
    }

    return allProducts
}
