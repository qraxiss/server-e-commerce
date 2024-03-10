import axios from 'axios'
import { config } from 'dotenv'
config()

export let printfulClient = axios.create({
    baseURL: 'https://api.printful.com',
    headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_TOKEN}`,
        'X-PF-Store-Id': process.env.STORE_ID
    }
})

export function printfulRequestWrapper({ data }) {
    return data.result
}

export async function getAllProducts() {
    return printfulRequestWrapper(
        await printfulClient.get('/store/products', {
            params: {
                status: 'all'
            }
        })
    )
}

export async function getVariants({ id }) {
    return printfulRequestWrapper(await printfulClient.get(`/store/products/${id}`))
}