-- TenantMatch Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('tenant', 'landlord', 'agent', 'superadmin')) DEFAULT 'tenant',
  tier TEXT CHECK (tier IN ('free', 'growth', 'pro', 'vip')) DEFAULT 'free',
  id_number TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PROPERTIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  suburb TEXT,
  postal_code TEXT,
  property_type TEXT CHECK (property_type IN ('apartment', 'house', 'flat', 'townhouse', 'room', 'studio', 'other')),
  status TEXT CHECK (status IN ('active', 'inactive', 'maintenance')) DEFAULT 'active',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- UNITS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  unit_number TEXT NOT NULL,
  bedrooms INTEGER DEFAULT 1,
  bathrooms REAL DEFAULT 1,
  sqm INTEGER,
  rent_amount DECIMAL(12, 2) NOT NULL,
  deposit_amount DECIMAL(12, 2),
  status TEXT CHECK (status IN ('available', 'occupied', 'maintenance', 'reserved')) DEFAULT 'available',
  description TEXT,
  features JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- APPLICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  unit_id UUID REFERENCES units(id) ON DELETE SET NULL,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'withdrawn')) DEFAULT 'pending',
  notes TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TENANT DOCUMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS tenant_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  file_name TEXT,
  file_path TEXT,
  file_url TEXT,
  status TEXT CHECK (status IN ('pending', 'verified', 'rejected')) DEFAULT 'pending',
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES profiles(id),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MAINTENANCE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS maintenance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  unit_id UUID REFERENCES units(id) ON DELETE SET NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  issue_type TEXT CHECK (issue_type IN ('plumbing', 'electrical', 'hvac', 'appliance', 'structural', 'pest', 'other')),
  urgency TEXT CHECK (urgency IN ('low', 'medium', 'high', 'emergency')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')) DEFAULT 'open',
  images JSONB DEFAULT '[]',
  assigned_to TEXT,
  cost DECIMAL(10, 2),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PAYMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  unit_id UUID REFERENCES units(id) ON DELETE SET NULL,
  amount DECIMAL(12, 2) NOT NULL,
  payment_type TEXT CHECK (payment_type IN ('rent', 'deposit', 'utilities', 'maintenance', 'other')),
  status TEXT CHECK (status IN ('pending', 'paid', 'failed', 'refunded')) DEFAULT 'pending',
  due_date DATE NOT NULL,
  paid_at TIMESTAMPTZ,
  payment_method TEXT,
  reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  data JSONB DEFAULT '{}',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LEASES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS leases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  unit_id UUID REFERENCES units(id) ON DELETE SET NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  monthly_rent DECIMAL(12, 2) NOT NULL,
  deposit_amount DECIMAL(12, 2),
  status TEXT CHECK (status IN ('pending', 'active', 'expired', 'terminated')) DEFAULT 'pending',
  document_url TEXT,
  signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STORAGE BUCKETS
-- ============================================
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('tenant-documents', 'tenant-documents', true),
  ('property-images', 'property-images', true),
  ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public access for tenant-documents" ON storage.objects
FOR SELECT USING (bucket_id = 'tenant-documents');

CREATE POLICY "Public access for property-images" ON storage.objects
FOR SELECT USING (bucket_id = 'property-images');

CREATE POLICY "Public access for avatars" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Profiles policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Superadmins can view all profiles" ON profiles
FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'superadmin')
);

-- Properties policies
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view properties" ON properties
FOR SELECT USING (status = 'active');

CREATE POLICY "Owners can manage their properties" ON properties
FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Superadmins can manage all properties" ON properties
FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'superadmin')
);

-- Units policies
ALTER TABLE units ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available units" ON units
FOR SELECT USING (status = 'available');

CREATE POLICY "Property owners can manage units" ON units
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM properties p 
    WHERE p.id = units.property_id AND p.owner_id = auth.uid()
  )
);

-- Applications policies
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenants can view own applications" ON applications
FOR SELECT USING (auth.uid() = tenant_id);

CREATE POLICY "Property owners can view applications" ON applications
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM properties p 
    WHERE p.id = applications.property_id AND p.owner_id = auth.uid()
  )
);

CREATE POLICY "Tenants can create applications" ON applications
FOR INSERT WITH CHECK (auth.uid() = tenant_id);

CREATE POLICY "Property owners can update applications" ON applications
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM properties p 
    WHERE p.id = applications.property_id AND p.owner_id = auth.uid()
  )
);

-- Documents policies
ALTER TABLE tenant_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenants can manage own documents" ON tenant_documents
FOR ALL USING (auth.uid() = tenant_id);

-- Maintenance policies
ALTER TABLE maintenance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenants can view own maintenance" ON maintenance
FOR SELECT USING (auth.uid() = tenant_id);

CREATE POLICY "Property owners can view maintenance" ON maintenance
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM properties p 
    WHERE p.id = maintenance.property_id AND p.owner_id = auth.uid()
  )
);

CREATE POLICY "Tenants can create maintenance" ON maintenance
FOR INSERT WITH CHECK (auth.uid() = tenant_id);

-- Payments policies
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenants can view own payments" ON payments
FOR SELECT USING (auth.uid() = tenant_id);

CREATE POLICY "Property owners can view payments" ON payments
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM properties p 
    WHERE p.id = (SELECT property_id FROM units u WHERE u.id = payments.unit_id)
    AND p.owner_id = auth.uid()
  )
);

-- Notifications policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON notifications
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'tenant')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_units_updated_at BEFORE UPDATE ON units
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tenant_documents_updated_at BEFORE UPDATE ON tenant_documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_updated_at BEFORE UPDATE ON maintenance
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leases_updated_at BEFORE UPDATE ON leases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================

-- Insert sample data for demo purposes (run separately if needed)
-- INSERT INTO properties (owner_id, name, address, city, property_type)
-- VALUES 
--   ('demo-user-id', 'Sandton Luxury Apartments', '123 Main Road', 'Sandton', 'apartment'),
--   ('demo-user-id', 'Rosebank Gardens', '45 Park Lane', 'Rosebank', 'flat');

-- INSERT INTO units (property_id, unit_number, bedrooms, bathrooms, rent_amount, status)
-- VALUES 
--   ('property-1', '1A', 2, 1, 12000, 'occupied'),
--   ('property-1', '1B', 2, 1, 12500, 'occupied'),
--   ('property-1', '2A', 3, 2, 15000, 'available'),
--   ('property-2', '1', 1, 1, 8500, 'available');

-- ============================================
-- INDEXES (for performance)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_properties_owner ON properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_units_property ON units(property_id);
CREATE INDEX IF NOT EXISTS idx_units_status ON units(status);
CREATE INDEX IF NOT EXISTS idx_applications_tenant ON applications(tenant_id);
CREATE INDEX IF NOT EXISTS idx_applications_property ON applications(property_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_tenant_documents_tenant ON tenant_documents(tenant_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_tenant ON maintenance(tenant_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_property ON maintenance(property_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_status ON maintenance(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(user_id, read);

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE profiles IS 'User profiles with role and tier information';
COMMENT ON TABLE properties IS 'Rental properties managed by landlords/agents';
COMMENT ON TABLE units IS 'Individual units within properties';
COMMENT ON TABLE applications IS 'Tenant applications for properties/units';
COMMENT ON TABLE tenant_documents IS 'Uploaded documents (ID, payslips, etc.)';
COMMENT ON TABLE maintenance IS 'Maintenance requests from tenants';
COMMENT ON TABLE payments IS 'Payment records for rent and other charges';
COMMENT ON TABLE notifications IS 'User notifications for events';
COMMENT ON TABLE leases IS 'Lease agreements between tenants and landlords';

-- ============================================
-- COMPLETE!
-- ============================================

SELECT 'TenantMatch database schema created successfully!' AS status;
