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

import {
    nonce,
    nonceType,
    registerWithWallet,
    registerWithWalletType,
    loginWithWallet,
    loginWithWalletType,
    connectWallet,
    connectWalletType
} from './wallet'

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

import {
    newOrder,
    newOrderType,
    orders,
    ordersType,
    newPrintfulOrder,
    newPrintfulOrderType,
    printfulOrdersByUser,
    printfulOrdersByUserType,
    printfulOrderWithProducts,
    printfulOrderWithProductsType
} from './order'

import { registerWithDefaultValues, registerWithDefaultValuesType } from './user/auth'

import { getDomainsByUser, getDomainsByUserType, chooseDomain, chooseDomainType, addNewDomainToUser, addNewDomainToUserType } from './domain'

import { addXp, addXpType, xp, xpType } from './earn/xp'

import { spin, spinType } from './earn/spin'
import { loginStreak, loginStreakType } from './earn/login'

import { checkDomain, checkDomainType } from './domain'

let typeList = [
    addXpType,
    loginStreakType,
    checkDomainType,
    spinType,
    xpType,
    connectWalletType,
    newPrintfulOrderType,
    getDomainsByUserType,
    chooseDomainType,
    addNewDomainToUserType,
    printfulOrdersByUserType,
    printfulOrderWithProductsType,
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
    addManyCartType,
    registerWithDefaultValuesType
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
                },
                printfulOrder: {
                    auth: false
                },
                printfulOrderWithProducts: {
                    auth: false
                }
            },
            Mutation: {
                registerWithWallet: {
                    auth: false
                },
                connectWallet: {
                    auth: false
                },
                loginWithWallet: {
                    auth: false
                },
                syncPrintful: {
                    auth: false
                },
                registerWithDefaultValues: {
                    auth: false
                }
            }
        },
        resolvers: {
            Query: {
                orders: {
                    resolve: orders
                },
                checkDomain: {
                    resolve: checkDomain
                },
                xp: {
                    resolve: xp
                },
                getDomainsByUser: {
                    resolve: getDomainsByUser
                },
                printfulOrdersByUser: {
                    resolve: printfulOrdersByUser
                },
                printfulOrderWithProducts: {
                    resolve: printfulOrderWithProducts
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
                newPrintfulOrder: {
                    resolve: newPrintfulOrder
                },
                spin: {
                    resolve: spin
                },
                loginStreak: {
                    resolve: loginStreak
                },
                connectWallet: {
                    resolve: connectWallet
                },
                addXp: {
                    resolve: addXp
                },
                chooseDomain: {
                    resolve: chooseDomain
                },
                addNewDomainToUser: {
                    resolve: addNewDomainToUser
                },
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
                },
                registerWithDefaultValues: {
                    resolve: registerWithDefaultValues
                }
            }
        }
    }
}
