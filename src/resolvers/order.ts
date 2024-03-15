import { newOrderPrintful, getVariant } from '../lib/printful'

export const newOrderType = `
    type Mutation  {
        newOrder: JSON!
    }
`

export async function newOrder() {
    let user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            id: strapi.requestContext.get().state.user.id
        },
        populate: {
            cart: '*',
            recipient: '*',
            orders: '*'
        }
    })

    let products = await strapi.entityService.findMany('api::product.product', {
        filters: {
            slug: {
                $in: user.cart.map((element) => {
                    return element.slug
                })
            }
        }
    })

    // cart with variant id
    let cart = user.cart.map((item: any, index: number) => {
        let variants = products.find((product) => {
            return product.slug === item.slug
        }).variants as any[]

        let variant = variants.find((variant) => {
            return variant.size === item.options.size && variant.color === item.options.color
        })

        return {
            variantId: variant.variantId,
            ...item
        }
    })

    let items = await Promise.all(
        cart.map(async (item) => {
            let printfulItem = await getVariant(item)
            return {
                quantity: item.count,
                ...printfulItem
            }
        })
    )

    try {
        let newOrder = await newOrderPrintful({ items, recipient: user.recipient })
    } catch (e: any) {
        console.log(e.response)
    }

    return !!(await strapi.db.query('plugin::users-permissions.user').update({
        where: {
            id: strapi.requestContext.get().state.user.id
        },
        populate: {
            cart: '*',
            orders: '*'
        },
        data: {
            orders: Array.isArray(user.orders) ? [...user.orders, user.cart] : [user.cart],
            cart: []
        }
    }))
}

export const ordersType = `
    type Query {
        orders: JSON!
    }
`

export async function orders(obj, args, context) {
    let user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            id: strapi.requestContext.get().state.user.id
        },
        populate: {
            orders: '*',
            recipient: '*'
        }
    })

    return Promise.all(
        user.orders.map(async (order) => {
            let products = await strapi.entityService.findMany('api::product.product', {
                filters: {
                    slug: {
                        $in: order.map((element) => {
                            return element.slug
                        })
                    }
                }
            })

            return order.map((productElement: any) => {
                return {
                    product: products.find((element) => productElement.slug === element.slug),
                    count: productElement.count,
                    options: productElement.options
                }
            })
        })
    )
}
