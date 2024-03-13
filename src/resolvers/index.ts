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

import { wishlist, wishlistType, addWishlist, addWishlistType, deleteWishListType, deleteWishlist } from './wishlist'

import { syncPrintful, syncPrintfulType } from './printful'

import { nonce, nonceType, registerWithWallet, registerWithWalletType, loginWithWallet, loginWithWalletType } from './wallet'

import {
    cart,
    cartType,
    addProductToCart,
    addProductToCartType,
    deleteProductFromCart,
    deleteProductFromCartType,
    addManyCart,
    addManyCartType
} from './cart'

import { accountInformation, accountInformationType, recipient, recipientTpye, updateRecipient, updateRecipientTpye } from './user'

import { newOrder, newOrderType, orders, ordersType } from './order'

let typeList = [
    recipientTpye,
    ordersType,
    updateRecipientTpye,
    cartType,
    newOrderType,
    nonceType,
    wishlistType,
    deleteWishListType,
    addWishlistType,
    syncPrintfulType,
    registerWithWalletType,
    loginWithWalletType,
    filterProductsType,
    createProductWithSlugType,
    createCategoryWithSlugType,
    productBySlugType,
    categoryBySlugType,
    addProductToCartType,
    accountInformationType,
    productsBySlugType,
    deleteProductFromCartType,
    productByCategoryType,
    addManyCartType
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
                orders: {
                    resolve: orders
                },
                recipient: {
                    resolve: recipient
                },
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
                accountInformation: {
                    resolve: accountInformation
                },
                productsBySlug: {
                    resolve: productsBySlug
                },
                nonce: {
                    resolve: nonce
                },
                wishlist: {
                    resolve: wishlist
                }
            },
            Mutation: {
                updateRecipient: {
                    resolve: updateRecipient
                },
                registerWithWallet: {
                    resolve: registerWithWallet
                },
                newOrder: {
                    resolve: newOrder
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
                },
                addManyCart: {
                    resolve: addManyCart
                },
                addWishlist: {
                    resolve: addWishlist
                },
                deleteWishlist: {
                    resolve: deleteWishlist
                }
            }
        }
    }
}
