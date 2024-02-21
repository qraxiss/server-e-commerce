import {
    parentCategories,
    parentCategoriesType,
    createCategoryWithSlug,
    createCategoryWithSlugType,
    categoryBySlug,
    categoryBySlugType
} from './category'

import { createProductWithSlug, createProductWithSlugType, productBySlug, productBySlugType, productsBySlug, productsBySlugType } from './product'

import { cart, cartType, addProductToCart, addProductToCartType } from './cart'

import { profilePicture, profilePictureType, accountInformation, accountInformationType } from './user'

let typeList = [
    cartType,
    parentCategoriesType,
    createProductWithSlugType,
    createCategoryWithSlugType,
    productBySlugType,
    categoryBySlugType,
    addProductToCartType,
    profilePictureType,
    accountInformationType,
    productsBySlugType
]

export function createCustomMutationResolver({ strapi }) {
    return {
        typeDefs: typeList.join('\n'),
        resolversConfig: {
            Query: {
                parentCategories: {
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
                }
            }
        },
        resolvers: {
            Query: {
                cart: {
                    resolve: cart
                },
                parentCategories: {
                    resolve: parentCategories
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
