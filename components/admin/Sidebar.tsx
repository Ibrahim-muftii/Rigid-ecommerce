'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, Tag, Image as ImageIcon, Settings, LogOut, Menu, X } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Tag },
    { name: 'Banners', href: '/admin/banners', icon: ImageIcon },
]

export function AdminSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
        router.push('/login')
    }

    const SidebarContent = () => (
        <>
            <div className="p-6 border-b border-zinc-900 bg-zinc-900/50 backdrop-blur-sm">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-primary flex items-center justify-center rounded text-white font-black text-lg transform skew-x-[-10deg] shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                        RT
                    </div>
                    <span className="text-lg font-black tracking-tighter text-white uppercase font-heading italic">Rigid<span className="text-primary">Traders</span></span>
                </Link>
                <div className="mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">System Online</span>
                </div>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 border-l-2 ${isActive
                                ? 'bg-primary/10 text-primary border-primary font-bold shadow-[inset_0_0_10px_rgba(250,204,21,0.1)]'
                                : 'border-transparent text-zinc-500 hover:bg-zinc-900 hover:text-white hover:border-zinc-700'
                                }`}
                        >
                            <item.icon size={18} />
                            <span className="font-heading uppercase tracking-wider text-sm">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-zinc-900 bg-zinc-900/30">
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 w-full px-4 py-3 text-zinc-500 hover:bg-red-500/10 hover:text-red-500 rounded-sm transition-colors border border-transparent hover:border-red-500/20 group"
                >
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono uppercase text-xs tracking-wider font-bold">Sign Out</span>
                </button>
            </div>
        </>
    )

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-zinc-950 border-b border-zinc-900 sticky top-0 z-40">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary flex items-center justify-center rounded text-white font-black text-xs transform skew-x-[-10deg]">RT</div>
                    <span className="text-sm font-black text-white uppercase font-heading italic">Rigid<span className="text-primary">Traders</span></span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(true)} className="text-zinc-400 hover:text-white">
                    <Menu size={24} />
                </button>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-zinc-950 text-zinc-400 flex-col h-full fixed left-0 top-0 overflow-y-auto border-r border-zinc-900 z-50">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>

                    {/* Sidebar Drawer */}
                    <aside className="relative flex-col bg-zinc-950 w-64 h-full border-r border-zinc-800 animate-in slide-in-from-left duration-200">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        <SidebarContent />
                    </aside>
                </div>
            )}
        </>
    )
}
