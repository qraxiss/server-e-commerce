import axios from 'axios'
import { config } from 'dotenv'
import { createProductWithSlug } from '../resolvers/product'

config()

export let printfulClient = axios.create({
    baseURL: 'https://api.printful.com',
    headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_TOKEN}`,
        'X-PF-Store-Id': process.env.STORE_ID
    }
})
interface Item {
    price: string
    image: string
    size: string
    color: string
}

// Function to get unique sizes and colors
const getUniqueSizesAndColors = (items: Item[]) => {
    const uniqueSizes: string[] = []
    const uniqueColors: string[] = []

    items.forEach((item) => {
        if (!uniqueSizes.includes(item.size)) {
            uniqueSizes.push(item.size)
        }

        if (!uniqueColors.includes(item.color)) {
            uniqueColors.push(item.color)
        }
    })

    return { size: uniqueSizes, color: uniqueColors }
}

export function printfulRequestWrapper({ data }) {
    return data.result
}

export async function getAllProducts() {
    let data = printfulRequestWrapper(
        await printfulClient.get('/store/products', {
            params: {
                status: 'all'
            }
        })
    )

    return data.map((item) => {
        return {
            printId: item.id,
            name: item.name,
            image: item.thumbnail_url
        }
    })
}

export async function getVariants({ printId }) {
    let data = printfulRequestWrapper(await printfulClient.get(`/store/products/${printId}`))

    data = data.sync_variants.map((variant) => {
        return {
            price: Number(variant.retail_price),
            image: variant.files[1].preview_url,
            size: variant.size,
            color: variant.color
        }
    })

    data = {
        variants: data,
        ...getUniqueSizesAndColors(data)
    }

    return data
}

export async function getAllProductsDetails() {
    let data = await getAllProducts()
    return await Promise.all(
        data.map(async (item) => {
            let variants = await getVariants(item)
            return {
                ...item,
                price: variants.variants[0].price,
                ...variants
            }
        })
    )
}

export async function syncPrintful() {
    let allData = await getAllProductsDetails()
    let createdItems = []
    console.log(allData)

    for (let index = 0; index < allData.length; index++) {
        const element = allData[index]
        console.log(element)

        let item = await createProductWithSlug(
            {},
            {
                ...element
            },
            {}
        )
        console.log(item)

        createdItems.push(item)
    }

    return createdItems
}

getAllProducts().then(console.log)
