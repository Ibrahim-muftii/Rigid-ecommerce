'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createCategory(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const slug = formData.get('slug') as string
    // Image handling later if needed, for now just name/slug

    const { error } = await supabase.from('categories').insert({
        name,
        slug,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/categories')
    redirect('/admin/categories')
}

export async function deleteCategory(id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('categories').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/categories')
    return { success: true }
}
