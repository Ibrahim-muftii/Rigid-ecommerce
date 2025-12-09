'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export function AddToCartButton({ product }: { product: any }) {
    const { addToCart } = useCart()

    return (
        <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-primary text-black font-black text-xl py-6 hover:bg-white hover:scale-[1.02] transition-all flex items-center justify-center gap-3 uppercase tracking-widest clip-path-slant shadow-[0_0_30px_rgba(250,204,21,0.2)] active:scale-95"
        >
            <ShoppingCart size={24} strokeWidth={2.5} /> Initiate Order
        </button>
    )
}
