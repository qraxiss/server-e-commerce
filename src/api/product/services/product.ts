import { factories } from '@strapi/strapi'
import slugify from 'slugify'
import randomstring from 'randomstring'

export default factories.createCoreService('api::product.product', ({ strapi }) => ({
    async createWithSlug(params) {
        params.slug = slugify(`${params.name}`, {
            lower: true
        })

        const result = await strapi.entityService.create('api::product.product', {
            data: params
        })

        return result
    }
}))
