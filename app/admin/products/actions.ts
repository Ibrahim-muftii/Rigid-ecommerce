'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteProduct(id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/products')
    return { success: true }
}

// Placeholder for Create/Update - will implement with the form
export async function createProduct(formData: FormData) {
    const supabase = await createClient()
    // Extraction logic here
    // ...

    // revalidatePath('/admin/products')
    // redirect('/admin/products')
}
