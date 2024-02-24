export const createCategoryWithSlugType = `
  type Mutation  {
    createCategoryWithSlug(data: CategoryInput!): Category!
  }
`

export async function createCategoryWithSlug(obj, options, { context }) {
    let data = JSON.parse(JSON.stringify(options.data))

    const result = await strapi.service('api::category.category').createWithSlug(data)

    return result
}

export const categoryBySlugType = `
  type CategoryBySlug {
    category: Category!
    variants: JSON!
    products: [Product!]!
  }

  type Query {
    categoryBySlug (slug: String!, start: Int = 0, limit : Int = 12): CategoryBySlug!
  }
`

export async function categoryBySlug(obj, args, context) {
    const category = await strapi.db.query('api::category.category').findOne({
        where: {
            slug: args.slug
        }
    })

    const products = await strapi.entityService.findMany('api::product.product', {
        start: args.start,
        limit: args.limit,
        populate: {
            categories: {
                fields: ['slug']
            },
            variants: {
                populate: {
                    options: '*'
                }
            }
        },
        filters: {
            categories: {
                slug: {
                    $eq: args.slug
                }
            }
        }
    })

    let allVariants = []
    products.forEach((product) => product.variants.forEach((variant) => allVariants.push(variant)))

    let variants: any = {}

    for (let index = 0; index < allVariants.length; index++) {
        const variant = allVariants[index]

        if (variants[variant.name]) {
            let newVariants = variant.options.filter((option) => {
                let optionData = (variants[variant.name].options as any[]).find((option2) => {
                    return option2.value == option.value
                })
                return !optionData
            })

            variants[variant.name].options = (variants[variant.name].options as any[]).concat(newVariants)
        } else {
          variants[variant.name] = variant
        }
    }

    variants = Object.keys(variants).map((key) => variants[key])


    return { category, products, variants }
}

export const productByCategoryType = `
  type Query {
    productByCategory (slugs: [String!]): JSON!
  }
`

export async function productByCategory(obj, args, context) {
    const data = strapi.entityService.findMany('api::product.product', {
        filters: {
            categories: {
                $not: null
            }
        },
        populate: {
            categories: {
                fields: ['slug'],
                filters: {
                    slug: {
                        $in: args.slugs
                    }
                }
            }
        }
    })

    return data
}
