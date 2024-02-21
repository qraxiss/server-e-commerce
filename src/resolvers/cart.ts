import { productBySlug, productsBySlug } from './product'

export const cartType = `
    type Cart {
        product: Product!
        count: Int!
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
            count: productElement.count
        }
    })

    return cart
}

export const addProductToCartType = `
    type Mutation {
        addProductToCart(slug: String!): JSON!
    }
`

export async function addProductToCart(obj, args, { context }) {
    let { slug } = args
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
    ).cart as any[]

    if (!cart) {
        cart = []
    }


    let isNotIn = true

    for (let index = 0; index < cart.length; index++) {
        const element = cart[index];
        if (element.product === slug){
            element.count=element.count+1
            isNotIn = false
            break
        }
    }

    if (isNotIn){
        cart.push({
            product: slug,
            count: 1
        })
    }



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

    return result.cart
}

export const deleteProductFromCartType = `
    type Mutation {
        deleteProductFromCart(slug: String!): JSON!
    }
`

export async function deleteProductFromCart(obj, args, { context }) {
    let user = strapi.requestContext.get().state.user
    let { slug } = args


    let cartData = (await cart()) as any[]
    let cartDataTemp = []


    for (let index = 0; index < cartData.length; index++) {
        const element = cartData[index];
        console.log(element)

        if (element.product.slug === slug){
            if (element.count === 1){
                continue
            }

            cartDataTemp.push({
                ...element,
                count: element.count - 1
            })
        } else {
            cartDataTemp.push(element)
        }
    }

    let result = await strapi.db.query('plugin::users-permissions.user').update({
        where: {
            id: user.id
        },
        data: {
            cart: cartDataTemp.map((cart) => {
                return { product: cart.product.slug, count: cart.count }
            })
        },
        populate: {
            cart: '*'
        }
    })

    return result.cart
}
