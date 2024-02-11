import type { Schema, Attribute } from '@strapi/strapi';

export interface ProductOption extends Schema.Component {
  collectionName: 'components_product_options';
  info: {
    displayName: 'option';
    description: '';
  };
  attributes: {
    value: Attribute.String & Attribute.Required;
  };
}

export interface ProductTag extends Schema.Component {
  collectionName: 'components_product_tags';
  info: {
    displayName: 'tag';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
  };
}

export interface ProductVariants extends Schema.Component {
  collectionName: 'components_product_variants';
  info: {
    displayName: 'variant';
    description: '';
  };
  attributes: {
    options: Attribute.Component<'product.option', true>;
    type: Attribute.String & Attribute.Required;
  };
}

export interface StaticCampaign extends Schema.Component {
  collectionName: 'components_static_campaigns';
  info: {
    displayName: 'Campaign';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    heading: Attribute.String & Attribute.Required;
    subHeading: Attribute.String & Attribute.Required;
    btnText: Attribute.String & Attribute.Required;
    btnLink: Attribute.String & Attribute.Required & Attribute.DefaultTo<'/'>;
  };
}

export interface StaticFact extends Schema.Component {
  collectionName: 'components_static_facts';
  info: {
    displayName: 'fact';
  };
  attributes: {};
}

export interface StaticPeople extends Schema.Component {
  collectionName: 'components_static_people';
  info: {
    displayName: 'people';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    avatar: Attribute.Media;
    job: Attribute.String & Attribute.Required;
  };
}

export interface StaticSocial extends Schema.Component {
  collectionName: 'components_static_socials';
  info: {
    displayName: 'social';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    icon: Attribute.Media;
    href: Attribute.String & Attribute.Required;
  };
}

export interface UserAddress extends Schema.Component {
  collectionName: 'components_user_addresses';
  info: {
    displayName: 'address';
    description: '';
  };
  attributes: {
    country: Attribute.String & Attribute.Required;
    city: Attribute.String & Attribute.Required;
    addressLine1: Attribute.String & Attribute.Required;
    zipCode: Attribute.String & Attribute.Required;
    state: Attribute.String;
    addressLine2: Attribute.String & Attribute.Required;
  };
}

export interface UserCart extends Schema.Component {
  collectionName: 'components_user_carts';
  info: {
    displayName: 'cart';
  };
  attributes: {
    products: Attribute.Relation<
      'user.cart',
      'oneToMany',
      'api::product.product'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'product.option': ProductOption;
      'product.tag': ProductTag;
      'product.variants': ProductVariants;
      'static.campaign': StaticCampaign;
      'static.fact': StaticFact;
      'static.people': StaticPeople;
      'static.social': StaticSocial;
      'user.address': UserAddress;
      'user.cart': UserCart;
    }
  }
}
