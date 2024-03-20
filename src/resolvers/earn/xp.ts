export const addXpType = `
    type Mutation {
        addXp(point:Int!) : Int!
    }
`

export async function addXp(obj, { point }, context) {
    let { experiencePoints } = await strapi.db.query('api::earn.earn').findOne({
        where: {
            user: {
                id: strapi.requestContext.get().state.user.id
            }
        }
    })

    let { experiencePoints: currentExperiencePoints } = await strapi.db.query('api::earn.earn').update({
        where: {
            user: {
                id: strapi.requestContext.get().state.user.id
            }
        },
        data: {
            experiencePoints: experiencePoints + point
        }
    })

    return currentExperiencePoints
}

export const xpType = `
    type Query {
        xp: Int!
    }
`

export async function xp(obj, args, context) {
    let { experiencePoints } = await strapi.db.query('api::earn.earn').findOne({
        where: {
            user: {
                id: strapi.requestContext.get().state.user.id
            }
        }
    })

    return experiencePoints
}
