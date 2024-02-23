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

// export const parentCategoriesType = `
//   type Query {
//     parentCategories: [CategoryEntity]!
//   }
// `

// export async function parentCategories() {
//     let data = await strapi.db.query('api::category.category').findMany({
//         populate: {
//             childs: '*'
//         },
//         where: {
//             $not: {
//                 childs: null
//             }
//         }
//     })

//     return data
// }

export const categoryBySlugType = `
  type Query {
    categoryBySlug (slug: String!): Category!
  }
`

export async function categoryBySlug(obj, args, context) {
    const data = await strapi.db.query('api::category.category').findOne({
        where: {
            slug: args.slug
        }
    })

    return data
}

export const productByCategoryType = `
  type Query {
    productByCategory (slugs: [String!]): JSON!
  }
`

export async function productByCategory(obj, args, context) {
    // const data = strapi.entityService.findMany('api::category.category',
    //   {
    //     fields: ["slug"],
    //     filters: {
    //       slug: {
    //         $in: args.slugs
    //       },
    //       products: {
    //         $not : null
    //       }
    //     },
    //     populate: {
    //       products: {
    //         fields: ["slug"]
    //       }
    //     }
    //   }
    // )

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
