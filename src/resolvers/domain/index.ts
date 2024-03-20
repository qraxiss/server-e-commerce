import { GraphQLError } from 'graphql'

export const getDomainsByUserType = `
    type Query {
        getDomainsByUser: [JSON!]
    }
`

export async function getDomainsByUser() {
    let domains = await strapi.db.query('api::domain.domain').findMany({
        filters: {
            user: {
                id: strapi.requestContext.get().state.user.id
            }
        }
    })

    return domains
}

export const addNewDomainToUserType = `
    type Mutation {
        addNewDomainToUser(domain:String!): JSON!
    }
`

export async function addNewDomainToUser(obj, { domain }, context) {
    return await strapi.entityService.create('api::domain.domain', {
        data: {
            domain,
            user: strapi.requestContext.get().state.user.id
        }
    })
}

export const chooseDomainType = `
    type Mutation {
        chooseDomain(domain:String!): JSON!
    }
`

export async function chooseDomain(obj, { domain }, context) {
    let { id } = await strapi.db.query('api::domain.domain').findOne({
        where: {
            domain,
            user: {
                id: strapi.requestContext.get().state.user.id
            }
        }
    })

    if (!id) {
        throw new GraphQLError('Domain not found or user not have this domain!')
    }

    return await strapi.db.query('plugin::users-permissions.user').update({
        where: {
            id: strapi.requestContext.get().state.user.id
        },
        data: {
            selected_domain: id
        }
    })
}

export const checkDomainType = `
    type Query {
        checkDomain(domain: String!): JSON!
    }
`

export async function checkDomain(obj, { domain }, context) {
    let res = await strapi.db.query('api::domain.domain').findOne({
        where: {
            domain,
            user: {
                id: strapi.requestContext.get().state.user.id
            }
        }
    })

    return !res
}
