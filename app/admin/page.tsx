export default function AdminDashboard() {
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
                {[
                    { label: 'Total Products', value: '--', color: 'border-primary' },
                    { label: 'Low Stock Items', value: '--', color: 'border-red-500' },
                    { label: 'Active Orders', value: '0', color: 'border-blue-500' }
                ].map((stat, i) => (
                    <div key={i} className={`bg-zinc-900/50 p-6 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition-colors`}>
                        <div className={`absolute top-0 left-0 w-1 h-full ${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                        <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</h3>
                        <p className="text-4xl font-black text-white font-heading italic">{stat.value}</p>

                        <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                            {/* Abstract decorative icon */}
                            <div className="w-16 h-16 border-2 border-white rounded-full border-dashed"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-zinc-900/30 p-12 border border-zinc-800 border-dashed text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                <div className="w-16 h-16 bg-zinc-800 mx-auto rounded-full flex items-center justify-center mb-6 border border-zinc-700 group-hover:border-primary transition-colors cursor-pointer shadow-lg">
                    <div className="w-3 h-3 bg-primary rounded-sm animate-ping"></div>
                </div>

                <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-heading">Welcome to Mission Control</h2>
                <p className="text-zinc-500 mt-2 font-mono text-sm max-w-md mx-auto">Select a module from the sidebar to manage inventory, categories, or system banners.</p>
            </div>
        </div>
    )
}
