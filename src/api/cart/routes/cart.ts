/**
 * cart router
 */

import { factories } from "@strapi/strapi";

console.log(factories.createCoreRouter("api::cart.cart"));

export default factories.createCoreRouter("api::cart.cart");
