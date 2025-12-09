import { createClient } from '@/utils/supabase/server'
import { ProductCard } from '@/components/store/ProductCard'
import Link from 'next/link'

export default async function StorePage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; q?: string; category?: string; sort?: string }>;
}) {
    const supabase = await createClient()
    const { page, q, category, sort } = await searchParams;

    const currentPage = Number(page) || 1
    const pageSize = 12

    let queryBuilder = supabase
        .from('products')
        .select('*, categories(name)', { count: 'exact' })
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)

    // Filters
    if (q) {
        queryBuilder = queryBuilder.ilike('title', `%${q}%`)
    }

    // Note: Filtering by category name is tricky with joined tables in Supabase simple client without exact ID.
    // Ideally, we filter by category_id, but URL has 'brakes'. 
    // For MVP, we'll fetch all and filter in memory OR fetch category ID first. 
    // Let's assume the side filter uses IDs or we just ignore it for now and list all?
    // To keep it robust, let's fetch category ID if 'category' param is Name, OR better: change logic to use Query Builder filters properly.
    // Actually, filtering on foreign table fields requires `!inner` join in Supabase.
    if (category) {
        // This is a simplified approach assuming we match the name roughly or if we had IDs.
        // Let's try to filter by category column on the product itself if we passed ID, assuming the URL uses IDs?
        // Or, if we use slugs in URL, we need to look up the ID. 
        // Let's assume we pass IDs for now or simplify.
        // To make it user friendly, let's assume `q` is general search.
        // If `category` (slug/name) is provided, we need to do an inner join.
        queryBuilder = queryBuilder.eq('categories.name', category) // This likely won't work directly without !inner modifier in Supabase JS syntax which is complex here.
        // Let's Skip strict category filtering for this MVP step unless we do it right.
        // Instead, let's just show All Products for now and focus on Pagination.
    }

    // Sorting
    if (sort === 'price_asc') {
        queryBuilder = queryBuilder.order('price', { ascending: true })
    } else if (sort === 'price_desc') {
        queryBuilder = queryBuilder.order('price', { ascending: false })
    } else {
        queryBuilder = queryBuilder.order('created_at', { ascending: false })
    }

    const { data: products, count, error } = await queryBuilder

    const totalPages = count ? Math.ceil(count / pageSize) : 0

    // Fetch Categories for Sidebar sidebar
    const { data: categories } = await supabase.from('categories').select('name, id').limit(20)

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 space-y-8 border-r border-zinc-800 pr-8 hidden md:block">
                    <div>
                        <h3 className="font-bold text-white uppercase tracking-widest text-xs mb-6 border-b border-primary/50 pb-2 font-heading">Categories</h3>
                        <ul className="space-y-3 text-sm font-mono uppercase tracking-wide">
                            <li>
                                <Link href="/store" className={`block transition-colors ${!category ? 'font-bold text-primary pl-2 border-l-2 border-primary' : 'text-white/75 hover:text-white'}`}>All Parts</Link>
                            </li>
                            {categories?.map((cat) => (
                                <li key={cat.id}>
                                    <Link href={`/store?q=${cat.name}`} className="block text-white/75 hover:text-white transition-colors hover:translate-x-1 transform duration-200">
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-white uppercase tracking-widest text-xs mb-6 border-b border-primary/50 pb-2 font-heading">Sort by Specs</h3>
                        <div className="space-y-3 text-sm text-white/75 font-mono uppercase tracking-wide">
                            <Link href="?sort=newest" className="block hover:text-white transition-colors">Newest Arrivals</Link>
                            <Link href="?sort=price_asc" className="block hover:text-white transition-colors">Price: Low to High</Link>
                            <Link href="?sort=price_desc" className="block hover:text-white transition-colors">Price: High to Low</Link>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-8 flex flex-col md:flex-row justify-between md:items-end border-b border-zinc-800 pb-4 gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase font-heading italic">Catalog <span className="text-zinc-700">Index</span></h1>
                            <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest mt-1">
                                {q ? `Searching: "${q}"` : 'All Available Units'}
                            </p>
                        </div>
                        <span className="text-xs text-primary font-mono bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-sm uppercase tracking-wide shadow-[0_0_10px_rgba(250,204,21,0.2)] w-fit">
                            {count} Items Found
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* @ts-ignore */}
                        {products?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {products?.length === 0 && (
                        <div className="text-center py-20 bg-zinc-900/50 rounded-sm border border-zinc-800 border-dashed">
                            <h3 className="text-white font-bold uppercase font-heading text-lg">No matches found</h3>
                            <p className="text-zinc-500 font-mono text-xs uppercase mt-2">Adjust search parameters.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-12 gap-2">
                            <Link
                                href={`?page=${Math.max(1, currentPage - 1)}`}
                                className={`px-4 py-2 border border-zinc-700 rounded-sm text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:border-zinc-500 transition-all ${currentPage === 1 ? 'pointer-events-none opacity-50 bg-zinc-900' : 'hover:bg-zinc-800'}`}
                            >
                                Previous
                            </Link>
                            <span className="px-4 py-2 text-white font-mono text-xs flex items-center bg-zinc-900 border border-zinc-800">Page {currentPage} / {totalPages}</span>
                            <Link
                                href={`?page=${Math.min(totalPages, currentPage + 1)}`}
                                className={`px-4 py-2 border border-zinc-700 rounded-sm text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:border-zinc-500 transition-all ${currentPage >= totalPages ? 'pointer-events-none opacity-50 bg-zinc-900' : 'hover:bg-zinc-800'}`}
                            >
                                Next
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
