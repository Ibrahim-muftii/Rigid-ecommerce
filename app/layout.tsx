import type { Metadata } from "next";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";
import { CartSidebar } from "@/components/store/CartSidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoParts Store Admin",
  description: "Premium Auto-Parts E-Commerce Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-background text-foreground font-sans`}
      >
        <CartProvider>
          {children}
          <CartSidebar />
          <Toaster richColors position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}
