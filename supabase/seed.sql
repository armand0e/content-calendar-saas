-- ContentFlow SaaS Database Schema for Supabase
-- This file shows how to structure your database tables for a content calendar application

-- Enable Row Level Security on all tables
-- This ensures users can only access their own data

-- 1. User Profiles (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  company_name TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Content Posts
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  platforms TEXT[] NOT NULL, -- ['linkedin', 'twitter', 'facebook', 'instagram']
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  ai_optimized BOOLEAN DEFAULT FALSE,
  hashtags TEXT[],
  media_urls TEXT[],
  engagement_score INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own posts
CREATE POLICY "Users can view own posts" ON public.posts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own posts" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON public.posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts" ON public.posts
  FOR DELETE USING (auth.uid() = user_id);

-- 3. Social Media Accounts
CREATE TABLE public.social_accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('linkedin', 'twitter', 'facebook', 'instagram', 'tiktok')),
  account_name TEXT NOT NULL,
  account_id TEXT NOT NULL,
  access_token TEXT, -- Encrypted in production
  refresh_token TEXT, -- Encrypted in production
  is_active BOOLEAN DEFAULT TRUE,
  connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_sync TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, platform, account_id)
);

-- Enable RLS
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own social accounts
CREATE POLICY "Users can view own social accounts" ON public.social_accounts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own social accounts" ON public.social_accounts
  FOR ALL USING (auth.uid() = user_id);

-- 4. Content Calendar
CREATE TABLE public.calendar_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT DEFAULT 'content' CHECK (event_type IN ('content', 'campaign', 'meeting', 'deadline')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  all_day BOOLEAN DEFAULT FALSE,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own calendar events
CREATE POLICY "Users can manage own calendar events" ON public.calendar_events
  FOR ALL USING (auth.uid() = user_id);

-- 5. Analytics Data
CREATE TABLE public.post_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL,
  impressions INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,4) DEFAULT 0,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.post_analytics ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view analytics for their own posts
CREATE POLICY "Users can view own post analytics" ON public.post_analytics
  FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM public.posts WHERE id = post_id)
  );

-- Create a unique index on post_id, platform, and the date of recording.
CREATE UNIQUE INDEX unique_post_platform_per_day ON public.post_analytics (post_id, platform, (date(recorded_at AT TIME ZONE 'UTC')));

-- 6. AI Content Suggestions
CREATE TABLE public.ai_suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  suggestion_type TEXT CHECK (suggestion_type IN ('content_idea', 'hashtag', 'timing', 'caption')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  platforms TEXT[],
  confidence_score DECIMAL(3,2) DEFAULT 0.5,
  is_used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.ai_suggestions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own AI suggestions
CREATE POLICY "Users can manage own ai suggestions" ON public.ai_suggestions
  FOR ALL USING (auth.uid() = user_id);

-- 7. Team Collaborations (for Pro/Enterprise tiers)
CREATE TABLE public.team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  member_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'editor', 'viewer')),
  permissions TEXT[] DEFAULT ARRAY['view'],
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  joined_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  UNIQUE(team_owner_id, member_id)
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Policy: Team owners can manage their team
CREATE POLICY "Team owners can manage team" ON public.team_members
  FOR ALL USING (auth.uid() = team_owner_id);

-- Policy: Team members can view their membership
CREATE POLICY "Team members can view membership" ON public.team_members
  FOR SELECT USING (auth.uid() = member_id);

-- 8. Create helpful indexes for performance
CREATE INDEX idx_posts_user_id ON public.posts(user_id);
CREATE INDEX idx_posts_scheduled_at ON public.posts(scheduled_at);
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_calendar_events_user_id ON public.calendar_events(user_id);
CREATE INDEX idx_calendar_events_date_range ON public.calendar_events(start_date, end_date);
CREATE INDEX idx_social_accounts_user_id ON public.social_accounts(user_id);
CREATE INDEX idx_post_analytics_post_id ON public.post_analytics(post_id);

-- 9. Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Real-time subscriptions setup
-- Enable real-time for collaborative features
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.calendar_events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_members;

-- 11. Example data insertion (for development)
-- This would be removed in production
/*
INSERT INTO public.profiles (id, email, full_name, company_name, subscription_tier)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'demo@contentflow.com', 'Demo User', 'ContentFlow Demo', 'pro')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.posts (user_id, title, content, platforms, status, scheduled_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Welcome to ContentFlow!', 'Excited to start creating amazing content with AI-powered scheduling. #ContentCreation #Productivity', ARRAY['linkedin', 'twitter'], 'scheduled', NOW() + INTERVAL '2 hours')
ON CONFLICT DO NOTHING;
*/ 