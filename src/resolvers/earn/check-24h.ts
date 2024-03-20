export function check24h(time: Date) {
    let now = new Date()
    return now.valueOf() - time.valueOf() > 1000 * 60 * 60 * 24
}
