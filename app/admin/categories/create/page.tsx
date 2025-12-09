'use client'

import { createCategory } from '../actions'
import { toast } from 'sonner'

// Simple form component
function CategoryForm() {
    const handleSubmit = async (formData: FormData) => {
        const result = await createCategory(formData)
        if (result?.error) {
            toast.error(result.error)
        }
    }

    return (
        <form action={handleSubmit} className="space-y-8 max-w-lg relative z-10">
            <div className="space-y-3">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Category Name</label>
                <input
                    name="name"
                    required
                    className="flex h-12 w-full rounded-sm border border-zinc-800 bg-zinc-950 px-4 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono text-sm"
                    placeholder="e.g. BRAKES"
                />
            </div>
            <div className="space-y-3">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Slug Identifier</label>
                <input
                    name="slug"
                    required
                    className="flex h-12 w-full rounded-sm border border-zinc-800 bg-zinc-950 px-4 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono text-sm"
                    placeholder="e.g. brakes"
                />
            </div>

            <button
                type="submit"
                className="bg-primary text-black font-black uppercase tracking-wider px-10 py-4 rounded-sm hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all flex items-center gap-2 clip-path-slant shadow-[0_0_10px_rgba(250,204,21,0.3)]"
            >
                Initialize Category
            </button>
        </form>
    )
}

export default function CreateCategoryPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase font-heading italic">System Configuration <span className="text-zinc-600">/ Add Category</span></h1>

            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-sm backdrop-blur-md relative overflow-hidden">
                {/* Tech Overlay Lines */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full"></div>

                <CategoryForm />
            </div>
        </div>
    )
}
