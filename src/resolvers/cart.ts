export const cartType = `
    type Cart {
        product: Product!
        options: [ComponentProductSelectedOptions!]!
    }

    type Query  {
        cart: [Cart!]!
    }
`

export async function cart(obj, options, { context }) {
    let user = strapi.requestContext.get().state.user

    if (!user) {
        throw new Error("API TOKENS CAN'T ACCESS")
    }

    let result = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            id: user.id
        },
        populate: {
            cart: {
                populate: {
                    options: '*',
                    product: '*'
                }
            }
        }
    })

    return result.cart
}

export const addProductToCartType = `
    type Mutation {
        addProductToCart(slug: String!): Product!
    }
`

import { productBySlug } from './product'

export async function addProductToCart(obj, options, { context }) {
    let slug = options.slug as string
    let user = strapi.requestContext.get().state.user

    if (!user) {
        throw new Error("API TOKENS CAN'T ACCESS")
    }
    let product = await productBySlug({}, { slug }, {})

    let result = await strapi.db.query('plugin::users-permissions.user').update({
        where: {
            id: user.id
        },
        data: {
            products: {
                connect: [product.id]
            }
        },
        populate: {
            products: '*'
        }
    })

    return result
}
