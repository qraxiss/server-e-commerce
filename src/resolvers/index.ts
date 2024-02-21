import {
    parentCategories,
    parentCategoriesType,
    createCategoryWithSlug,
    createCategoryWithSlugType,
    categoryBySlug,
    categoryBySlugType
} from './category'

import { createProductWithSlug, createProductWithSlugType, productBySlug, productBySlugType } from './product'

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
    accountInformationType
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
