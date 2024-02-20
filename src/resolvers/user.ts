export const profilePictureType = `
  type Query  {
    profilePicture: UploadFile!
  }
`

export async function profilePicture(obj, options, { context }) {
    let user = strapi.requestContext.get().state.user

    async function getDefaultPictures(){
        let defaultPictures = await strapi.db.query('api::picture.picture').findOne({
            populate: {
                profilePicture: '*'
            }
        })
        return defaultPictures 
    }

    if (!user) {
        return (await getDefaultPictures()).profilePicture
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


    return (await getDefaultPictures()).profilePicture
}

export const accountInformationType = `
    type Account {
        name: String
        surname: String
        addresses: [JSON]
        email: String
    }

    type Query  {
    accountInformation: Account!
  }
`

export async function accountInformation(obj, options, {context}){
    let user = strapi.requestContext.get().state.user

    if (!user){
        throw new Error('You must logged in')
    }


    let result = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
            id: user.id
        },
        populate: {
            name : "*",
            surname: "*",
            addresses: "*"
        }
    })

    return result

}


