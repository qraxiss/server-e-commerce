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

import { profilePicture, profilePictureType } from './user'

let typeList = [
    getCartType,
    getParentCategoriesType,
    createProductWithSlugType,
    createCategoryWithSlugType,
    getProductWithSlugType,
    getCategoryWithSlugType,
    addProductToCartType,
    profilePictureType
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
