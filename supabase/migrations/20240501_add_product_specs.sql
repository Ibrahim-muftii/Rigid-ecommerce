-- Add product specification columns to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS compatible_models TEXT,
ADD COLUMN IF NOT EXISTS oem_part_number TEXT,
ADD COLUMN IF NOT EXISTS material TEXT,
ADD COLUMN IF NOT EXISTS warranty TEXT,
ADD COLUMN IF NOT EXISTS weight_dimensions TEXT;
