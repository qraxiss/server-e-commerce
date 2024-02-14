import { factories } from "@strapi/strapi";
import slugify from "slugify";
import randomstring from "randomstring";

export default factories.createCoreService(
  "api::category.category",
  ({ strapi }) => ({
    async createWithSlug(params) {
      params.slug = slugify(`${params.text}`, {
        lower: true,
      });

      const result = await strapi.entityService.create(
        "api::category.category",
        {
          data: params,
        }
      );

      return result;
    },
  })
);
