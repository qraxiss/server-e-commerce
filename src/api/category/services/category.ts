import { factories } from '@strapi/strapi'
import slugify from 'slugify'
import randomstring from 'randomstring'

export default factories.createCoreService('api::category.category', ({ strapi }) => ({
    async createWithSlug(params) {
        params.slug = slugify(`${params.name}`, {
            lower: true
        })

        const category = await strapi.db.query('api::category.category').findOne({
            where: {
                slug: params.slug
            }
        })

        if (category) {
            params.slug = `${params.slug}-${randomstring.generate({
                length: 3,
                charset: 'alphabetic',
                capitalization: 'lowercase'
            })}`
        }

        const result = await strapi.entityService.create('api::category.category', {
            data: params
        })

        return result
    }
}))
