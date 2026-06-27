-- ════════════════════════════════════════════════════════════════════
-- TUJENGE — Initial Schema
-- Africa's Construction & Real Estate Marketplace
-- ════════════════════════════════════════════════════════════════════

-- ── Extensions ──────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ── Enums ───────────────────────────────────────────────────────────
CREATE TYPE user_role AS ENUM (
  'buyer', 'seller', 'agent', 'architect', 'engineer',
  'quantity_surveyor', 'contractor', 'subcontractor',
  'supplier', 'equipment_owner', 'logistics', 'admin'
);

CREATE TYPE user_status AS ENUM ('pending', 'active', 'suspended', 'deleted');

CREATE TYPE verification_level AS ENUM (
  'unverified', 'phone_verified', 'id_verified', 'business_verified', 'fully_verified'
);

CREATE TYPE organization_type AS ENUM (
  'sole_proprietorship', 'partnership', 'limited_company', 'cooperative', 'other'
);

CREATE TYPE listing_type AS ENUM (
  'property', 'material_product', 'equipment',
  'professional_service', 'contractor_service', 'transport_service'
);

CREATE TYPE listing_status AS ENUM (
  'draft', 'pending_review', 'active', 'paused',
  'sold', 'rented', 'under_contract', 'expired', 'rejected', 'deleted'
);

CREATE TYPE listing_intent AS ENUM (
  'for_sale', 'for_rent', 'for_lease', 'service', 'hire'
);

CREATE TYPE project_status AS ENUM (
  'planning', 'designing', 'permitting', 'in_progress',
  'on_hold', 'completed', 'cancelled', 'disputed'
);

CREATE TYPE milestone_status AS ENUM (
  'pending', 'in_progress', 'submitted', 'approved',
  'rejected', 'paid', 'disputed'
);

CREATE TYPE escrow_status AS ENUM (
  'pending_funding', 'funded', 'partially_released',
  'released', 'disputed', 'refunded', 'cancelled'
);

CREATE TYPE order_status AS ENUM (
  'created', 'pending_payment', 'paid', 'processing',
  'in_transit', 'delivered', 'completed', 'cancelled', 'disputed', 'refunded'
);

-- ── Users ───────────────────────────────────────────────────────────
-- Extends Supabase auth.users with profile data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone VARCHAR(20) UNIQUE,
  email VARCHAR(255),
  full_name VARCHAR(120) NOT NULL,
  display_name VARCHAR(80),
  avatar_url TEXT,
  bio TEXT,
  country_code VARCHAR(2) NOT NULL DEFAULT 'KE',
  city VARCHAR(80),
  preferred_language VARCHAR(10) DEFAULT 'en',
  preferred_currency VARCHAR(3) DEFAULT 'KES',

  status user_status NOT NULL DEFAULT 'active',
  verification_level verification_level NOT NULL DEFAULT 'unverified',
  is_pro BOOLEAN NOT NULL DEFAULT FALSE,

  is_diaspora BOOLEAN NOT NULL DEFAULT FALSE,
  primary_country_code VARCHAR(2),

  email_notifications BOOLEAN NOT NULL DEFAULT TRUE,
  whatsapp_notifications BOOLEAN NOT NULL DEFAULT TRUE,
  push_notifications BOOLEAN NOT NULL DEFAULT TRUE,

  referral_code VARCHAR(20) UNIQUE,
  referred_by_user_id UUID REFERENCES public.profiles(id),

  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_profiles_phone ON public.profiles(phone) WHERE deleted_at IS NULL;
CREATE INDEX idx_profiles_country ON public.profiles(country_code) WHERE deleted_at IS NULL;
CREATE INDEX idx_profiles_diaspora ON public.profiles(is_diaspora, primary_country_code) WHERE deleted_at IS NULL AND is_diaspora = TRUE;
CREATE INDEX idx_profiles_referral ON public.profiles(referral_code) WHERE referral_code IS NOT NULL;

-- ── User Roles (multi-role per user) ───────────────────────────────
CREATE TABLE public.user_roles (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, role)
);

CREATE INDEX idx_user_roles_role ON public.user_roles(role);

-- ── Organizations (businesses) ─────────────────────────────────────
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_name VARCHAR(200) NOT NULL,
  trading_name VARCHAR(200),
  registration_number VARCHAR(100),
  tax_pin VARCHAR(50),
  organization_type organization_type NOT NULL,
  country_code VARCHAR(2) NOT NULL,
  year_founded SMALLINT,
  employee_count_band VARCHAR(20),
  logo_url TEXT,
  cover_image_url TEXT,
  description TEXT,
  website_url TEXT,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_organizations_country ON public.organizations(country_code) WHERE deleted_at IS NULL;
CREATE INDEX idx_organizations_tax_pin ON public.organizations(tax_pin) WHERE deleted_at IS NULL;

CREATE TABLE public.organization_members (
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'member',
  invited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (organization_id, user_id)
);

-- ── Listings (polymorphic — properties, materials, equipment, pros, contractors) ──
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type listing_type NOT NULL,
  status listing_status NOT NULL DEFAULT 'draft',
  intent listing_intent,

  owner_user_id UUID REFERENCES public.profiles(id),
  owner_organization_id UUID REFERENCES public.organizations(id),
  CHECK ((owner_user_id IS NOT NULL) OR (owner_organization_id IS NOT NULL)),

  title VARCHAR(200) NOT NULL,
  slug VARCHAR(220) UNIQUE,
  description TEXT,
  short_description VARCHAR(300),

  country_code VARCHAR(2) NOT NULL,
  region VARCHAR(80),
  city VARCHAR(80) NOT NULL,
  neighborhood VARCHAR(120),
  location geography(POINT, 4326),
  show_approximate_location BOOLEAN NOT NULL DEFAULT TRUE,

  price_amount BIGINT,
  price_currency VARCHAR(3) NOT NULL DEFAULT 'KES',
  price_period VARCHAR(20),
  price_negotiable BOOLEAN NOT NULL DEFAULT FALSE,

  verified_at TIMESTAMPTZ,
  verification_source VARCHAR(120),
  verification_reference VARCHAR(200),

  rating_avg DECIMAL(2,1),
  rating_count INT NOT NULL DEFAULT 0,
  view_count BIGINT NOT NULL DEFAULT 0,
  save_count INT NOT NULL DEFAULT 0,
  inquiry_count INT NOT NULL DEFAULT 0,

  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  featured_until TIMESTAMPTZ,
  is_pro_listing BOOLEAN NOT NULL DEFAULT FALSE,
  boost_level SMALLINT NOT NULL DEFAULT 0,

  attributes JSONB NOT NULL DEFAULT '{}'::jsonb,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_listings_type_status ON public.listings(type, status) WHERE deleted_at IS NULL;
CREATE INDEX idx_listings_owner_user ON public.listings(owner_user_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_listings_owner_org ON public.listings(owner_organization_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_listings_location ON public.listings USING GIST(location);
CREATE INDEX idx_listings_country_city ON public.listings(country_code, city) WHERE deleted_at IS NULL;
CREATE INDEX idx_listings_price ON public.listings(price_amount) WHERE price_amount IS NOT NULL;
CREATE INDEX idx_listings_verified ON public.listings(verified_at) WHERE verified_at IS NOT NULL;
CREATE INDEX idx_listings_featured ON public.listings(featured_until) WHERE is_featured = TRUE;
CREATE INDEX idx_listings_attributes ON public.listings USING GIN(attributes);
CREATE INDEX idx_listings_created ON public.listings(created_at DESC);

-- ── Type-specific listing detail tables ────────────────────────────

-- Property details
CREATE TABLE public.property_details (
  listing_id UUID PRIMARY KEY REFERENCES public.listings(id) ON DELETE CASCADE,
  subtype VARCHAR(40) NOT NULL,
  bedrooms SMALLINT,
  bathrooms SMALLINT,
  floors SMALLINT,
  year_built SMALLINT,
  land_size_sqm DECIMAL(10,2),
  built_up_area_sqm DECIMAL(10,2),
  furnishing VARCHAR(20),
  parking_spaces SMALLINT,
  tenure VARCHAR(20),
  tenure_remaining_years SMALLINT,
  zoning VARCHAR(40),
  amenities JSONB NOT NULL DEFAULT '[]'::jsonb,
  features JSONB NOT NULL DEFAULT '{}'::jsonb,
  nearby_landmarks JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- Material product details
CREATE TABLE public.material_product_details (
  listing_id UUID PRIMARY KEY REFERENCES public.listings(id) ON DELETE CASCADE,
  category VARCHAR(80) NOT NULL,
  brand VARCHAR(80),
  sku VARCHAR(80),
  unit_of_measure VARCHAR(20) NOT NULL,
  unit_weight_kg DECIMAL(10,3),
  min_order_quantity INT NOT NULL DEFAULT 1,
  bulk_pricing JSONB NOT NULL DEFAULT '[]'::jsonb,
  specifications JSONB NOT NULL DEFAULT '{}'::jsonb,
  in_stock BOOLEAN NOT NULL DEFAULT TRUE,
  stock_quantity INT,
  lead_time_days INT
);

CREATE INDEX idx_material_category ON public.material_product_details(category);
CREATE INDEX idx_material_brand ON public.material_product_details(brand);

-- Equipment details
CREATE TABLE public.equipment_details (
  listing_id UUID PRIMARY KEY REFERENCES public.listings(id) ON DELETE CASCADE,
  category VARCHAR(40) NOT NULL,
  make VARCHAR(80),
  model VARCHAR(80),
  year_manufactured SMALLINT,
  hours_used INT,
  operating_weight_kg INT,
  capacity VARCHAR(80),
  fuel_type VARCHAR(40),
  operator_required BOOLEAN NOT NULL DEFAULT FALSE,
  operator_daily_fee BIGINT,
  delivery_available BOOLEAN NOT NULL DEFAULT FALSE,
  delivery_fee_per_km BIGINT,
  insurance_required BOOLEAN NOT NULL DEFAULT FALSE,
  specifications JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_equipment_category ON public.equipment_details(category);

-- Professional details
CREATE TABLE public.professional_details (
  listing_id UUID PRIMARY KEY REFERENCES public.listings(id) ON DELETE CASCADE,
  professional_type VARCHAR(40) NOT NULL,
  license_number VARCHAR(80),
  license_issuing_body VARCHAR(120),
  license_verified_at TIMESTAMPTZ,
  years_experience SMALLINT,
  languages_spoken JSONB NOT NULL DEFAULT '[]'::jsonb,
  specializations JSONB NOT NULL DEFAULT '[]'::jsonb,
  rate_card JSONB NOT NULL DEFAULT '[]'::jsonb,
  availability_status VARCHAR(20) NOT NULL DEFAULT 'available',
  portfolio_count INT NOT NULL DEFAULT 0
);

CREATE INDEX idx_professional_type ON public.professional_details(professional_type);

-- Contractor details
CREATE TABLE public.contractor_details (
  listing_id UUID PRIMARY KEY REFERENCES public.listings(id) ON DELETE CASCADE,
  contractor_type VARCHAR(40) NOT NULL,
  organization_id UUID REFERENCES public.organizations(id),
  license_number VARCHAR(80),
  years_in_operation SMALLINT,
  team_size_band VARCHAR(20),
  project_value_min BIGINT,
  project_value_max BIGINT,
  bonded BOOLEAN NOT NULL DEFAULT FALSE,
  insured BOOLEAN NOT NULL DEFAULT FALSE,
  service_areas JSONB NOT NULL DEFAULT '[]'::jsonb,
  completed_projects_count INT NOT NULL DEFAULT 0,
  specialties JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- ── Media (photos, videos, documents) ───────────────────────────────
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_type VARCHAR(40) NOT NULL,
  owner_id UUID NOT NULL,
  type VARCHAR(20) NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  original_filename VARCHAR(255),
  file_size_bytes BIGINT,
  mime_type VARCHAR(100),
  width INT,
  height INT,
  duration_seconds INT,
  caption TEXT,
  alt_text TEXT,
  position SMALLINT NOT NULL DEFAULT 0,
  is_cover BOOLEAN NOT NULL DEFAULT FALSE,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  uploaded_by_user_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_media_owner ON public.media(owner_type, owner_id);
CREATE INDEX idx_media_cover ON public.media(owner_type, owner_id, is_cover) WHERE is_cover = TRUE;

-- ── Verifications (KYC, documents) ─────────────────────────────────
CREATE TABLE public.verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  organization_id UUID REFERENCES public.organizations(id),
  listing_id UUID REFERENCES public.listings(id),
  verification_type VARCHAR(40) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  document_media_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  reviewed_at TIMESTAMPTZ,
  reviewed_by_user_id UUID REFERENCES public.profiles(id),
  reviewer_notes TEXT,
  external_reference VARCHAR(200),
  expires_at TIMESTAMPTZ,
  approved_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK ((user_id IS NOT NULL) OR (organization_id IS NOT NULL) OR (listing_id IS NOT NULL))
);

CREATE INDEX idx_verifications_user ON public.verifications(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_verifications_status ON public.verifications(status) WHERE status IN ('pending', 'in_review');

-- ── Projects ────────────────────────────────────────────────────────
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID NOT NULL REFERENCES public.profiles(id),
  title VARCHAR(200) NOT NULL,
  project_type VARCHAR(40) NOT NULL,
  status project_status NOT NULL DEFAULT 'planning',

  country_code VARCHAR(2) NOT NULL,
  city VARCHAR(80) NOT NULL,
  neighborhood VARCHAR(120),
  location geography(POINT, 4326),

  land_size_sqm DECIMAL(10,2),
  built_up_area_sqm DECIMAL(10,2),
  floors SMALLINT,
  bedrooms SMALLINT,
  bathrooms SMALLINT,
  finish_level VARCHAR(20),

  planned_start_date DATE,
  planned_completion_date DATE,
  actual_start_date DATE,
  actual_completion_date DATE,

  budget_min BIGINT,
  budget_max BIGINT,
  budget_currency VARCHAR(3) NOT NULL DEFAULT 'KES',
  spent_amount BIGINT NOT NULL DEFAULT 0,
  contingency_pct SMALLINT NOT NULL DEFAULT 10,

  wizard_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  visibility VARCHAR(20) NOT NULL DEFAULT 'private',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_projects_owner ON public.projects(owner_user_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_status ON public.projects(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_location ON public.projects USING GIST(location);

-- ── Milestones (project phases) ─────────────────────────────────────
CREATE TABLE public.milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  sequence SMALLINT NOT NULL,
  status milestone_status NOT NULL DEFAULT 'pending',
  planned_start_date DATE,
  planned_end_date DATE,
  actual_start_date DATE,
  actual_end_date DATE,
  budget_amount BIGINT,
  actual_amount BIGINT,
  currency VARCHAR(3) NOT NULL DEFAULT 'KES',
  escrow_hold_id UUID,
  completion_evidence_media_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  approved_by_user_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_milestones_project ON public.milestones(project_id, sequence);
CREATE INDEX idx_milestones_status ON public.milestones(status);

-- ── Project Team ───────────────────────────────────────────────────
CREATE TABLE public.project_team (
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  organization_id UUID REFERENCES public.organizations(id),
  role VARCHAR(40) NOT NULL,
  contracted_at TIMESTAMPTZ,
  contracted_amount BIGINT,
  currency VARCHAR(3),
  ended_at TIMESTAMPTZ,
  rating_by_owner SMALLINT,
  review TEXT,
  PRIMARY KEY (project_id, user_id, role)
);

-- ── Orders ──────────────────────────────────────────────────────────
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(40) UNIQUE NOT NULL,
  order_type VARCHAR(30) NOT NULL,
  status order_status NOT NULL DEFAULT 'created',

  buyer_user_id UUID NOT NULL REFERENCES public.profiles(id),
  seller_user_id UUID REFERENCES public.profiles(id),
  seller_organization_id UUID REFERENCES public.organizations(id),

  listing_id UUID REFERENCES public.listings(id),
  project_id UUID REFERENCES public.projects(id),
  milestone_id UUID REFERENCES public.milestones(id),

  items JSONB NOT NULL DEFAULT '[]'::jsonb,

  subtotal_amount BIGINT NOT NULL,
  delivery_fee BIGINT NOT NULL DEFAULT 0,
  service_fee BIGINT NOT NULL DEFAULT 0,
  tax_amount BIGINT NOT NULL DEFAULT 0,
  discount_amount BIGINT NOT NULL DEFAULT 0,
  total_amount BIGINT NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'KES',

  delivery_address JSONB,
  delivery_location geography(POINT, 4326),
  delivery_date DATE,
  delivery_notes TEXT,

  escrow_hold_id UUID,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ
);

CREATE INDEX idx_orders_buyer ON public.orders(buyer_user_id, status);
CREATE INDEX idx_orders_seller_user ON public.orders(seller_user_id, status) WHERE seller_user_id IS NOT NULL;
CREATE INDEX idx_orders_listing ON public.orders(listing_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created ON public.orders(created_at DESC);

-- ── Escrow Holds ────────────────────────────────────────────────────
CREATE TABLE public.escrow_holds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference VARCHAR(60) UNIQUE NOT NULL,
  status escrow_status NOT NULL DEFAULT 'pending_funding',
  amount BIGINT NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'KES',
  released_amount BIGINT NOT NULL DEFAULT 0,
  refunded_amount BIGINT NOT NULL DEFAULT 0,
  payer_user_id UUID NOT NULL REFERENCES public.profiles(id),
  payee_user_id UUID REFERENCES public.profiles(id),
  payee_organization_id UUID REFERENCES public.organizations(id),
  provider VARCHAR(40) NOT NULL,
  provider_reference VARCHAR(200),
  provider_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  release_conditions JSONB NOT NULL DEFAULT '{}'::jsonb,
  funded_at TIMESTAMPTZ,
  released_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_escrow_payer ON public.escrow_holds(payer_user_id, status);
CREATE INDEX idx_escrow_status ON public.escrow_holds(status);

-- ── Conversations & Messages ────────────────────────────────────────
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  context_type VARCHAR(40),
  context_id UUID,
  subject VARCHAR(200),
  last_message_at TIMESTAMPTZ,
  last_message_preview TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_conversations_context ON public.conversations(context_type, context_id);
CREATE INDEX idx_conversations_last_msg ON public.conversations(last_message_at DESC);

CREATE TABLE public.conversation_participants (
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_read_at TIMESTAMPTZ,
  unread_count INT NOT NULL DEFAULT 0,
  muted BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_user_id UUID REFERENCES public.profiles(id),
  channel VARCHAR(20) NOT NULL DEFAULT 'in_app',
  body TEXT NOT NULL,
  media_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  reply_to_message_id UUID REFERENCES public.messages(id),
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  edited_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_messages_conversation ON public.messages(conversation_id, created_at DESC);
CREATE INDEX idx_messages_sender ON public.messages(sender_user_id, created_at DESC);

-- ── Reviews ─────────────────────────────────────────────────────────
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_type VARCHAR(40) NOT NULL,
  subject_id UUID NOT NULL,
  reviewer_user_id UUID NOT NULL REFERENCES public.profiles(id),
  reviewed_user_id UUID REFERENCES public.profiles(id),
  reviewed_organization_id UUID REFERENCES public.organizations(id),
  order_id UUID REFERENCES public.orders(id),
  project_id UUID REFERENCES public.projects(id),
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(200),
  body TEXT NOT NULL,
  sub_ratings JSONB NOT NULL DEFAULT '{}'::jsonb,
  media_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
  response TEXT,
  response_at TIMESTAMPTZ,
  helpful_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  UNIQUE (subject_type, subject_id, reviewer_user_id, order_id)
);

CREATE INDEX idx_reviews_subject ON public.reviews(subject_type, subject_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_reviews_reviewer ON public.reviews(reviewer_user_id) WHERE deleted_at IS NULL;

-- ── Saved Listings (bookmarks) ──────────────────────────────────────
CREATE TABLE public.saved_listings (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, listing_id)
);

-- ── Notifications ───────────────────────────────────────────────────
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  type VARCHAR(40) NOT NULL,
  title VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  link_url TEXT,
  context_type VARCHAR(40),
  context_id UUID,
  channel VARCHAR(20) NOT NULL DEFAULT 'in_app',
  read_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id, created_at DESC) WHERE read_at IS NULL;

-- ── Price Indices (market data) ─────────────────────────────────────
CREATE TABLE public.price_indices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(80) NOT NULL,
  brand VARCHAR(80),
  unit VARCHAR(20) NOT NULL,
  country_code VARCHAR(2) NOT NULL,
  city VARCHAR(80),
  price_amount BIGINT NOT NULL,
  currency VARCHAR(3) NOT NULL,
  source VARCHAR(80),
  contributor_user_id UUID REFERENCES public.profiles(id),
  observed_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_price_indices_category_loc ON public.price_indices(category, country_code, city, observed_at DESC);

-- ── Audit Log ───────────────────────────────────────────────────────
CREATE TABLE public.audit_log (
  id BIGSERIAL PRIMARY KEY,
  actor_user_id UUID REFERENCES public.profiles(id),
  actor_type VARCHAR(40) NOT NULL,
  action VARCHAR(80) NOT NULL,
  subject_type VARCHAR(40),
  subject_id UUID,
  before_data JSONB,
  after_data JSONB,
  ip_address INET,
  user_agent TEXT,
  request_id VARCHAR(80),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_actor ON public.audit_log(actor_user_id, created_at DESC);
CREATE INDEX idx_audit_subject ON public.audit_log(subject_type, subject_id, created_at DESC);

-- ── updated_at trigger function ─────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables that have updated_at
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN
    SELECT unnest(ARRAY[
      'profiles', 'organizations', 'listings',
      'verifications', 'projects', 'milestones',
      'orders', 'escrow_holds', 'reviews'
    ])
  LOOP
    EXECUTE format('CREATE TRIGGER set_updated_at_%I BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION set_updated_at()', t, t);
  END LOOP;
END $$;
