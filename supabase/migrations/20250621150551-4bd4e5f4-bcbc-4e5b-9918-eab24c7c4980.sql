
-- Create NOC requests table
CREATE TABLE public.noc_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  applicant_name TEXT NOT NULL,
  organization_name TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  property_type TEXT NOT NULL,
  property_address TEXT NOT NULL,
  building_area TEXT NOT NULL,
  noc_type TEXT NOT NULL,
  project_description TEXT NOT NULL,
  expected_completion_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  rejection_reason TEXT,
  approved_by UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.noc_requests ENABLE ROW LEVEL SECURITY;

-- NOC requests policies
CREATE POLICY "Users can view their own NOC requests" ON public.noc_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create NOC requests" ON public.noc_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all NOC requests" ON public.noc_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update NOC requests" ON public.noc_requests
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Update incident_reports table to better match the form
ALTER TABLE public.incident_reports 
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS incident_type TEXT,
ADD COLUMN IF NOT EXISTS severity TEXT;

-- Update incident_reports to use the new fields properly
UPDATE public.incident_reports 
SET incident_type = fire_type 
WHERE incident_type IS NULL;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_noc_requests_updated_at 
  BEFORE UPDATE ON public.noc_requests 
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_incident_reports_updated_at 
  BEFORE UPDATE ON public.incident_reports 
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
