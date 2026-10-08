CREATE TABLE public.launch_list (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT launch_list_email_format CHECK (char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);
CREATE UNIQUE INDEX launch_list_email_unique ON public.launch_list (lower(email));
GRANT INSERT ON public.launch_list TO anon, authenticated;
GRANT ALL ON public.launch_list TO service_role;
ALTER TABLE public.launch_list ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can join the launch list" ON public.launch_list FOR INSERT TO anon, authenticated WITH CHECK (true);