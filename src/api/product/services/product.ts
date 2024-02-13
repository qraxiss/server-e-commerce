/**
 * product service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::product.product",
  ({ strapi }) => ({
    // Method 1: Creating an entirely new custom service
    async exampleService(...args) {
      let response = { okay: true };

      if (response.okay === false) {
        return { response, error: true };
      }

      return response;
    },

    // Method 2: Wrapping a core service (leaves core logic in place)
    async find(...args) {
      // Calling the default core controller
      const { results, pagination } = await super.find(...args);

      // some custom logic
      results.forEach((result) => {
        result.counter = 1;
      });

      return { results, pagination, hi: "selam dünya" };
    },

    // Method 3: Replacing a core service
  })
);

// import schemas from "../../../../schemas";
// import content_schemas from "../../../../general-schemas";

// export default factories.createCoreService(
//   "api::article.article",
//   ({ strapi }): {} => ({
//     async create(params: {
//       data: content_schemas.GetAttributesValues<"api::article.article">;
//       files: content_schemas.GetAttributesValues<"plugin::upload.file">;
//     }): Promise<schemas.ApiArticleArticle> {
//       params.data.publishedAt = Date.now().toString();
//       const results = await strapi.entityService.create(
//         "api::article.article",
//         {
//           data: params.data,
//         }
//       );
//       return results;
//     },
//   })
// );
