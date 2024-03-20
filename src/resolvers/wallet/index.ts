import { generateUsername } from 'unique-username-generator'
import { toPlainObject } from 'lodash/fp'
import { getService } from '../helpers'

export const nonceType = `
    type Query {
        nonce: String!
    }
`

export function nonce(obj, args, { context }) {
    return Math.floor(Math.random() * 10000000000).toString()
}

export const loginWithWalletType = `
    type Mutation  {
        loginWithWallet(walletAddress: String!):  UsersPermissionsLoginPayload!
    }
`

export async function loginWithWallet(obj, { walletAddress }, { context }) {
    let user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            walletAddress
        }
    })

    if (!user) {
        return {
            jwt: null
        }
    }

    return {
        jwt: getService('jwt').issue({ id: user.id }),
        user
    }
}

export const registerWithWalletType = `
    type Mutation  {
        registerWithWallet(walletAddress: String!):  UsersPermissionsLoginPayload!
    }
`

export async function registerWithWallet(obj, { walletAddress }, context) {
    let info = {
        walletAddress,
        username: walletAddress,
        password: generateUsername(),
        email: `${walletAddress}@shopcek.com`,
        wishlist: [],
        cart: [],
        orders: [],
        recipient: {}
    }

    let { koaContext } = context

    koaContext.request.body = toPlainObject(info)

    await (strapi.plugin('users-permissions').controller('auth') as any).register(koaContext)
    const output = koaContext.body

    return output
}

export const connectWalletType = `
    type Mutation {
        connectWallet(walletAddress:String!): UsersPermissionsLoginPayload!
    }
`

export async function connectWallet(obj, { walletAddress }, context) {
    let user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            walletAddress
        }
    })

    if (user) {
        return {
            jwt: getService('jwt').issue({ id: user.id }),
            user
        }
    }

    // if user not registered
    let info = {
        walletAddress,
        username: walletAddress,
        password: generateUsername(),
        email: `${walletAddress}@shopcek.com`,
        wishlist: [],
        cart: [],
        orders: [],
        recipient: {}
    }
    let { koaContext } = context
    koaContext.request.body = toPlainObject(info)

    await (strapi.plugin('users-permissions').controller('auth') as any).register(koaContext)
    const output = koaContext.body

    await strapi.db.query('api::earn.earn').create({
        data: {
            user: output.user.id,
            login: {
                loginCount: 0,
                lastLogin: (new Date('2020-01-01')).valueOf()
            }
        }
    })

    return output
}
