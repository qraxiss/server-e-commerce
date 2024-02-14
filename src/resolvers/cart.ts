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
    cart: [Product]!
  }
`;

export const cart = async (parent, args, context) => {
  let ctx = strapi.requestContext.get();
  let jwt = (ctx.headers.authorization as string).split(" ")[1];

  try {
    let { id } = JWT.verify(jwt, process.env.JWT_SECRET) as {
      id: Number;
    };

    let data = await strapi.db.query("plugin::users-permissions.user").findOne({
      populate: {
        products: {
          filters: {},
          populate: {
            variants: {
              populate: {
                options: "*",
              },
            },
            categories: "*",
          },
        },
      },
      where: {
        id,
      },
    });

    return data.products;
  } catch (error) {
    console.log(error.message);
    throw new GraphQLError(error.message);
  }
};
