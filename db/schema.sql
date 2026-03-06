-- Create the api_keys table
CREATE TABLE IF NOT EXISTS public.api_keys (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) NOT NULL,
    key_hash text NOT NULL,
    key_prefix text NOT NULL,
    name text,
    created_at timestamptz DEFAULT now(),
    last_used_at timestamptz,
    is_active boolean DEFAULT true,
    CONSTRAINT api_keys_key_hash_key UNIQUE (key_hash)
);

-- RLS Policies
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own API keys"
    ON public.api_keys
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own API keys"
    ON public.api_keys
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete (revoke) their own API keys"
    ON public.api_keys
    FOR DELETE
    USING (auth.uid() = user_id);
