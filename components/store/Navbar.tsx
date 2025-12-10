'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { usePathname } from 'next/navigation'

export function Navbar() {
    const { cartCount, toggleCart } = useCart()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-lg"></div>
                        <div className="relative w-10 h-10 bg-primary flex items-center justify-center rounded-lg text-white font-black text-xl tracking-tighter shadow-lg group-hover:scale-105 transition-transform duration-300 transform skew-x-[-10deg]">
                            RT
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tighter text-white leading-none font-heading uppercase">Rigid<span className="text-primary">Traders</span></span>
                        <span className="text-[10px] text-zinc-400 tracking-[0.2em] font-medium uppercase">Performance</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {['Home', 'Store', 'Contact'].map((item) => {
                        const href = item === 'Home' ? '/' : `/${item.toLowerCase()}`
                        const isActive = pathname === href
                        return (
                            <Link key={item} href={href} className={`relative text-sm font-bold uppercase tracking-widest transition-colors py-2 group ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
                                {item}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out shadow-[0_0_10px_var(--primary)] ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <button className="text-zinc-400 hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">
                        <Search size={22} />
                    </button>

                    <button onClick={toggleCart} className="relative group cursor-pointer">
                        <ShoppingCart size={22} className="text-zinc-400 group-hover:text-primary transition-colors" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-black text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-sm skew-x-[-10deg] shadow-lg animate-in zoom-in">
                                <span className="skew-x-10">{cartCount}</span>
                            </span>
                        )}
                    </button>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-primary hover:text-white transition-colors">
                        <Menu size={24} />
                    </button>

                    {/* Desktop User Link */}
                    <Link href="/login" className="hidden md:block w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 hover:border-primary transition-colors"></Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-100 h-[375px] flex flex-col p-0 md:hidden animate-in slide-in-from-bottom-10 fade-in duration-300 bg-black/80"
                >
                    <div style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }} className='w-full h-full flex flex-col'>
                        <div className="flex justify-end mb-16 pt-4">
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition-all active:scale-95 border border-white/5 backdrop-blur-md shadow-lg"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-4 text-center justify-center flex-1 -mt-20">
                            {['Home', 'Store', 'Contact'].map((item) => {
                                const href = item === 'Home' ? '/' : `/${item.toLowerCase()}`
                                const isActive = pathname === href

                                return (
                                    <Link
                                        key={item}
                                        href={href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`
                                            text-2xl font-black uppercase tracking-widest transition-all font-heading transform hover:scale-105
                                            ${isActive ? 'text-primary drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'text-zinc-400 hover:text-white'}
                                        `}
                                    >
                                        {item}
                                        {isActive && <div className="h-1 w-12 bg-primary mx-auto mt-3 rounded-full shadow-[0_0_10px_var(--primary)]"></div>}
                                    </Link>
                                )
                            })}

                            <div className="pt-12 flex justify-center">
                                <Link
                                    href="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                                >
                                    Member Login
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    )
}