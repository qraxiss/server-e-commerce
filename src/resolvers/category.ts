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
  }

  type Query {
    categoryBySlug (slug: String!): CategoryBySlug!
  }
`

export async function categoryBySlug(obj, args, context) {
    const data = await strapi.db.query('api::category.category').findOne({
        where: {
            slug: args.slug
        },
        populate: {
            products: {
                populate: {
                    fields: ['variants'],
                    variants: {
                        populate: {
                            options: '*'
                        }
                    }
                }
            }
        }
    })

    let allVariants = []
    data.products.forEach((product) => product.variants.forEach((variant) => allVariants.push(variant)))

    let classedVariants: any = {}

    for (let index = 0; index < allVariants.length; index++) {
        const variant = allVariants[index]

        if (classedVariants[variant.name]) {
            let newVariants = variant.options.filter((option) => {
                let optionData = (classedVariants[variant.name].options as any[]).find((option2) => {
                    return option2.value == option.value
                })
                return !optionData
            })


            classedVariants[variant.name].options = (classedVariants[variant.name].options as any[]).concat(newVariants)
        } else {
            classedVariants[variant.name] = variant
        }
    }

    return {category: data, variants: Object.keys(classedVariants).map(key=>classedVariants[key])}
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
