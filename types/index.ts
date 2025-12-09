export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Product {
    id: string
    title: string
    description: string | null
    price: number
    sku: string | null
    stock: number
    images: string[]
    category_id: string | null
    featured: boolean
    created_at: string
    updated_at: string
}

export interface Category {
    id: string
    name: string
    slug: string
    image_url: string | null
    created_at: string
}

export interface Banner {
    id: string
    image_url: string
    active: boolean
    sort_order: number
    created_at: string
}
