import type { Schema, Attribute } from '@strapi/strapi'

export interface ProductCart extends Schema.Component {
    collectionName: 'components_product_carts'
    info: {
        displayName: 'cart'
    }
    attributes: {
        product: Attribute.Relation<'product.cart', 'oneToOne', 'api::product.product'>
        option: Attribute.Component<'product.selected-options'>
    }
}

export interface ProductOption extends Schema.Component {
    collectionName: 'components_product_options'
    info: {
        displayName: 'option'
        description: ''
    }
    attributes: {
        value: Attribute.String & Attribute.Required
    }
}

export interface ProductSelectedOptions extends Schema.Component {
    collectionName: 'components_product_selected_options'
    info: {
        displayName: 'selected-options'
    }
    attributes: {
        name: Attribute.String & Attribute.Required
        value: Attribute.String & Attribute.Required
    }
}

export interface ProductTag extends Schema.Component {
    collectionName: 'components_product_tags'
    info: {
        displayName: 'tag'
    }
    attributes: {
        name: Attribute.String & Attribute.Required
    }
}

export interface ProductVariants extends Schema.Component {
    collectionName: 'components_product_variants'
    info: {
        displayName: 'variant'
        description: ''
    }
    attributes: {
        options: Attribute.Component<'product.option', true>
        name: Attribute.String & Attribute.Required
    }
}

export interface StaticCampaign extends Schema.Component {
    collectionName: 'components_static_campaigns'
    info: {
        displayName: 'Campaign'
    }
    attributes: {
        image: Attribute.Media & Attribute.Required
        heading: Attribute.String & Attribute.Required
        subHeading: Attribute.String & Attribute.Required
        btnText: Attribute.String & Attribute.Required
        btnLink: Attribute.String & Attribute.Required & Attribute.DefaultTo<'/'>
    }
}

export interface StaticFact extends Schema.Component {
    collectionName: 'components_static_facts'
    info: {
        displayName: 'fact'
    }
    attributes: {}
}

export interface StaticFooterItem extends Schema.Component {
    collectionName: 'components_static_footer_items'
    info: {
        displayName: 'footerItem'
    }
    attributes: {
        name: Attribute.String & Attribute.Required
        url: Attribute.String & Attribute.Required
    }
}

export interface StaticPeople extends Schema.Component {
    collectionName: 'components_static_people'
    info: {
        displayName: 'people'
    }
    attributes: {
        name: Attribute.String & Attribute.Required
        avatar: Attribute.Media
        job: Attribute.String & Attribute.Required
    }
}

export interface StaticSocial extends Schema.Component {
    collectionName: 'components_static_socials'
    info: {
        displayName: 'social'
        description: ''
    }
    attributes: {
        name: Attribute.String & Attribute.Required
        icon: Attribute.Media & Attribute.Required
        url: Attribute.String & Attribute.Required
    }
}

export interface UserAddress extends Schema.Component {
    collectionName: 'components_user_addresses'
    info: {
        displayName: 'address'
        description: ''
    }
    attributes: {
        country: Attribute.String & Attribute.Required
        city: Attribute.String & Attribute.Required
        addressLine1: Attribute.String & Attribute.Required
        zipCode: Attribute.String & Attribute.Required
        state: Attribute.String
        addressLine2: Attribute.String & Attribute.Required
        addressName: Attribute.String & Attribute.Required
    }
}

export interface UserCart extends Schema.Component {
    collectionName: 'components_user_carts'
    info: {
        displayName: 'cart'
    }
    attributes: {
        products: Attribute.Relation<'user.cart', 'oneToMany', 'api::product.product'>
    }
}

declare module '@strapi/types' {
    export module Shared {
        export interface Components {
            'product.cart': ProductCart
            'product.option': ProductOption
            'product.selected-options': ProductSelectedOptions
            'product.tag': ProductTag
            'product.variants': ProductVariants
            'static.campaign': StaticCampaign
            'static.fact': StaticFact
            'static.footer-item': StaticFooterItem
            'static.people': StaticPeople
            'static.social': StaticSocial
            'user.address': UserAddress
            'user.cart': UserCart
        }
    }
}
