'use server'

import { createClient } from '@/utils/supabase/server'

export async function searchProducts(query: string) {
    if (!query || query.length < 2) return { products: [] }

    const supabase = await createClient()

    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('id, title, price, images, sku')
            .ilike('title', `%${query}%`)
            .limit(5)
            .order('title')

        if (error) {
            console.error('Search error:', error)
            return { products: [] }
        }

        return { products }
    } catch (error) {
        console.error('Search exception:', error)
        return { products: [] }
    }
}
