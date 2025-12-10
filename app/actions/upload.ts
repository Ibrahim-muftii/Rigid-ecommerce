'use server'

import cloudinary from '@/lib/cloudinary'

export async function uploadImage(formData: FormData) {
    try {
        const file = formData.get('file') as File
        if (!file) {
            throw new Error('No file provided')
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        return new Promise<{ success: boolean; url: string; error?: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'ecom_uploads',
                },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error)
                        resolve({ success: false, url: '', error: error.message })
                    } else {
                        resolve({ success: true, url: result?.secure_url || '' })
                    }
                }
            ).end(buffer)
        })

    } catch (error: any) {
        console.error('Upload action error:', error)
        return { success: false, url: '', error: error.message }
    }
}
