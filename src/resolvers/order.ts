import { newOrderPrintful, getVariant } from '../lib/printful'
import { productBySlug } from './product'

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
            cart: '*'
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
        let variants = products[index].variants as any[]

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

    return await newOrderPrintful({ items })
}
