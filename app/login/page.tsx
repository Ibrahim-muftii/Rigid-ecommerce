'use client'

import { login, signup } from './actions'
import { useActionState } from 'react'

const initialState = {
    error: null,
}

export default function LoginPage() {
    // We'll just use a simple form for now, referencing the server action directly in `action`
    // To handle errors properly with useActionState/useFormState in Next.js 15:
    // For simplicity in this iteration, I'll wrap the form submission.

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-lg border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Admin Access</h1>
                    <p className="text-gray-500 mt-2">Sign in to manage your auto-parts store</p>
                </div>

                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="admin@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            formAction={async (formData) => {
                                const res = await login(formData);
                                if (res?.error) alert(res.error);
                            }}
                            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md hover:bg-yellow-400 transition-colors shadow-md"
                        >
                            Sign In
                        </button>

                        <button
                            formAction={async (formData) => {
                                const res = await signup(formData);
                                if (res?.error) alert(res.error);
                            }}
                            className="w-full bg-white text-gray-700 font-semibold py-3 rounded-md hover:bg-gray-100 transition-colors border border-gray-300"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
