export const profilePictureType = `
  type Query  {
    profilePicture: UploadFile!
  }
`

export async function profilePicture(obj, options, { context }) {
    let user = strapi.requestContext.get().state.user

    if (!user) {
        throw new Error("API TOKENS CAN'T ACCESS")
    }

    let result = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            id: user.id
        },
        populate: {
            picture: '*'
        }
    })

    if (result.picture) return result.picture

    let defaultPictures = await strapi.db.query('api::picture.picture').findOne({
        populate: {
            profilePicture: '*'
        }
    })
    console.log(defaultPictures)
    return defaultPictures.profilePicture
}
