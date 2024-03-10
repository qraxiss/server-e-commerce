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
