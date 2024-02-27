import { factories } from '@strapi/strapi'
import slugify from 'slugify'
import randomstring from 'randomstring'

export default factories.createCoreService('api::product.product', ({ strapi }) => ({
    async createWithSlug(params) {
        params.slug = slugify(`${params.name}`, {
            lower: true
        })

        const product = await strapi.db.query('api::product.product').findOne({
            where: {
                slug: params.slug
            }
        })

        if (product) {
            params.slug = `${params.slug}-${randomstring.generate({
                length: 3,
                charset: 'alphabetic',
                capitalization: 'lowercase'
            })}`
        }

        const result = await strapi.entityService.create('api::product.product', {
            data: params
        })

        return result
    }
}))
