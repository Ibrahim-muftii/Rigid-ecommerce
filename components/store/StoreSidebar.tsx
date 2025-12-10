'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Filter, X, ChevronDown } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

interface Category {
    id: string
    name: string
}

interface StoreSidebarProps {
    categories: Category[]
}

export function StoreSidebar({ categories }: StoreSidebarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const searchParams = useSearchParams()
    const currentCategory = searchParams.get('q') // Assuming q is used for category name based on current logic
    const currentSort = searchParams.get('sort')

    return (
        <>
            {/* Mobile Filter Toggle */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-zinc-900 border border-zinc-800 text-white font-bold uppercase tracking-wider text-sm mb-6 hover:border-primary transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Filter size={16} className="text-primary" />
                    <span>Filter & Sort</span>
                </div>
                <ChevronDown size={16} />
            </button>

            {/* Sidebar Container - Hidden on Mobile unless Open */}
            <aside className={`
                fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-xl transition-transform duration-300 md:translate-x-0 md:relative md:inset-auto md:bg-transparent md:backdrop-blur-none md:w-64 md:block md:border-r md:border-zinc-800 md:pr-8
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-full overflow-y-auto p-6 md:p-0">
                    <div className="flex justify-between items-center md:hidden mb-8 border-b border-zinc-800 pb-4">
                        <h2 className="text-xl font-black text-white uppercase font-heading italic">Filters</h2>
                        <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="font-bold text-white uppercase tracking-widest text-xs mb-6 border-b border-primary/50 pb-2 font-heading">Categories</h3>
                            <ul className="space-y-3 text-sm font-mono uppercase tracking-wide">
                                <li>
                                    <Link
                                        href="/store"
                                        onClick={() => setIsOpen(false)}
                                        className={`block transition-colors ${!currentCategory ? 'font-bold text-primary pl-2 border-l-2 border-primary' : 'text-white/75 hover:text-white'}`}
                                    >
                                        All Parts
                                    </Link>
                                </li>
                                {categories?.map((cat) => (
                                    <li key={cat.id}>
                                        <Link
                                            href={`/store?q=${cat.name}`}
                                            onClick={() => setIsOpen(false)}
                                            className={`block transition-colors ${currentCategory === cat.name ? 'font-bold text-primary pl-2 border-l-2 border-primary' : 'text-white/75 hover:text-white hover:translate-x-1 transform duration-200'}`}
                                        >
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-white uppercase tracking-widest text-xs mb-6 border-b border-primary/50 pb-2 font-heading">Sort by Specs</h3>
                            <div className="space-y-3 text-sm text-white/75 font-mono uppercase tracking-wide">
                                <Link href="?sort=newest" onClick={() => setIsOpen(false)} className={`block hover:text-white transition-colors ${currentSort === 'newest' ? 'text-primary' : ''}`}>Newest Arrivals</Link>
                                <Link href="?sort=price_asc" onClick={() => setIsOpen(false)} className={`block hover:text-white transition-colors ${currentSort === 'price_asc' ? 'text-primary' : ''}`}>Price: Low to High</Link>
                                <Link href="?sort=price_desc" onClick={() => setIsOpen(false)} className={`block hover:text-white transition-colors ${currentSort === 'price_desc' ? 'text-primary' : ''}`}>Price: High to Low</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
