# 🚀 Supabase Setup Guide for ContentFlow

This guide will walk you through setting up Supabase as the backend for your ContentFlow SaaS application.

## 📋 Prerequisites

- A Supabase account (free tier available)
- Node.js and npm installed
- The ContentFlow project downloaded

## 🛠 Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `contentflow-saas` (or your preferred name)
   - **Database Password**: Use a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be ready (2-3 minutes)

## 🔑 Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **anon/public key** (safe to use in frontend)
   - **service_role key** (keep secret, server-side only)

## ⚙️ Step 3: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Optional: For OAuth redirects
NEXT_PUBLIC_SITE_URL=http://0.0.0.0:3000
```

**⚠️ Important:** 
- Never commit `.env.local` to version control
- Replace `your-project` and keys with your actual values
- In production, use your actual domain for `NEXT_PUBLIC_SITE_URL`

## 🗄️ Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `database-schema.sql` from this project
3. Paste it into a new query and click **RUN**
4. This will create all necessary tables with Row Level Security (RLS)

## 🔐 Step 5: Configure Authentication

### Enable Email Authentication
1. Go to **Authentication** > **Settings**
2. Ensure **Enable email confirmations** is checked
3. Set **Site URL** to `http://0.0.0.0:3000` (development) or your production URL

### Enable OAuth Providers (Optional)

#### Google OAuth:
1. Go to **Authentication** > **Providers**
2. Click on **Google**
3. Enable the provider
4. Add your Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`

#### GitHub OAuth:
1. Go to **Authentication** > **Providers**
2. Click on **GitHub**
3. Enable the provider
4. Add your GitHub OAuth app credentials:
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create new OAuth app
   - Set Authorization callback URL: `https://your-project.supabase.co/auth/v1/callback`

## 🏃‍♂️ Step 6: Run the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://0.0.0.0:3000` and test the authentication!

## 🎯 Key Features Enabled

### ✅ User Authentication
- **Email/Password signup and login**
- **OAuth with Google and GitHub**
- **Protected routes with middleware**
- **Automatic user profile creation**

### ✅ Database Structure
- **User profiles** with subscription tiers
- **Content posts** with scheduling
- **Social media account connections**
- **Calendar events** for content planning
- **Analytics tracking** per post/platform
- **AI suggestions** for content optimization
- **Team collaboration** features

### ✅ Security Features
- **Row Level Security (RLS)** - Users only see their own data
- **Server-side authentication** validation
- **Secure cookie-based sessions**
- **API route protection**

## 📊 Database Tables Overview

| Table | Purpose |
|-------|---------|
| `profiles` | Extended user information |
| `posts` | Content posts with scheduling |
| `social_accounts` | Connected social media accounts |
| `calendar_events` | Content calendar planning |
| `post_analytics` | Performance metrics |
| `ai_suggestions` | AI-generated content ideas |
| `team_members` | Collaboration features |

## 🔧 Next Steps for Full SaaS

### 1. **Content Creation**
```sql
-- Example: Creating a new post
INSERT INTO posts (user_id, title, content, platforms, scheduled_at)
VALUES (auth.uid(), 'My First Post', 'Hello world!', ARRAY['linkedin'], NOW() + INTERVAL '1 hour');
```

### 2. **Real-time Features**
```javascript
// Subscribe to real-time updates
const channel = supabase
  .channel('posts')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => console.log('Change received!', payload)
  )
  .subscribe()
```

### 3. **Analytics Dashboard**
```sql
-- Get engagement metrics
SELECT 
  platform,
  AVG(engagement_rate) as avg_engagement,
  SUM(likes + shares + comments) as total_interactions
FROM post_analytics 
WHERE post_id IN (
  SELECT id FROM posts WHERE user_id = auth.uid()
)
GROUP BY platform;
```

### 4. **File Storage**
- Use Supabase Storage for media uploads
- Configure bucket policies for user file access
- Integrate with the posts table for media URLs

### 5. **Edge Functions**
- AI content generation
- Social media API integrations
- Scheduled post publishing
- Analytics data collection

## 🔍 Testing the Setup

1. **Sign up** for a new account at `/login`
2. **Check dashboard** - you should see your email displayed
3. **Verify database** - check the `profiles` table in Supabase
4. **Test logout** - session should be cleared properly

## 🚨 Troubleshooting

### Common Issues:

**"Invalid API key"**
- Double-check your `.env.local` file
- Ensure no extra spaces in the keys
- Restart your development server

**"Row Level Security violation"**
- Run the database schema script completely
- Check that RLS policies are created
- Verify user is authenticated

**OAuth redirect errors**
- Check callback URLs match exactly
- Ensure HTTPS in production
- Verify OAuth app settings

## 💡 Production Deployment

### Environment Variables for Vercel/Netlify:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Database Considerations:
- Enable **database backups** in Supabase
- Monitor **usage metrics** for scaling
- Consider **connection pooling** for high traffic
- Set up **custom domain** for auth callbacks

---

🎉 **Congratulations!** You now have a fully functional SaaS backend with:
- User authentication & authorization
- Secure database with multi-tenancy
- Real-time capabilities
- Scalable architecture
- Professional security practices

Ready to build the next big content marketing platform! 🚀 