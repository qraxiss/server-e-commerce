import type { Schema, Attribute } from '@strapi/strapi'

export interface EarnDailyLoginStreak extends Schema.Component {
    collectionName: 'components_earn_daily_login_streaks'
    info: {
        displayName: 'dailyLoginStreak'
        description: ''
    }
    attributes: {
        loginCount: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>
        lastLogin: Attribute.DateTime & Attribute.Required & Attribute.DefaultTo<'2024-03-19T21:00:00.000Z'>
    }
}

declare module '@strapi/types' {
    export module Shared {
        export interface Components {
            'earn.daily-login-streak': EarnDailyLoginStreak
        }
    }
}
