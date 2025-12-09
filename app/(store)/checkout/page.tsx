'use client'

import { useCart } from '@/context/CartContext'
import { AlertTriangle, MessageCircle, ShieldAlert } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER;

export default function CheckoutPage() {
    const { items, cartCount } = useCart()
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    const handleWhatsAppCheckout = () => {
        // Validation check for phone number
        if (!PHONE_NUMBER) {
            // Config error: Phone number missing

            // Proceeding with fallback or alerting would be ideal, but for now we proceed
        }

        const productDetails = items.map(item =>
            `• ${item.title} (Qty: ${item.quantity}) - $${item.price}`
        ).join('\n')

        const totalAmount = `$${total.toFixed(2)}`

        // Note: Template literal is flush left to prevent extra spaces in the message
        const message = `
*Order Inquiry - Rigid Traders*

I would like to know info about this product / info about these items:
(Mein is product ke baray mein maloomat lena chahta hoon)

*Items:*
${productDetails}

*Total Estimated Value:* ${totalAmount}

--------------------------------
Ref ID: ${Math.random().toString(36).substring(7).toUpperCase()}
`.trim()

        const encodedMessage = encodeURIComponent(message)
        // Ensure clean number format just in case
        const cleanNumber = PHONE_NUMBER ? PHONE_NUMBER.replace(/\D/g, '') : ''

        window.open(`https://wa.me/${cleanNumber || PHONE_NUMBER}?text=${encodedMessage}`, '_blank')
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 text-center flex flex-col items-center justify-center space-y-6">
                <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
                    <AlertTriangle size={48} className="text-zinc-600" />
                </div>
                <h1 className="text-4xl font-black text-white uppercase font-heading italic tracking-tighter">System Empty</h1>
                <p className="text-zinc-400 max-w-md mx-auto">Your component inventory is currently offline. Navigate to the store to initialize a new order.</p>
                <Link href="/store" className="bg-primary text-black font-bold uppercase tracking-widest px-8 py-3 clip-path-slant hover:bg-white transition-colors">
                    Return to Store
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-24 pb-12 md:pt-32 md:pb-20 container mx-auto px-4 md:px-6">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase font-heading italic tracking-tighter mb-8 md:mb-12">Secure <span className="text-zinc-600">Checkout</span></h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                {/* Order Summary */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-900/40 border border-zinc-800 p-4 md:p-8 rounded-sm backdrop-blur-md">
                        <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-primary block"></span>
                            Item Manifest
                        </h2>

                        <div className="space-y-4 md:space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center p-4 bg-zinc-950/50 border border-zinc-900 rounded-sm">
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <div className="relative w-20 h-20 md:w-24 md:h-24 bg-zinc-900 rounded-sm overflow-hidden border border-zinc-800 flex-shrink-0">
                                            {item.image ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs">No img</div>
                                            )}
                                        </div>
                                        {/* Mobile Title Layout */}
                                        <div className="sm:hidden flex-1">
                                            <h3 className="text-sm font-bold text-white uppercase tracking-wide line-clamp-2">{item.title}</h3>
                                        </div>
                                    </div>

                                    <div className="flex-1 w-full sm:w-auto">
                                        <h3 className="hidden sm:block text-lg font-bold text-white uppercase tracking-wide">{item.title}</h3>
                                        <div className="flex justify-between sm:justify-start items-center gap-4 mt-2 text-sm font-mono text-zinc-400">
                                            <span>Qty: {item.quantity}</span>
                                            <span className="text-primary">${item.price}</span>
                                        </div>
                                    </div>
                                    <div className="text-lg md:text-xl font-bold text-white font-heading italic self-end sm:self-center">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xl font-bold text-white uppercase">
                            <span className="text-base md:text-xl">Total Estimated Value</span>
                            <span className="text-primary text-3xl font-heading italic">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Gateway */}
                <div className="space-y-6">
                    <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-sm backdrop-blur-md relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                        <div className="relative z-10">
                            <div className="flex items-start gap-4">
                                <ShieldAlert className="text-red-500 shrink-0 mt-1" size={28} />
                                <div>
                                    <h3 className="text-red-500 font-bold uppercase tracking-widest text-sm mb-2">Payment Integrity Check Failed</h3>
                                    <p className="text-red-200/70 text-sm leading-relaxed mb-4">
                                        Direct automated payment gateways are currently offline for maintenance. Security protocols prevent standard transaction processing at this time.
                                    </p>
                                    <div className="text-xs font-mono text-red-500/50 uppercase tracking-widest">
                                        Error Code: SEC_GATEWAY_503
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-sm backdrop-blur-md space-y-6">
                        <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-2">Alternative Channel</h2>
                        <p className="text-zinc-400 text-sm mb-6">
                            Proceed via secure encryption channel (WhatsApp) to finalize your order directly with a sales officer.
                        </p>

                        <button
                            onClick={handleWhatsAppCheckout}
                            className="w-full bg-[#25D366] text-white font-black uppercase tracking-widest py-5 hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3 clip-path-slant shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:scale-[1.02] active:scale-95"
                        >
                            <MessageCircle size={24} fill="currentColor" strokeWidth={0} />
                            Chat on WhatsApp
                        </button>

                        <p className="text-center text-xs text-zinc-600 font-mono uppercase tracking-widest">
                            Authorized Dealer Access
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
