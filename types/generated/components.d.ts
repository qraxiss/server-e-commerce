import type { Schema, Attribute } from '@strapi/strapi'

export interface EarnDailyLoginStreak extends Schema.Component {
    collectionName: 'components_earn_daily_login_streaks'
    info: {
        displayName: 'dailyLoginStreak'
    }
    attributes: {
        loginCount: Attribute.Integer & Attribute.Required
        lastLogin: Attribute.DateTime & Attribute.Required
    }
}

declare module '@strapi/types' {
    export module Shared {
        export interface Components {
            'earn.daily-login-streak': EarnDailyLoginStreak
        }
    }
}
