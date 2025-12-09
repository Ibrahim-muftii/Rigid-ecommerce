import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Check, ShoppingCart, Truck, ShieldCheck } from 'lucide-react'
import { ProductCard } from '@/components/store/ProductCard'
import { AddToCartButton } from '@/components/store/AddToCartButton'

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()
    const { id } = await params;

    // Fetch Product
    const { data: product, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('id', id)
        .single()

    if (error || !product) {
        notFound()
    }

    // Fetch Related Products
    const { data: relatedProducts } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('category_id', product.category_id)
        .neq('id', product.id)
        .limit(4)

    return (
        <div className="min-h-screen bg-black text-white pb-24">
            <div className="container mx-auto px-4 md:px-6 pt-6 md:pt-12">
                {/* Breadcrumbs */}
                <nav className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6 md:mb-8 flex items-center gap-2 flex-wrap">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="text-zinc-700">/</span>
                    <Link href="/store" className="hover:text-primary transition-colors">Store</Link>
                    <span className="text-zinc-700">/</span>
                    <span className="text-white font-bold truncate max-w-[200px] md:max-w-none">{product.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-12 md:mb-24">
                    {/* Images */}
                    <div className="space-y-4 md:space-y-6">
                        <div className="aspect-square bg-zinc-900 border border-zinc-800 relative overflow-hidden group rounded-sm">
                            {/* Tech Overlay */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className="bg-primary text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest clip-path-slant">
                                    System View
                                </span>
                            </div>

                            {product.images?.[0] ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={product.images[0]} alt={product.title} className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-700 font-mono text-sm uppercase tracking-widest">Image Signal Lost</div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-2 md:gap-4">
                            {product.images?.map((img: string, idx: number) => (
                                <div key={idx} className={`aspect-square rounded-sm overflow-hidden border cursor-pointer relative bg-zinc-900 ${idx === 0 ? 'border-primary ring-1 ring-primary/50' : 'border-zinc-800 hover:border-zinc-600'}`}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img} alt="" className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info Panel */}
                    <div className="space-y-6 md:space-y-8 relative">
                        <div className="border-b border-zinc-800 pb-6 md:pb-8">
                            {/* @ts-ignore */}
                            <span className="text-secondary-foreground/60 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] border border-zinc-800 px-3 py-1 rounded-full mb-4 inline-block">{product.categories?.name || 'Component'}</span>
                            <h1 className="text-2xl md:text-5xl font-black text-white mt-2 md:mt-4 font-heading italic uppercase tracking-tighter leading-tight">{product.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 mt-4">
                                <span className="text-[10px] md:text-xs text-zinc-500 font-mono uppercase tracking-widest bg-zinc-900 px-2 py-1">SKU: {product.sku}</span>
                                {product.stock > 0 ? (
                                    <span className="flex items-center gap-2 text-[10px] md:text-xs text-primary font-bold uppercase tracking-widest">
                                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                        System Online
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2 text-[10px] md:text-xs text-red-500 font-bold uppercase tracking-widest">
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        Offline
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="text-4xl md:text-6xl font-black text-white font-heading italic tracking-tighter flex items-start gap-1">
                            <span className="text-xl md:text-2xl text-zinc-500 mt-2 font-sans not-italic">$</span>
                            {product.price}
                        </div>

                        <p className="text-zinc-300 leading-relaxed text-lg font-light tracking-wide max-w-xl border-l-2 border-zinc-800 pl-6">
                            {product.description || 'No technical specifications available for this unit.'}
                        </p>

                        <div className="pt-8 space-y-6">
                            <div className="flex items-center gap-4">
                                <AddToCartButton product={product} />
                                {/* Wishlist or other action could go here */}
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-xs font-mono uppercase tracking-wider text-zinc-500 pt-6 border-t border-zinc-800">
                                <div className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-sm border border-zinc-800/50">
                                    <ShieldCheck size={18} className="text-primary" />
                                    <span>Genuine Quality</span>
                                </div>
                                <div className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-sm border border-zinc-800/50">
                                    <Check size={18} className="text-primary" />
                                    <span>In House manufactured</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Information / Specs */}
                <div className="mb-24 pt-12 border-t border-zinc-900 max-w-4xl">
                    <h2 className="text-xl font-bold text-white uppercase tracking-widest font-heading italic mb-8 flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary"></span>
                        Technical Specifications
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 bg-zinc-950/50 p-8 border border-zinc-900 rounded-sm">
                        {product.compatible_models && (
                            <div className="space-y-2">
                                <h3 className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    Fitment / Compatibility
                                </h3>
                                <p className="text-sm text-zinc-300 font-mono leading-relaxed pl-4 border-l border-zinc-800">{product.compatible_models}</p>
                            </div>
                        )}

                        {product.oem_part_number && (
                            <div className="space-y-2">
                                <h3 className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    OEM Part Number
                                </h3>
                                <p className="text-sm text-zinc-300 font-mono leading-relaxed pl-4 border-l border-zinc-800">{product.oem_part_number}</p>
                            </div>
                        )}

                        {product.material && (
                            <div className="space-y-2">
                                <h3 className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    Material & Build
                                </h3>
                                <p className="text-sm text-zinc-300 font-mono leading-relaxed pl-4 border-l border-zinc-800">{product.material}</p>
                            </div>
                        )}

                        {product.weight_dimensions && (
                            <div className="space-y-2">
                                <h3 className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    Weight & Dimensions
                                </h3>
                                <p className="text-sm text-zinc-300 font-mono leading-relaxed pl-4 border-l border-zinc-800">{product.weight_dimensions}</p>
                            </div>
                        )}

                        {product.warranty && (
                            <div className="space-y-2">
                                <h3 className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    Warranty Protection
                                </h3>
                                <p className="text-sm text-zinc-300 font-mono leading-relaxed pl-4 border-l border-zinc-800">{product.warranty}</p>
                            </div>
                        )}

                        {/* Fallback if empty */}
                        {!product.compatible_models && !product.oem_part_number && !product.material && !product.weight_dimensions && !product.warranty && (
                            <div className="col-span-full text-zinc-600 font-mono text-sm italic">
                                No detailed specifications available for this unit.
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <div className="border-t border-zinc-800 pt-24">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-black text-white uppercase font-heading italic tracking-tighter">Compatible <span className="text-zinc-600">Units</span></h2>
                            <Link href="/store" className="text-xs font-bold text-primary uppercase tracking-widest hover:text-white transition-colors">View All</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* @ts-ignore */}
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
