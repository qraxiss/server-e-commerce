import { toPlainObject } from 'lodash/fp'

export const registerWithDefaultValuesType = `
    type Mutation  {
        registerWithDefaultValues(username:String!, email:String!, password:String!):  UsersPermissionsLoginPayload!
    }
`

export async function registerWithDefaultValues(obj, { username, email, password }, context) {
    let info = {
        username,
        email,
        password,
        wishlist: [],
        cart: [],
        orders: [],
        recipient: {
            zip: '91313',
            city: 'Newyork',
            name: 'qraxiss',
            phone: '+155555555',
            address1: 'Bla bla bla',
            address2: 'Bla bla bla',
            state_code: 'CA',
            state_name: 'Sample State Name',
            country_code: 'US',
            country_name: 'United States',
            email
        }
    }

    let { koaContext } = context

    koaContext.request.body = toPlainObject(info)

    await (strapi.plugin('users-permissions').controller('auth') as any).register(koaContext)
    const output = koaContext.body

    return output
}
