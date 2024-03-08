import { productBySlug, productsBySlug } from './product'

function areObjectsEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

type product = {
    slug: string,
    count: number,
    options: any
}

export const cartType = `
    type Cart {
        product: Product!
        count: Int!
        options: JSON!
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

    if (!result.cart && result.cart.length === 0) {
        return []
    }

    let products = result?.cart?.map((product: any) => {
        return product.slug
    })
    let productObjects: any[] = await productsBySlug({}, { slugs:products}, {})

    let cart = result.cart.map((productElement: any) => {
        return {
            product: productObjects.find((element) => productElement.slug === element.slug),
            count: productElement.count,
            options: productElement.options
        }
    })

    return cart
}

export const addProductToCartType = `
    type OptionProduct {
        option: String!
        value: String!
    }

    type Mutation {
        addProductToCart(slug: String!, options: JSON!, count: Int!=1): JSON!
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
            },
        })
    ).cart as product[]

    if (!cart){
        cart = []
    }


    let find: boolean = false
    for (let index = 0; index < cart.length; index++) {
        const product = cart[index];
        
        if (product.slug === args.slug && areObjectsEqual(product.options, args.options)){
            find = true
            cart[index].count = cart[index].count + args.count
            break
        }
        
    }
    if (!find){
        cart.push(args)
    }

    let result = await strapi.db.query('plugin::users-permissions.user').update({
        where: {
            id: user.id
        },
        data: {
            cart
        },
        populate: {
            cart : "*"
        }
    })

    return !areObjectsEqual(result.cart, cart)
}

export const deleteProductFromCartType = `
    type Mutation {
        deleteProductFromCart(slug: String!, deleteAll: Boolean=false, options:JSON!): JSON!
    }
`

export async function deleteProductFromCart(obj: any, args: {
    deleteAll: boolean,
    slug: string,
    options: any,
}, { context }: any) {
    let user = strapi.requestContext.get().state.user

    let {deleteAll, slug, options} = args

    let cart = (
        await strapi.db.query('plugin::users-permissions.user').findOne({
            where: {
                id: user.id
            },
            populate: {
                cart: '*'
            },
        })
    ).cart as product[]

    let oldCart = structuredClone(cart)

    if (!cart || cart.length === 0){
        return false
    }

    if (deleteAll){
        cart = cart.filter(product=>{
            return !(product.slug === slug && areObjectsEqual(product.options, options))
        })
    } else {

        for (let index = 0; index < cart.length; index++) {
            const product = cart[index];
            
            if (product.slug === slug && areObjectsEqual(product.options, options)){
                console.log(cart[index])
                cart[index].count = cart[index].count - 1
            }
        }
    }



    if (!areObjectsEqual(oldCart, cart)){
        
        let result = await strapi.db.query('plugin::users-permissions.user').update({
            where: {
                id: user.id
            },
            data: {
                cart
            },
            populate: {
                cart : "*"
            }
        })

        return !areObjectsEqual(result.cart, cart) 
    
    } else {
        return false
    }

    
}
