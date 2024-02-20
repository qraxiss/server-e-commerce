import {
    getParentCategories,
    getParentCategoriesType,
    cretateCategoryWithSlug,
    createCategoryWithSlugType,
    getCategoryWithSlug,
    getCategoryWithSlugType
} from './category'

import { createProductWithSlug, createProductWithSlugType, getProductWithSlug, getProductWithSlugType } from './product'

import { getCart, getCartType, addProductToCart, addProductToCartType } from './cart'

import { profilePicture, profilePictureType, accountInformation, accountInformationType } from './user'

let typeList = [
    getCartType,
    getParentCategoriesType,
    createProductWithSlugType,
    createCategoryWithSlugType,
    getProductWithSlugType,
    getCategoryWithSlugType,
    addProductToCartType,
    profilePictureType,
    accountInformationType
]

export function createCustomMutationResolver({ strapi }) {
    return {
        typeDefs: typeList.join('\n'),
        resolversConfig: {
            Query: {
                getParentCategories: {
                    auth: false
                },
                getProductWithSlug: {
                    auth: false
                },
                getCategoryWithSlug: {
                    auth: false
                },
                profilePicture: {
                  auth: false
                }
            }
        },
        resolvers: {
            Query: {
                getCart: {
                    resolve: getCart
                },
                getParentCategories: {
                    resolve: getParentCategories
                },
                getProductWithSlug: {
                    resolve: getProductWithSlug
                },
                getCategoryWithSlug: {
                    resolve: getCategoryWithSlug
                },
                profilePicture: {
                    resolve: profilePicture
                },
                accountInformation: {
                  resolve: accountInformation
                }
            },
            Mutation: {
                addProductToCart: {
                    resolve: addProductToCart
                },
                cretateCategoryWithSlug: {
                    resolve: cretateCategoryWithSlug
                },
                cretateProductWithSlug: {
                    resolve: createProductWithSlug
                }
            }
        }
    }
}
