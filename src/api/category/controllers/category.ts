/**
 * category controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async create(ctx: any) {
      const result = await strapi
        .service("api::category.category")
        .createWithSlug(ctx);

      return result;
    },
  })
);
