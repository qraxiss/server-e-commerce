export const getCartType = `
  type Query  {
    getCart: [Product]!
  }
`;


export async function getCart(obj, options, { context }) {
    let user = strapi.requestContext.get().state.user

    if (!user) {
        throw new Error('API TOKENS CAN\'T ACCESS')
    }

    let result = await strapi.db.query('plugin::users-permissions.user').findOne({
        where : {
           id: user.id 
        },
        populate: {
            products: '*'
        }
    })

    return result.products;
}