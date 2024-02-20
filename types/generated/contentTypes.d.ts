import type { Schema, Attribute } from '@strapi/strapi'

export interface AdminPermission extends Schema.CollectionType {
    collectionName: 'admin_permissions'
    info: {
        name: 'Permission'
        description: ''
        singularName: 'permission'
        pluralName: 'permissions'
        displayName: 'Permission'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        action: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>
        subject: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        properties: Attribute.JSON & Attribute.DefaultTo<{}>
        conditions: Attribute.JSON & Attribute.DefaultTo<[]>
        role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface AdminUser extends Schema.CollectionType {
    collectionName: 'admin_users'
    info: {
        name: 'User'
        description: ''
        singularName: 'user'
        pluralName: 'users'
        displayName: 'User'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        firstname: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        lastname: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        username: Attribute.String
        email: Attribute.Email &
            Attribute.Required &
            Attribute.Private &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 6
            }>
        password: Attribute.Password &
            Attribute.Private &
            Attribute.SetMinMaxLength<{
                minLength: 6
            }>
        resetPasswordToken: Attribute.String & Attribute.Private
        registrationToken: Attribute.String & Attribute.Private
        isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
        roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> & Attribute.Private
        blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
        preferedLanguage: Attribute.String
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface AdminRole extends Schema.CollectionType {
    collectionName: 'admin_roles'
    info: {
        name: 'Role'
        description: ''
        singularName: 'role'
        pluralName: 'roles'
        displayName: 'Role'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        code: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        description: Attribute.String
        users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>
        permissions: Attribute.Relation<'admin::role', 'oneToMany', 'admin::permission'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface AdminApiToken extends Schema.CollectionType {
    collectionName: 'strapi_api_tokens'
    info: {
        name: 'Api Token'
        singularName: 'api-token'
        pluralName: 'api-tokens'
        displayName: 'Api Token'
        description: ''
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        description: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }> &
            Attribute.DefaultTo<''>
        type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> & Attribute.Required & Attribute.DefaultTo<'read-only'>
        accessKey: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        lastUsedAt: Attribute.DateTime
        permissions: Attribute.Relation<'admin::api-token', 'oneToMany', 'admin::api-token-permission'>
        expiresAt: Attribute.DateTime
        lifespan: Attribute.BigInteger
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
    collectionName: 'strapi_api_token_permissions'
    info: {
        name: 'API Token Permission'
        description: ''
        singularName: 'api-token-permission'
        pluralName: 'api-token-permissions'
        displayName: 'API Token Permission'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        action: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        token: Attribute.Relation<'admin::api-token-permission', 'manyToOne', 'admin::api-token'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface AdminTransferToken extends Schema.CollectionType {
    collectionName: 'strapi_transfer_tokens'
    info: {
        name: 'Transfer Token'
        singularName: 'transfer-token'
        pluralName: 'transfer-tokens'
        displayName: 'Transfer Token'
        description: ''
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        description: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }> &
            Attribute.DefaultTo<''>
        accessKey: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        lastUsedAt: Attribute.DateTime
        permissions: Attribute.Relation<'admin::transfer-token', 'oneToMany', 'admin::transfer-token-permission'>
        expiresAt: Attribute.DateTime
        lifespan: Attribute.BigInteger
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
    collectionName: 'strapi_transfer_token_permissions'
    info: {
        name: 'Transfer Token Permission'
        description: ''
        singularName: 'transfer-token-permission'
        pluralName: 'transfer-token-permissions'
        displayName: 'Transfer Token Permission'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        action: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        token: Attribute.Relation<'admin::transfer-token-permission', 'manyToOne', 'admin::transfer-token'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginUploadFile extends Schema.CollectionType {
    collectionName: 'files'
    info: {
        singularName: 'file'
        pluralName: 'files'
        displayName: 'File'
        description: ''
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String & Attribute.Required
        alternativeText: Attribute.String
        caption: Attribute.String
        width: Attribute.Integer
        height: Attribute.Integer
        formats: Attribute.JSON
        hash: Attribute.String & Attribute.Required
        ext: Attribute.String
        mime: Attribute.String & Attribute.Required
        size: Attribute.Decimal & Attribute.Required
        url: Attribute.String & Attribute.Required
        previewUrl: Attribute.String
        provider: Attribute.String & Attribute.Required
        provider_metadata: Attribute.JSON
        related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>
        folder: Attribute.Relation<'plugin::upload.file', 'manyToOne', 'plugin::upload.folder'> & Attribute.Private
        folderPath: Attribute.String &
            Attribute.Required &
            Attribute.Private &
            Attribute.SetMinMax<
                {
                    min: 1
                },
                number
            >
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginUploadFolder extends Schema.CollectionType {
    collectionName: 'upload_folders'
    info: {
        singularName: 'folder'
        pluralName: 'folders'
        displayName: 'Folder'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMax<
                {
                    min: 1
                },
                number
            >
        pathId: Attribute.Integer & Attribute.Required & Attribute.Unique
        parent: Attribute.Relation<'plugin::upload.folder', 'manyToOne', 'plugin::upload.folder'>
        children: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.folder'>
        files: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.file'>
        path: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMax<
                {
                    min: 1
                },
                number
            >
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
    collectionName: 'strapi_releases'
    info: {
        singularName: 'release'
        pluralName: 'releases'
        displayName: 'Release'
    }
    options: {
        draftAndPublish: false
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String & Attribute.Required
        releasedAt: Attribute.DateTime
        actions: Attribute.Relation<'plugin::content-releases.release', 'oneToMany', 'plugin::content-releases.release-action'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::content-releases.release', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::content-releases.release', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginContentReleasesReleaseAction extends Schema.CollectionType {
    collectionName: 'strapi_release_actions'
    info: {
        singularName: 'release-action'
        pluralName: 'release-actions'
        displayName: 'Release Action'
    }
    options: {
        draftAndPublish: false
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required
        entry: Attribute.Relation<'plugin::content-releases.release-action', 'morphToOne'>
        contentType: Attribute.String & Attribute.Required
        locale: Attribute.String
        release: Attribute.Relation<'plugin::content-releases.release-action', 'manyToOne', 'plugin::content-releases.release'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::content-releases.release-action', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::content-releases.release-action', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginI18NLocale extends Schema.CollectionType {
    collectionName: 'i18n_locale'
    info: {
        singularName: 'locale'
        pluralName: 'locales'
        collectionName: 'locales'
        displayName: 'Locale'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String &
            Attribute.SetMinMax<
                {
                    min: 1
                    max: 50
                },
                number
            >
        code: Attribute.String & Attribute.Unique
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginUsersPermissionsPermission extends Schema.CollectionType {
    collectionName: 'up_permissions'
    info: {
        name: 'permission'
        description: ''
        singularName: 'permission'
        pluralName: 'permissions'
        displayName: 'Permission'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        action: Attribute.String & Attribute.Required
        role: Attribute.Relation<'plugin::users-permissions.permission', 'manyToOne', 'plugin::users-permissions.role'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::users-permissions.permission', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::users-permissions.permission', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
    collectionName: 'up_roles'
    info: {
        name: 'role'
        description: ''
        singularName: 'role'
        pluralName: 'roles'
        displayName: 'Role'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 3
            }>
        description: Attribute.String
        type: Attribute.String & Attribute.Unique
        permissions: Attribute.Relation<'plugin::users-permissions.role', 'oneToMany', 'plugin::users-permissions.permission'>
        users: Attribute.Relation<'plugin::users-permissions.role', 'oneToMany', 'plugin::users-permissions.user'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
    collectionName: 'up_users'
    info: {
        name: 'user'
        description: ''
        singularName: 'user'
        pluralName: 'users'
        displayName: 'User'
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        username: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 3
            }>
        email: Attribute.Email &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 6
            }>
        provider: Attribute.String
        password: Attribute.Password &
            Attribute.Private &
            Attribute.SetMinMaxLength<{
                minLength: 6
            }>
        resetPasswordToken: Attribute.String & Attribute.Private
        confirmationToken: Attribute.String & Attribute.Private
        confirmed: Attribute.Boolean & Attribute.DefaultTo<false>
        blocked: Attribute.Boolean & Attribute.DefaultTo<false>
        role: Attribute.Relation<'plugin::users-permissions.user', 'manyToOne', 'plugin::users-permissions.role'>
        address: Attribute.Component<'user.address'>
        products: Attribute.Relation<'plugin::users-permissions.user', 'oneToMany', 'api::product.product'>
        cart: Attribute.Component<'product.cart', true>
        picture: Attribute.Media
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiAboutAbout extends Schema.SingleType {
    collectionName: 'abouts'
    info: {
        singularName: 'about'
        pluralName: 'abouts'
        displayName: 'about'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        text: Attribute.Text & Attribute.Required
        rightImg: Attribute.Media
        footerAbout: Attribute.String
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::about.about', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::about.about', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiCampaignCampaign extends Schema.SingleType {
    collectionName: 'campaigns'
    info: {
        singularName: 'campaign'
        pluralName: 'campaigns'
        displayName: 'campaign'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        campaigns: Attribute.Component<'static.campaign', true>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::campaign.campaign', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::campaign.campaign', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiCategoryCategory extends Schema.CollectionType {
    collectionName: 'categories'
    info: {
        singularName: 'category'
        pluralName: 'categories'
        displayName: 'category'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        name: Attribute.String
        products: Attribute.Relation<'api::category.category', 'manyToMany', 'api::product.product'>
        childs: Attribute.Relation<'api::category.category', 'oneToMany', 'api::category.category'>
        slug: Attribute.String & Attribute.Unique
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::category.category', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::category.category', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiContactContact extends Schema.CollectionType {
    collectionName: 'contacts'
    info: {
        singularName: 'contact'
        pluralName: 'contacts'
        displayName: 'contact'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        name: Attribute.String & Attribute.Required
        subject: Attribute.String & Attribute.Required
        email: Attribute.Email & Attribute.Required
        message: Attribute.Text & Attribute.Required
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::contact.contact', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::contact.contact', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiFooterFooter extends Schema.SingleType {
    collectionName: 'footers'
    info: {
        singularName: 'footer'
        pluralName: 'footers'
        displayName: 'footer'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        shopcek: Attribute.Component<'static.footer-item', true>
        legal: Attribute.Component<'static.footer-item', true>
        about: Attribute.String & Attribute.Required
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::footer.footer', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::footer.footer', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiLogoLogo extends Schema.SingleType {
    collectionName: 'logos'
    info: {
        singularName: 'logo'
        pluralName: 'logos'
        displayName: 'logo'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        icon: Attribute.Media
        text: Attribute.Media
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::logo.logo', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::logo.logo', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiNewsletterNewsletter extends Schema.CollectionType {
    collectionName: 'newsletters'
    info: {
        singularName: 'newsletter'
        pluralName: 'newsletters'
        displayName: 'newsletter'
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        email: Attribute.Email & Attribute.Unique
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::newsletter.newsletter', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::newsletter.newsletter', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiPeoplePeople extends Schema.SingleType {
    collectionName: 'peoples'
    info: {
        singularName: 'people'
        pluralName: 'peoples'
        displayName: 'people'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        people: Attribute.Component<'static.people', true>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::people.people', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::people.people', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiPicturePicture extends Schema.SingleType {
    collectionName: 'pictures'
    info: {
        singularName: 'picture'
        pluralName: 'pictures'
        displayName: 'Default Picture'
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        profilePicture: Attribute.Media & Attribute.Required
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::picture.picture', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::picture.picture', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiProductProduct extends Schema.CollectionType {
    collectionName: 'products'
    info: {
        singularName: 'product'
        pluralName: 'products'
        displayName: 'product'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    pluginOptions: {
        i18n: {
            localized: true
        }
    }
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true
                }
            }>
        price: Attribute.Decimal &
            Attribute.Required &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true
                }
            }>
        images: Attribute.Media &
            Attribute.Required &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true
                }
            }>
        description: Attribute.Text &
            Attribute.Required &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true
                }
            }>
        variants: Attribute.Component<'product.variants', true> &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true
                }
            }>
        categories: Attribute.Relation<'api::product.product', 'manyToMany', 'api::category.category'>
        slug: Attribute.String &
            Attribute.Unique &
            Attribute.SetPluginOptions<{
                i18n: {
                    localized: true
                }
            }>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::product.product', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::product.product', 'oneToOne', 'admin::user'> & Attribute.Private
        localizations: Attribute.Relation<'api::product.product', 'oneToMany', 'api::product.product'>
        locale: Attribute.String
    }
}

export interface ApiSocialSocial extends Schema.SingleType {
    collectionName: 'socials'
    info: {
        singularName: 'social'
        pluralName: 'socials'
        displayName: 'social'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        socials: Attribute.Component<'static.social', true>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::social.social', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::social.social', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

declare module '@strapi/types' {
    export module Shared {
        export interface ContentTypes {
            'admin::permission': AdminPermission
            'admin::user': AdminUser
            'admin::role': AdminRole
            'admin::api-token': AdminApiToken
            'admin::api-token-permission': AdminApiTokenPermission
            'admin::transfer-token': AdminTransferToken
            'admin::transfer-token-permission': AdminTransferTokenPermission
            'plugin::upload.file': PluginUploadFile
            'plugin::upload.folder': PluginUploadFolder
            'plugin::content-releases.release': PluginContentReleasesRelease
            'plugin::content-releases.release-action': PluginContentReleasesReleaseAction
            'plugin::i18n.locale': PluginI18NLocale
            'plugin::users-permissions.permission': PluginUsersPermissionsPermission
            'plugin::users-permissions.role': PluginUsersPermissionsRole
            'plugin::users-permissions.user': PluginUsersPermissionsUser
            'api::about.about': ApiAboutAbout
            'api::campaign.campaign': ApiCampaignCampaign
            'api::category.category': ApiCategoryCategory
            'api::contact.contact': ApiContactContact
            'api::footer.footer': ApiFooterFooter
            'api::logo.logo': ApiLogoLogo
            'api::newsletter.newsletter': ApiNewsletterNewsletter
            'api::people.people': ApiPeoplePeople
            'api::picture.picture': ApiPicturePicture
            'api::product.product': ApiProductProduct
            'api::social.social': ApiSocialSocial
        }
    }
}
