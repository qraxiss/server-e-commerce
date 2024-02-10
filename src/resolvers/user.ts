import JWT from "jsonwebtoken";
import { config } from "dotenv";
import { GraphQLError } from "graphql";

config();

export const mutation = `
  type JWT {
      id: Int!
      iat: Int!
      exp: Int!
  }

  type Query {
    user(jwt: String!): JSON!
  }
`;

export const user = async (parent, args, context) => {
  const { jwt } = args;
  let data;
  try {
    data = JWT.verify(jwt, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error.message);
    throw new GraphQLError(error.message);
  }

  console.log(strapi.plugin("graphql").services.utils.mappers.grahp);

  return await strapi.entityService.findOne("api::cart.cart", data.id);
};
