import { productsBySlug } from './product'
import { areObjectsEqual } from '../helpers/areEqual'
export const wishlistType = `
    type Query {
        wishlist: [Product]!
    }
`

export async function wishlist(obj, args, context) {
    let user = strapi.requestContext.get().state.user

    let result = await strapi.db.query('plugin::users-permissions.user').findOne({
        populate: {
            wishlist: '*'
        },
        where: {
            id: user.id
        }
    })

    if (!result.wishlist && result.wishlist.length === 0) {
        return []
    }

    return await productsBySlug({}, { slugs: result.wishlist }, {})
}

export const addWishlistType = `
    type Mutation {
        addWishlist(slug: String!): Boolean!
    }
`

export async function addWishlist(obj, { slug }, context) {
    let user = strapi.requestContext.get().state.user

    let wishlist = (
        await strapi.db.query('plugin::users-permissions.user').findOne({
            populate: {
                wishlist: '*'
            },
            where: {
                id: user.id
            }
        })
    ).wishlist as string[]

    if (!wishlist) {
        wishlist = []
    }

    if (!wishlist.includes(slug)) {
        wishlist.push(slug)

        let result = await strapi.db.query('plugin::users-permissions.user').update({
            where: {
                id: user.id
            },
            data: {
                wishlist
            },
            populate: {
                wishlist: '*'
            }
        })

        return areObjectsEqual(result.wishlist, wishlist)
    } else {
        return false
    }
}

export const deleteWishListType = `
    type Mutation {
        deleteWishlist(slug: String!): Boolean!
    }
`

export async function deleteWishlist(obj, { slug }, context) {
    let user = strapi.requestContext.get().state.user

    let wishlist = (
        await strapi.db.query('plugin::users-permissions.user').findOne({
            populate: {
                wishlist: '*'
            },
            where: {
                id: user.id
            }
        })
    ).wishlist as string[]

    if (!wishlist) {
        return false
    }

    let result = await strapi.db.query('plugin::users-permissions.user').update({
        where: {
            id: user.id
        },
        data: {
            wishlist: wishlist.filter((item) => {
                return item !== slug
            })
        },
        populate: {
            wishlist: '*'
        }
    })

    return !areObjectsEqual(result.wishlist, wishlist)
}
