import {
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

import { syncPrintful, syncPrintfulType } from './printful'

import { nonce, nonceType, registerWithWallet, registerWithWalletType, loginWithWallet, loginWithWalletType } from './wallet'

import { cart, cartType, addProductToCart, addProductToCartType, deleteProductFromCart, deleteProductFromCartType } from './cart'

import { profilePicture, profilePictureType, accountInformation, accountInformationType } from './user'

let typeList = [
    cartType,
    nonceType,
    syncPrintfulType,
    registerWithWalletType,
    loginWithWalletType,
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
                },
                nonce: {
                    auth: false
                }
            },
            Mutation: {
                registerWithWallet: {
                    auth: false
                },
                loginWithWallet: {
                    auth: false
                },
                syncPrintful: {
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
                },
                nonce: {
                    resolve: nonce
                }
            },
            Mutation: {
                registerWithWallet: {
                    resolve: registerWithWallet
                },
                syncPrintful: {
                    resolve: syncPrintful
                },
                loginWithWallet: {
                    resolve: loginWithWallet
                },
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
