# Auto-Parts E-Commerce Store

A premium, full-stack E-Commerce application built with Next.js 15, Tailwind CSS, and Supabase.

## Features

### Admin Dashboard (`/admin`)

-   **Secure Authentication**: Powered by Supabase Auth.
-   **Product Management**: Create, edit, and delete products with image uploads.
-   **Category Management**: Organize products into categories.
-   **Banner Management**: Control the homepage hero slider dynamically.

### Storefront

-   **Premium Design**: Mobile-first, auto-parts themed UI.
-   **Dynamic Home Page**: Hero carousel and featured products.
-   **Store Page**: Filterable product grid with pagination and sorting.
-   **Product Details**: Image gallery, stock status, and related products.

## Setup Instructions

### 1. Environment Setup

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Setup

1.  Go to your Supabase Project Dashboard.
2.  Open the **SQL Editor**.
3.  Run the contents of `supabase/schema.sql`.
4.  Go to **Storage** and create two **Public** buckets:
    -   `products`
    -   `banners`

### 3. Installation & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the store. Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the dashboard.
