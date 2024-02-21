import { productBySlug, productsBySlug } from './product'

export const cartType = `
    type Cart {
        product: Product!
        options: [ComponentProductSelectedOptions!]!
    }

    type Query  {
        cart: [Cart]
    }
`

export async function cart() {
    let user = strapi.requestContext.get().state.user

    if (!user) {
        throw new Error("API TOKENS CAN'T ACCESS")
    }

    let result = await strapi.db.query('plugin::users-permissions.user').findOne({
        populate: {
            cart: '*'
        },
        where: {
            id: user.id
        }
    })

    if (!result.cart) {
        return []
    }

    let products = result?.cart?.map((product: any) => {
        return product.product
    })

    let productObjects: any[] = await productsBySlug({}, { slugs: JSON.stringify(products) }, {})


    let cart = result.cart.map((productElement: any) => {
        return {
            product: productObjects.find((element) => productElement.product === element.slug),
            options: productElement.options
        }
    })

    return cart
}

export const addProductToCartType = `
    type Mutation {
        addProductToCart(slug: String!, options: JSON!): JSON!
    }
`

export async function addProductToCart(obj, args, { context }) {
    let { slug, options } = args
    let user = strapi.requestContext.get().state.user

    let product = await productBySlug({}, { slug }, {})

    if (!product) {
        throw new Error('PRODUCT DOSENT EXIST')
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


    if (!cart) {
        cart = []
    }

    cart.push({
        product: slug,
        options: JSON.parse(options)
    })


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

export const deleteProductFromCartType = `
    type Mutation {
        deleteProductFromCart(index: ID!): JSON!
    }
`

export async function deleteProductFromCart(obj, args, { context }) {
    let user = strapi.requestContext.get().state.user
    let { index } = args

    let cartData = (await cart()) as any[]
    cartData = cartData.splice(index)

    let result = await strapi.db.query('plugin::users-permissions.user').update({
        where: {
            id: user.id
        },
        data: {
            cart: cartData.map((cart) => {
                return { product: cart.product.slug, options: cart.options }
            })
        },
        populate: {
            cart: '*'
        }
    })

    return result
}
