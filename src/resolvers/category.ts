export const createCategoryWithSlugType = `
  type Mutation  {
    cretateCategoryWithSlug(data: CategoryInput!): Category!
  }
`

export async function cretateCategoryWithSlug(obj, options, { context }) {
    let data = JSON.parse(JSON.stringify(options.data))

    const result = await strapi.service('api::category.category').createWithSlug(data)

    return result
}

export const getParentCategoriesType = `
  type Query {
    getParentCategories: [CategoryEntity]!
  }
`

export async function getParentCategories() {
    let data = await strapi.db.query('api::category.category').findMany({
        populate: {
            childs: '*'
        },
        where: {
            $not: {
                childs: null
            }
        }
    })

    return data
}

export const getCategoryWithSlugType = `
  type Query {
    getCategoryWithSlug (slug: String!): Category!
  }
`

export async function getCategoryWithSlug(obj, args, context) {
    const data = await strapi.db.query('api::category.category').findOne({
        where: {
            slug: args.slug
        }
    })

    console.log(data)

    return data
}
