-- ════════════════════════════════════════════════════════════════════
-- TUJENGE — Row Level Security Policies
-- ════════════════════════════════════════════════════════════════════

-- ── Enable RLS on all tables ────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_product_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contractor_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escrow_holds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_indices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- ── Helper: get_current_user_role() ─────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_current_user_role() RETURNS user_role AS $$
  SELECT role FROM public.user_roles
  WHERE user_id = auth.uid()
  ORDER BY granted_at ASC
  LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin() RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ════════════════════════════════════════════════════════════════════
-- PROFILES
-- ════════════════════════════════════════════════════════════════════

-- Public profiles are viewable by everyone (limited fields)
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (deleted_at IS NULL);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile (on signup)
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Admins can delete
CREATE POLICY "Admins can delete profiles"
  ON public.profiles FOR DELETE
  USING (public.is_admin());

-- ════════════════════════════════════════════════════════════════════
-- USER ROLES
-- ════════════════════════════════════════════════════════════════════

CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users can add own roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (user_id = auth.uid() OR public.is_admin());

-- ════════════════════════════════════════════════════════════════════
-- ORGANIZATIONS
-- ════════════════════════════════════════════════════════════════════

CREATE POLICY "Organizations are publicly viewable"
  ON public.organizations FOR SELECT
  USING (deleted_at IS NULL);

CREATE POLICY "Members can update their organization"
  ON public.organizations FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = organizations.id AND user_id = auth.uid()
    ) OR public.is_admin()
  );

CREATE POLICY "Authenticated users can create organizations"
  ON public.organizations FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ════════════════════════════════════════════════════════════════════
-- LISTINGS
-- ════════════════════════════════════════════════════════════════════

-- Active listings are publicly viewable
CREATE POLICY "Active listings are publicly viewable"
  ON public.listings FOR SELECT
  USING (status = 'active' AND deleted_at IS NULL);

-- Owners can see their own listings (any status)
CREATE POLICY "Owners can view own listings"
  ON public.listings FOR SELECT
  USING (owner_user_id = auth.uid() OR public.is_admin());

-- Owners can create listings
CREATE POLICY "Authenticated users can create listings"
  ON public.listings FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Owners can update their own listings
CREATE POLICY "Owners can update own listings"
  ON public.listings FOR UPDATE
  USING (owner_user_id = auth.uid() OR public.is_admin());

-- Owners can delete (soft) their own listings
CREATE POLICY "Owners can delete own listings"
  ON public.listings FOR DELETE
  USING (owner_user_id = auth.uid() OR public.is_admin());

-- Same policies apply to all listing detail tables (inherit through FK)
CREATE POLICY "Public can view property details for active listings"
  ON public.property_details FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE id = property_details.listing_id AND status = 'active' AND deleted_at IS NULL
    )
  );

CREATE POLICY "Owners can manage property details"
  ON public.property_details FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE id = property_details.listing_id AND owner_user_id = auth.uid()
    ) OR public.is_admin()
  );

CREATE POLICY "Public can view material details for active listings"
  ON public.material_product_details FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE id = material_product_details.listing_id AND status = 'active' AND deleted_at IS NULL
    )
  );

CREATE POLICY "Owners can manage material details"
  ON public.material_product_details FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE id = material_product_details.listing_id AND owner_user_id = auth.uid()
    ) OR public.is_admin()
  );

CREATE POLICY "Public can view equipment details for active listings"
  ON public.equipment_details FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE id = equipment_details.listing_id AND status = 'active' AND deleted_at IS NULL
    )
  );

CREATE POLICY "Owners can manage equipment details"
  ON public.equipment_details FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE id = equipment_details.listing_id AND owner_user_id = auth.uid()
    ) OR public.is_admin()
  );

CREATE POLICY "Public can view professional details for active listings"
  ON public.professional_details FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE id = professional_details.listing_id AND status = 'active' AND deleted_at IS NULL
    )
  );

CREATE POLICY "Owners can manage professional details"
  ON public.professional_details FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE id = professional_details.listing_id AND owner_user_id = auth.uid()
    ) OR public.is_admin()
  );

CREATE POLICY "Public can view contractor details for active listings"
  ON public.contractor_details FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE id = contractor_details.listing_id AND status = 'active' AND deleted_at IS NULL
    )
  );

CREATE POLICY "Owners can manage contractor details"
  ON public.contractor_details FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE id = contractor_details.listing_id AND owner_user_id = auth.uid()
    ) OR public.is_admin()
  );

-- ════════════════════════════════════════════════════════════════════
-- MEDIA
-- ════════════════════════════════════════════════════════════════════

-- Public media on active listings
CREATE POLICY "Public can view media on active listings"
  ON public.media FOR SELECT
  USING (
    (owner_type = 'listing' AND EXISTS (
      SELECT 1 FROM public.listings WHERE id = media.owner_id AND status = 'active' AND deleted_at IS NULL
    ))
    OR uploaded_by_user_id = auth.uid()
    OR public.is_admin()
  );

CREATE POLICY "Users can upload media"
  ON public.media FOR INSERT
  WITH CHECK (uploaded_by_user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users can update own media"
  ON public.media FOR UPDATE
  USING (uploaded_by_user_id = auth.uid() OR public.is_admin());

-- ════════════════════════════════════════════════════════════════════
-- PROJECTS
-- ════════════════════════════════════════════════════════════════════

-- Owners can see and manage their own projects
CREATE POLICY "Users can view own projects"
  ON public.projects FOR SELECT
  USING (
    owner_user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.project_team
      WHERE project_id = projects.id AND user_id = auth.uid()
    )
    OR public.is_admin()
  );

CREATE POLICY "Users can create projects"
  ON public.projects FOR INSERT
  WITH CHECK (owner_user_id = auth.uid());

CREATE POLICY "Owners can update projects"
  ON public.projects FOR UPDATE
  USING (owner_user_id = auth.uid() OR public.is_admin());

-- Project milestones
CREATE POLICY "Team can view milestones"
  ON public.milestones FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects p
      LEFT JOIN public.project_team pt ON pt.project_id = p.id
      WHERE p.id = milestones.project_id
        AND (p.owner_user_id = auth.uid() OR pt.user_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "Owners can manage milestones"
  ON public.milestones FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.projects WHERE id = milestones.project_id AND owner_user_id = auth.uid()
    ) OR public.is_admin()
  );

-- Project team
CREATE POLICY "Team can view team"
  ON public.project_team FOR SELECT
  USING (
    user_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.projects WHERE id = project_team.project_id AND owner_user_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Owners can manage team"
  ON public.project_team FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_team.project_id AND owner_user_id = auth.uid())
    OR public.is_admin()
  );

-- ════════════════════════════════════════════════════════════════════
-- ORDERS & ESCROW
-- ════════════════════════════════════════════════════════════════════

CREATE POLICY "Order parties can view orders"
  ON public.orders FOR SELECT
  USING (
    buyer_user_id = auth.uid()
    OR seller_user_id = auth.uid()
    OR public.is_admin()
  );

CREATE POLICY "Buyers can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (buyer_user_id = auth.uid());

CREATE POLICY "Order parties can update orders"
  ON public.orders FOR UPDATE
  USING (
    buyer_user_id = auth.uid()
    OR seller_user_id = auth.uid()
    OR public.is_admin()
  );

CREATE POLICY "Escrow parties can view"
  ON public.escrow_holds FOR SELECT
  USING (
    payer_user_id = auth.uid()
    OR payee_user_id = auth.uid()
    OR public.is_admin()
  );

CREATE POLICY "Payers can create escrow"
  ON public.escrow_holds FOR INSERT
  WITH CHECK (payer_user_id = auth.uid());

-- ════════════════════════════════════════════════════════════════════
-- MESSAGING
-- ════════════════════════════════════════════════════════════════════

CREATE POLICY "Participants can view conversations"
  ON public.conversations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.conversation_participants
      WHERE conversation_id = conversations.id AND user_id = auth.uid()
    ) OR public.is_admin()
  );

CREATE POLICY "Participants can view messages"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.conversation_participants
      WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
    ) OR public.is_admin()
  );

CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (sender_user_id = auth.uid());

-- ════════════════════════════════════════════════════════════════════
-- REVIEWS, SAVED, NOTIFICATIONS, PRICE INDICES
-- ════════════════════════════════════════════════════════════════════

-- Reviews are publicly viewable
CREATE POLICY "Reviews are publicly viewable"
  ON public.reviews FOR SELECT
  USING (deleted_at IS NULL);

CREATE POLICY "Users can write reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (reviewer_user_id = auth.uid());

CREATE POLICY "Reviewers can update own reviews"
  ON public.reviews FOR UPDATE
  USING (reviewer_user_id = auth.uid() AND created_at > NOW() - INTERVAL '7 days');

-- Saved listings
CREATE POLICY "Users manage own saved listings"
  ON public.saved_listings FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Notifications
CREATE POLICY "Users view own notifications"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users update own notifications"
  ON public.notifications FOR UPDATE
  USING (user_id = auth.uid());

-- Price indices: public read
CREATE POLICY "Price indices are public"
  ON public.price_indices FOR SELECT
  USING (TRUE);

CREATE POLICY "Authenticated users can contribute prices"
  ON public.price_indices FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Audit log: admin only
CREATE POLICY "Admins can view audit log"
  ON public.audit_log FOR SELECT
  USING (public.is_admin());
