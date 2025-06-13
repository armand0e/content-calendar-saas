// OAuth Configuration for Social Media Platforms

export const OAUTH_CONFIGS = {
  linkedin: {
    clientId: process.env.LINKEDIN_CLIENT_ID!,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXTAUTH_URL}/api/oauth/linkedin/callback`,
    scope: 'openid profile email w_member_social',
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    apiBaseUrl: 'https://api.linkedin.com/v2',
    profileUrl: 'https://api.linkedin.com/v2/people/~',
  },
  
  twitter: {
    clientId: process.env.TWITTER_CLIENT_ID!,
    clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXTAUTH_URL}/api/oauth/twitter/callback`,
    scope: 'tweet.read tweet.write users.read offline.access',
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    tokenUrl: 'https://api.twitter.com/2/oauth2/token',
    apiBaseUrl: 'https://api.twitter.com/2',
    profileUrl: 'https://api.twitter.com/2/users/me',
  },
  
  facebook: {
    clientId: process.env.FACEBOOK_APP_ID!,
    clientSecret: process.env.FACEBOOK_APP_SECRET!,
    redirectUri: `${process.env.NEXTAUTH_URL}/api/oauth/facebook/callback`,
    scope: 'pages_manage_posts,pages_read_engagement,pages_show_list,publish_to_groups',
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
    apiBaseUrl: 'https://graph.facebook.com/v18.0',
    profileUrl: 'https://graph.facebook.com/v18.0/me',
  },
  
  instagram: {
    clientId: process.env.INSTAGRAM_APP_ID!,
    clientSecret: process.env.INSTAGRAM_APP_SECRET!,
    redirectUri: `${process.env.NEXTAUTH_URL}/api/oauth/instagram/callback`,
    scope: 'user_profile,user_media',
    authUrl: 'https://api.instagram.com/oauth/authorize',
    tokenUrl: 'https://api.instagram.com/oauth/access_token',
    apiBaseUrl: 'https://graph.instagram.com',
    profileUrl: 'https://graph.instagram.com/me',
  }
} as const

export type Platform = keyof typeof OAUTH_CONFIGS

export interface OAuthState {
  platform: Platform
  userId: string
  returnUrl?: string
  csrfToken: string
}

export interface SocialAccount {
  id: string
  platform: Platform
  platform_user_id: string
  username: string
  display_name: string
  profile_image_url?: string
  access_token: string
  refresh_token?: string
  token_expires_at?: Date
  is_active: boolean
  created_at: Date
  updated_at: Date
}

// Rate limiting configuration
export const RATE_LIMITS = {
  linkedin: {
    postsPerDay: 25,
    postsPerHour: 5,
  },
  twitter: {
    postsPerDay: 300,
    postsPerHour: 50,
  },
  facebook: {
    postsPerDay: 200,
    postsPerHour: 25,
  },
  instagram: {
    postsPerDay: 25,
    postsPerHour: 5,
  }
} as const