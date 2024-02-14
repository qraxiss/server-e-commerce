import { factories } from "@strapi/strapi";
import slugify from "slugify";
import randomstring from "randomstring";

export default factories.createCoreService(
  "api::product.product",
  ({ strapi }) => ({
    // Method 2: Wrapping a core service (leaves core logic in place)
    async createWithSlug(params) {
      // some logic here
      console.log(params);

      params.slug = slugify(`${params.name}`, {
        lower: true,
      });

      console.log(params);

      const result = await strapi.entityService.create("api::product.product", {
        data: params,
      });

      return result;

      //   strapi.entityService.create
    },
  })
);
