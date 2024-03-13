export const accountInformationType = `
    type Query  {
    accountInformation: JSON!
  }
`

export async function accountInformation(obj, options, { context }) {
    let user = strapi.requestContext.get().state.user

    let result = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            id: user.id
        },
        populate: {
            addresses: '*'
        }
    })

    return result
}


export const recipientTpye = `
    type Query  {
        recipient: JSON!
    }
`
export async function recipient(obj, args, context){
    let result = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            id: strapi.requestContext.get().state.user.id
        },
        populate: {
            recipient: '*'
        }
    })

    return result.recipient
}


export const updateRecipientTpye = `
    type Mutation {
        updateRecipient(recipient: JSON!): JSON!
    }
`
export async function updateRecipient(obj, {recipient}, context){
    let result = await strapi.db.query('plugin::users-permissions.user').update({
        where: {
            id: strapi.requestContext.get().state.user.id
        },
        populate: {
            recipient: '*'
        },
        data: {
            recipient
        }
    })

    return result.recipient
}
