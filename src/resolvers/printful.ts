import { syncPrintful as prinftul } from '../lib/printful'

export const syncPrintfulType = `
    type Mutation {
        syncPrintful: JSON!
    }
`
export function syncPrintful(obj, args, { context }) {
    return prinftul()
}
