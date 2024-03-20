export const spinType = `
    type Mutation {
        spin(point:Int!) : Int!
    }
`

export async function spin(obj, { point }, context) {
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
            experiencePoints: experiencePoints + point,
            lastWheelSpinTime: (new Date()).valueOf()
        }
    })

    return currentExperiencePoints
}
