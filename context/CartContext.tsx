'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { toast } from 'sonner'

export interface CartItem {
    id: string
    title: string
    price: number
    image?: string
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addToCart: (product: any) => void
    removeFromCart: (id: string) => void
    clearCart: () => void
    cartCount: number
    isCartOpen: boolean
    toggleCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    // Load from local storage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                // Silent fail
            }
        }
        setIsLoaded(true)
    }, [])

    // Save to local storage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('cart', JSON.stringify(items))
        }
    }, [items, isLoaded])

    const addToCart = (product: any) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                toast.success('Updated quantity in cart')
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            toast.success('Added to cart')
            return [...prev, {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.images?.[0] || '',
                quantity: 1
            }]
        })
    }

    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
        toast.info('Removed from cart')
    }

    const clearCart = () => {
        setItems([])
        localStorage.removeItem('cart')
    }

    const toggleCart = () => setIsCartOpen(!isCartOpen)

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartCount, isCartOpen, toggleCart }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
