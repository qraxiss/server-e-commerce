import { productBySlug } from './product'

export const cartType = `
    type Cart {
        product: Product!
        options: [ComponentProductSelectedOptions!]!
    }

    type Query  {
        cart: JSON
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
            cart: '*'
        }
    })

    // let product = await productBySlug({}, {}, {})

    console.log(result.cart)

    return result.cart
}

export const addProductToCartType = `
    type Mutation {
        addProductToCart(slug: String!, options: JSON!): JSON!
    }
`


export async function addProductToCart(obj, args, { context }) {
    let { slug, options } = args
    let user = strapi.requestContext.get().state.user

    if (!user) {
        throw new Error("API TOKENS CAN'T ACCESS")
    }
    let product = await productBySlug({}, { slug }, {})

    if (!product){
        throw new Error("PRODUCT DOSENT EXIST")
    }

    let cart = (
        await strapi.db.query('plugin::users-permissions.user').findOne({
            where: {
                id: user.id
            },
            populate: {
                cart: '*'
            }
        })
    ).cart

    console.log(cart)

    if (!cart){
        cart = []
    }

    cart.push({
        product:slug,
        options: JSON.parse(options)
    })

    console.log(cart)

    let result = await strapi.db.query('plugin::users-permissions.user').update({
        where: {
            id: user.id
        },
        data: {
            cart: cart
        },
        populate: {
            cart: '*'
        }
    })

    return result
}
