'use client'

import { useCart } from '@/context/CartContext'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function CartSidebar() {
    const { isCartOpen, toggleCart, items, removeFromCart, cartCount } = useCart()

    if (!isCartOpen) return null

    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] animate-in fade-in duration-300"
                onClick={toggleCart}
            ></div>

            {/* Sidebar */}
            <div className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-zinc-950 border-l border-zinc-800 z-[70] shadow-2xl transform transition-transform duration-300 ease-out animate-in slide-in-from-right flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="text-primary" />
                        <h2 className="text-xl font-bold text-white uppercase tracking-wider font-heading italic">Your <span className="text-zinc-500">Cart</span></h2>
                        <span className="bg-zinc-800 text-zinc-400 text-xs font-mono px-2 py-1 rounded-sm">{cartCount} ITEMS</span>
                    </div>
                    <button onClick={toggleCart} className="text-zinc-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-zinc-500">
                            <ShoppingBag size={48} className="opacity-20" />
                            <p className="font-mono uppercase text-sm tracking-widest">System Empty</p>
                            <button onClick={toggleCart} className="text-primary text-xs font-bold uppercase hover:underline">Return to Store</button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-zinc-900/30 p-4 rounded-sm border border-zinc-900 hover:border-zinc-800 transition-colors group">
                                <div className="relative w-20 h-20 bg-zinc-900 rounded-sm overflow-hidden flex-shrink-0 border border-zinc-800">
                                    {item.image ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs">No img</div>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-zinc-200 font-bold text-sm uppercase tracking-wide line-clamp-2">{item.title}</h3>
                                        <p className="text-primary font-mono text-sm mt-1">${item.price}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-zinc-500 font-mono">QTY: {item.quantity}</span>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-zinc-600 hover:text-red-500 transition-colors p-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 space-y-4">
                        <div className="flex items-center justify-between text-zinc-400 font-mono text-sm uppercase">
                            <span>Subtotal</span>
                            <span className="text-white font-bold text-lg">${total.toFixed(2)}</span>
                        </div>
                        <Link href="/checkout" onClick={toggleCart} className="w-full bg-primary text-black font-black uppercase tracking-widest py-4 hover:bg-white transition-colors clip-path-slant shadow-[0_0_20px_rgba(250,204,21,0.2)] block text-center">
                            Proceed to Checkout
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}
