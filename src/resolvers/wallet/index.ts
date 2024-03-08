import { generateUsername } from 'unique-username-generator'
import { toPlainObject } from 'lodash/fp'
import { getService } from './helpers'

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

export async function loginWithWallet(obj, {walletAddress}, { context }) {
    let user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            walletAddress
        }
    })

    return {
        jwt: getService('jwt').issue({id: user.id}),
        user
    }
}

export const registerWithWalletType = `
    type Mutation  {
        registerWithWallet(walletAddress: String!):  UsersPermissionsLoginPayload!
    }
`

export async function registerWithWallet(obj, { walletAddress }, context) {
    let username = generateUsername()

    let info = {
        walletAddress,
        username,
        password: username,
        email: `${username}@shopcek.com`
    }

    let { koaContext } = context

    koaContext.request.body = toPlainObject(info)

    await (strapi.plugin('users-permissions').controller('auth') as any).register(koaContext)
    const output = koaContext.body

    return output
}
