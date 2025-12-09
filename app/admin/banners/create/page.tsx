'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { createBanner } from '../actions'
import { toast } from 'sonner'
import { Loader2, Upload } from 'lucide-react'

// Simple form component
function BannerForm() {
    const supabase = createClient()
    const [imageUrl, setImageUrl] = useState('')
    const [uploading, setUploading] = useState(false)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)
            if (!e.target.files || e.target.files.length === 0) return

            const file = e.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `banner-${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('banners')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('banners')
                .getPublicUrl(filePath)

            setImageUrl(publicUrl)
            toast.success('Banner uploaded')
        } catch (error: any) {
            toast.error('Error uploading banner: ' + error.message)
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (formData: FormData) => {
        const result = await createBanner(formData)
        if (result?.error) {
            toast.error(result.error)
        } else {
            // Success matches redirect in action, or we can toast here if no redirect
            // But createBanner redirects on success, so this might not run unless we remove redirect?
            // Actually createBanner redirects, so we won't get here on success usually.
            // But if it returns success: true (without redirect path?), we handle it.
            // In our action it redirects.
        }
    }

    return (
        <form action={handleSubmit} className="space-y-8 max-w-lg relative z-10">
            <div className="space-y-4">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Banner Visual Asset</label>
                <div className="relative aspect-video bg-zinc-900 border border-dashed border-zinc-700 rounded-sm flex flex-col items-center justify-center hover:bg-zinc-800/50 hover:border-primary transition-all group cursor-pointer">
                    {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={imageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                        <div className="text-center p-6">
                            {uploading ? <Loader2 className="animate-spin text-primary mx-auto" /> : <Upload className="text-zinc-600 group-hover:text-primary mx-auto mb-2 transition-colors" />}
                            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold group-hover:text-white transition-colors">Click to upload signal</span>
                        </div>
                    )}
                    <input type="file" required={!imageUrl} accept="image/*" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <input type="hidden" name="image_url" value={imageUrl} />
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Sequence Priority (Sort Order)</label>
                <input
                    type="number"
                    name="sort_order"
                    defaultValue={0}
                    className="flex h-12 w-full rounded-sm border border-zinc-800 bg-zinc-950 px-4 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono text-sm"
                />
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                <input
                    type="checkbox"
                    name="active"
                    defaultChecked
                    className="h-5 w-5 rounded border-zinc-700 bg-zinc-900 text-primary focus:ring-primary focus:ring-offset-zinc-900"
                />
                <label className="text-sm font-bold text-white uppercase tracking-wider">System Active Status</label>
            </div>

            <button
                type="submit"
                disabled={!imageUrl || uploading}
                className="bg-primary text-black font-black uppercase tracking-wider px-10 py-4 rounded-sm hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all flex items-center gap-2 clip-path-slant disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(250,204,21,0.3)]"
            >
                Deploy Banner Unit
            </button>
        </form >
    )
}

export default function CreateBannerPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase font-heading italic">System Configuration <span className="text-zinc-600">/ Add Banner</span></h1>

            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-sm backdrop-blur-md relative overflow-hidden">
                {/* Tech Overlay Lines */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full"></div>

                <BannerForm />
            </div>
        </div>
    )
}
