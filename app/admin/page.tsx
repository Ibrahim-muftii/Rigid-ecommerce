import { createClient } from '@/utils/supabase/server'
import { AlertCircle, Package, Layers } from 'lucide-react'

export default async function AdminDashboard() {
    const supabase = await createClient()

    // Fetch Stats
    const { count: totalProducts } = await supabase.from('products').select('*', { count: 'exact', head: true })

    // Calculate Total Stock (Sum)
    // Supabase doesn't have a direct sum aggregate in JS client easily without RPC, 
    // but for now we can fetch "stock" column and sum it up in JS (fine for small-medium scale).
    // For large scale, RPC is better.
    const { data: stockData } = await supabase.from('products').select('stock')
    const totalQuantity = stockData?.reduce((acc, curr) => acc + (curr.stock || 0), 0) || 0

    // Fetch Low Stock Items (< 10)
    const { data: lowStockItems } = await supabase
        .from('products')
        .select('*')
        .lt('stock', 10)
        .order('stock', { ascending: true })
        .limit(10)

    const lowStockCount = lowStockItems?.length || 0

    return (
        <div className="space-y-8 relative z-10">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase font-heading italic">Mission <span className="text-primary">Control</span></h1>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">System Overview</p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-zinc-400 font-mono text-xs">LIVE</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900/50 p-6 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full border-primary opacity-50 group-hover:opacity-100 transition-opacity bg-primary"></div>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Total Products</h3>
                        <Package className="text-primary opacity-50" size={20} />
                    </div>
                    <p className="text-4xl font-black text-white font-heading italic">{totalProducts || 0}</p>
                </div>

                <div className="bg-zinc-900/50 p-6 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full border-blue-500 opacity-50 group-hover:opacity-100 transition-opacity bg-blue-500"></div>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Total Quantity</h3>
                        <Layers className="text-blue-500 opacity-50" size={20} />
                    </div>
                    <p className="text-4xl font-black text-white font-heading italic">{totalQuantity}</p>
                </div>

                <div className="bg-zinc-900/50 p-6 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full border-red-500 opacity-50 group-hover:opacity-100 transition-opacity bg-red-500"></div>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Low Stock Alerts</h3>
                        <AlertCircle className="text-red-500 opacity-50" size={20} />
                    </div>
                    <p className="text-4xl font-black text-white font-heading italic">{lowStockCount}</p>
                </div>
            </div>

            {/* Need Inquiries Table */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-red-500 -skew-x-12"></div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight font-heading italic">Need Inquiries <span className="text-zinc-600 text-sm not-italic font-mono normal-case tracking-normal ml-2">(Stock &lt; 10)</span></h2>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-zinc-900/80 border-b border-zinc-800 text-xs uppercase tracking-wider font-bold text-zinc-500">
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Product Name</th>
                                    <th className="px-6 py-4">SKU</th>
                                    <th className="px-6 py-4">Current Stock</th>
                                    <th className="px-6 py-4">Price (PKR)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {lowStockItems && lowStockItems.length > 0 ? (
                                    lowStockItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-red-500 font-bold text-[10px] uppercase tracking-widest">
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                                    </span>
                                                    CRITICAL
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-white group-hover:text-primary transition-colors">{item.title}</td>
                                            <td className="px-6 py-4 font-mono text-zinc-400 text-xs">{item.sku}</td>
                                            <td className="px-6 py-4 font-mono font-bold text-red-400">{item.stock} UNITS</td>
                                            <td className="px-6 py-4 font-mono text-zinc-300">Rs {item.price.toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Package className="text-zinc-700 mb-2" size={32} />
                                                <p className="uppercase tracking-widest text-xs font-bold">System Nominal</p>
                                                <p className="text-xs">No low stock alerts detected.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
