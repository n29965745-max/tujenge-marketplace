-- ════════════════════════════════════════════════════════════════════
-- TUJENGE — Storage Buckets
-- ════════════════════════════════════════════════════════════════════

-- Create public + private buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('listings', 'listings', TRUE, 20971520, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'application/pdf']),
  ('avatars', 'avatars', TRUE, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('documents', 'documents', FALSE, 20971520, ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),
  ('projects', 'projects', TRUE, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'video/mp4'])
ON CONFLICT (id) DO NOTHING;

-- ── Storage policies ────────────────────────────────────────────────

-- Listings bucket: anyone can view; owners can upload/update
CREATE POLICY "Public can view listing media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'listings');

CREATE POLICY "Authenticated users can upload listing media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'listings'
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Users can update own listing media"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'listings'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own listing media"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'listings'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Avatars: public view, owner manages
CREATE POLICY "Public can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Documents: only owner can access (titles, IDs)
CREATE POLICY "Users can view own documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload own documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Projects: public for active project media
CREATE POLICY "Public can view project media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'projects');

CREATE POLICY "Team can upload project media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'projects'
    AND auth.uid() IS NOT NULL
  );

-- ════════════════════════════════════════════════════════════════════
-- Triggers — automatic profile creation on signup
-- ════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, country_code)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'country_code', 'KE')
  )
  ON CONFLICT (id) DO NOTHING;

  -- Default role: buyer
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'buyer')
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ════════════════════════════════════════════════════════════════════
-- Helper functions
-- ════════════════════════════════════════════════════════════════════

-- Increment listing inquiry counter
CREATE OR REPLACE FUNCTION public.increment_listing_inquiry(listing_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.listings
  SET inquiry_count = inquiry_count + 1, updated_at = NOW()
  WHERE id = listing_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment listing view counter
CREATE OR REPLACE FUNCTION public.increment_listing_view(listing_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.listings
  SET view_count = view_count + 1
  WHERE id = listing_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Refresh listing rating aggregate after a review
CREATE OR REPLACE FUNCTION public.refresh_listing_rating() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.subject_type = 'listing' THEN
    UPDATE public.listings
    SET rating_avg = (
        SELECT AVG(rating)::DECIMAL(2,1)
        FROM public.reviews
        WHERE subject_type = 'listing'
          AND subject_id = NEW.subject_id
          AND deleted_at IS NULL
      ),
      rating_count = (
        SELECT COUNT(*)
        FROM public.reviews
        WHERE subject_type = 'listing'
          AND subject_id = NEW.subject_id
          AND deleted_at IS NULL
      )
    WHERE id = NEW.subject_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS review_refresh_listing_rating ON public.reviews;
CREATE TRIGGER review_refresh_listing_rating
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.refresh_listing_rating();

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.increment_listing_inquiry(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_listing_view(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_current_user_role() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Grant table-level permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
