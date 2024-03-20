export const loginStreakType = `
    type Mutation {
        loginStreak(point:Int!) : Int!
    }
`

export async function loginStreak(obj, { point }, context) {
    let data = await strapi.db.query('api::earn.earn').findOne({
        where: {
            user: {
                id: strapi.requestContext.get().state.user.id
            }
        }
    })

    if (data.login.loginCount === 6) {
        data.login.loginCount = 0
    } else {
        data.login.loginCount = data.login.loginCount + 1
    }

    data.login.lastLogin = (new Date()).valueOf()

    data.experiencePoints = data.experiencePoints + point

    console.log(data)

    let { experiencePoints: currentExperiencePoints } = await strapi.db.query('api::earn.earn').update({
        where: {
            user: {
                id: strapi.requestContext.get().state.user.id
            }
        },
        data
    })

    return currentExperiencePoints
}
