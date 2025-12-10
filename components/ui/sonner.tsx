"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="dark"
            className="toaster group"
            position="top-center"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-zinc-950 group-[.toaster]:text-zinc-50 group-[.toaster]:border-zinc-800 group-[.toaster]:shadow-lg group-[.toaster]:font-mono group-[.toaster]:rounded-sm",
                    description: "group-[.toaster]:text-zinc-400",
                    actionButton:
                        "group-[.toaster]:bg-primary group-[.toaster]:text-primary-foreground",
                    cancelButton:
                        "group-[.toaster]:bg-zinc-800 group-[.toaster]:text-zinc-400",
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
