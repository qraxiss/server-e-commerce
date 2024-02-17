import { createCustomMutationResolver } from "./graphql";

export default {
  register({ strapi }) {
    const extensionService = strapi.service("plugin::graphql.extension");
    extensionService.use(createCustomMutationResolver);
  },

  bootstrap(/*{ strapi }*/) {},
};
