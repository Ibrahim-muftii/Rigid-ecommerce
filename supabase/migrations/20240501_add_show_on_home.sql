-- Add show_on_home column to categories table
ALTER TABLE public.categories 
ADD COLUMN show_on_home BOOLEAN DEFAULT false;

-- Policy update not strictly needed if "Admins can manage categories" covers updates, 
-- but good to double check policies in Supabase dashboard.
