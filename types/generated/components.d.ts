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
      'static.fact': StaticFact;
      'static.people': StaticPeople;
      'user.address': UserAddress;
      'user.cart': UserCart;
    }
  }
}
