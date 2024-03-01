import {
    // parentCategories,
    // parentCategoriesType,
    createCategoryWithSlug,
    createCategoryWithSlugType,
    categoryBySlug,
    categoryBySlugType,
    productByCategory,
    productByCategoryType
} from './category'

import {
    createProductWithSlug,
    createProductWithSlugType,
    productBySlug,
    productBySlugType,
    productsBySlug,
    productsBySlugType,
    filterProducts,
    filterProductsType
} from './product'

import { cart, cartType, addProductToCart, addProductToCartType, deleteProductFromCart, deleteProductFromCartType } from './cart'

import { profilePicture, profilePictureType, accountInformation, accountInformationType } from './user'

let typeList = [
    cartType,
    // parentCategoriesType,
    filterProductsType,
    createProductWithSlugType,
    createCategoryWithSlugType,
    productBySlugType,
    categoryBySlugType,
    addProductToCartType,
    profilePictureType,
    accountInformationType,
    productsBySlugType,
    deleteProductFromCartType,
    productByCategoryType
]

export function createCustomMutationResolver({ strapi }) {
    return {
        typeDefs: typeList.join('\n'),
        resolversConfig: {
            Query: {
                // parentCategories: {
                //     auth: false
                // },
                filterProducts: {
                    auth: false
                },
                productBySlug: {
                    auth: false
                },
                categoryBySlug: {
                    auth: false
                },
                profilePicture: {
                    auth: false
                },
                productsBySlug: {
                    auth: false
                },
                productByCategory: {
                    auth: false
                }
            }
        },
        resolvers: {
            Query: {
                productByCategory: {
                    resolve: productByCategory
                },
                cart: {
                    resolve: cart
                },
                filterProducts: {
                    resolve: filterProducts
                },
                productBySlug: {
                    resolve: productBySlug
                },
                categoryBySlug: {
                    resolve: categoryBySlug
                },
                profilePicture: {
                    resolve: profilePicture
                },
                accountInformation: {
                    resolve: accountInformation
                },
                productsBySlug: {
                    resolve: productsBySlug
                }
            },
            Mutation: {
                deleteProductFromCart: {
                    resolve: deleteProductFromCart
                },
                addProductToCart: {
                    resolve: addProductToCart
                },
                createCategoryWithSlug: {
                    resolve: createCategoryWithSlug
                },
                createProductWithSlug: {
                    resolve: createProductWithSlug
                }
            }
        }
    }
}
