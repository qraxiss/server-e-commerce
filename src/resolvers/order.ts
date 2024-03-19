import product from '../api/product/controllers/product'
import { newOrderPrintful, getVariant } from '../lib/printful'

import { GraphQLError } from 'graphql'

export const newOrderType = `
    type Mutation  {
        newOrder(transactionHash: String!): JSON!
    }
`

export async function newOrder(args, { transactionHash }, context) {
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

    if (!user.cart || user.cart.length === 0) {
        throw new Error('There is no item in cart!')
    }

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

    let newOrderRes
    try {
        newOrderRes = await newOrderPrintful({ items, recipient: user.recipient })
    } catch (e: any) {
        throw new GraphQLError(e.response.data.result)
    }

    let order = {
        printful: newOrderRes,
        items: cart,
        transactionHash
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
            orders: Array.isArray(user.orders) ? [...user.orders, order] : [order],
            cart: []
        }
    }))
}

export const newPrintfulOrderType = `
    type Mutation  {
        newPrintfulOrder(transaction: String!, recipient: JSON): JSON!
    }
`

export async function newPrintfulOrder(
    obj,
    {
        transaction,
        recipient
    }: {
        transaction: string
        recipient?: any
    },
    context
) {
    let user

    if (recipient) {
        user = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: {
                id: strapi.requestContext.get().state.user.id
            },
            populate: {
                cart: '*'
            }
        })
    } else {
        user = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: {
                id: strapi.requestContext.get().state.user.id
            },
            populate: {
                cart: '*',
                recipient: '*'
            }
        })
    }

    recipient = user.recipient

    if (!user.cart || user.cart.length === 0) {
        throw new Error('There is no item in cart!')
    }

    let products = await strapi.entityService.findMany('api::product.product', {
        filters: {
            slug: {
                $in: user.cart.map((element) => {
                    return element.slug
                })
            }
        }
    })

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

    let printful, error
    try {
        printful = await newOrderPrintful({ items, recipient })
    } catch (e: any) {
        error = e.response.data.result
    }

    let order = {
        printful,
        error,
        items: cart,
        transaction,
        user: user.id
    }

    return await strapi.db.query('api::printful-order.printful-order').create({
        data: order
    })
}
//tüm yığın...
export const printfulOrdersByUserType = `
    type Query {
        printfulOrdersByUser: JSON!
    }
`

export async function printfulOrdersByUser() {
    let orders = await strapi.db.query('api::printful-order.printful-order').findMany({
        filters: {
            user: {
                id: strapi.requestContext.get().state.user.id
            }
        }
    })

    orders = await Promise.all(
        orders.map(async (order) => {
            let slugs = order.items.map((item) => {
                return item.slug
            })

            let products = await strapi.db.query('api::product.product').findMany({
                filters: {
                    slug: {
                        $in: slugs
                    }
                }
            })

            return {
                ...order,
                items: order.items.map((item) => {
                    return {
                        ...item,
                        product: products.find((product) => {
                            return product.slug === item.slug
                        })
                    }
                })
            }
        })
    )

    return orders
}

export const printfulOrderWithProductsType = `
    type Query {
        printfulOrderWithProducts(id: ID!): JSON!
    }
`

export async function printfulOrderWithProducts(obj, { id }, context) {
    let order = await strapi.db.query('api::printful-order.printful-order').findOne({
        where: {
            id
        }
    })

    if (!order) {
        throw new GraphQLError('Order Not Found!')
    }

    if (order.items) {
        let products = await strapi.entityService.findMany('api::product.product', {
            filters: {
                slug: {
                    $in: order.items.map((element) => {
                        return element.slug
                    })
                }
            }
        })

        order.items = order.items.map((item) => {
            return {
                product: products.find((product) => {
                    return item.slug === product.slug
                }),
                ...item
            }
        })
    }

    return order
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
