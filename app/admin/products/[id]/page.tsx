import { createClient } from '@/utils/supabase/server'
import { ProductForm } from '@/components/admin/products/ProductForm'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()
    const { id } = await params;

    // Fetch Product
    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !product) {
        notFound()
    }

    // Fetch Categories
    const { data: categories } = await supabase.from('categories').select('id, name')

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase font-heading italic">System Overview <span className="text-zinc-600">/ Edit Entry</span></h1>

            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-sm backdrop-blur-md relative overflow-hidden">
                {/* Tech Overlay Lines */}
                <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full"></div>

                <ProductForm categories={categories || []} initialData={product} />
            </div>
        </div>
    )
}
