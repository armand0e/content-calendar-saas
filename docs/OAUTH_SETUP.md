# OAuth Setup Guide

This guide will help you set up OAuth integrations for LinkedIn and Twitter to enable real social media publishing.

## Environment Variables

Add these variables to your `.env.local` file:

```bash
# OAuth Configuration
NEXTAUTH_URL=http://localhost:3000

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# Twitter OAuth 2.0
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret

# Facebook (Coming Soon)
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# Instagram (Coming Soon)
INSTAGRAM_APP_ID=your_instagram_app_id
INSTAGRAM_APP_SECRET=your_instagram_app_secret
```

## LinkedIn OAuth Setup

### 1. Create LinkedIn App

1. Go to [LinkedIn Developer Portal](https://developer.linkedin.com/)
2. Click "Create App"
3. Fill in the required information:
   - App name: "ContentFlow" (or your app name)
   - LinkedIn Page: Select your company page
   - App logo: Upload your logo
   - Legal agreement: Accept terms

### 2. Configure OAuth Settings

1. In your app dashboard, go to "Auth" tab
2. Add redirect URLs:
   - `http://localhost:3000/api/oauth/linkedin/callback` (development)
   - `https://yourdomain.com/api/oauth/linkedin/callback` (production)

### 3. Request Permissions

1. Go to "Products" tab
2. Request access to:
   - **Sign In with LinkedIn using OpenID Connect** (for profile access)
   - **Share on LinkedIn** (for posting content)
   - **Marketing Developer Platform** (for advanced features)

### 4. Get Credentials

1. Go to "Auth" tab
2. Copy your **Client ID** and **Client Secret**
3. Add them to your `.env.local` file

## Twitter OAuth Setup

### 1. Create Twitter App

1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Apply for a developer account if you don't have one
3. Create a new project and app
4. Fill in the required information

### 2. Configure OAuth 2.0

1. In your app dashboard, go to "Settings" → "User authentication settings"
2. Enable OAuth 2.0
3. Set app permissions to "Read and Write"
4. Add callback URLs:
   - `http://localhost:3000/api/oauth/twitter/callback` (development)
   - `https://yourdomain.com/api/oauth/twitter/callback` (production)
5. Add website URL: `http://localhost:3000` or your domain

### 3. Get Credentials

1. Go to "Keys and tokens" tab
2. Copy your **Client ID** and **Client Secret** from the OAuth 2.0 section
3. Add them to your `.env.local` file

## Testing OAuth Integration

### 1. Start Development Server

```bash
npm run dev
```

### 2. Test LinkedIn Connection

1. Navigate to `/social-accounts`
2. Click "Connect LinkedIn"
3. Complete OAuth flow
4. Verify account appears as connected

### 3. Test Twitter Connection

1. Navigate to `/social-accounts`
2. Click "Connect Twitter"
3. Complete OAuth flow
4. Verify account appears as connected

### 4. Test Publishing

1. Create a new post
2. Select connected platforms
3. Click "Publish Now"
4. Check that post appears on your social media accounts

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI"**
   - Ensure callback URLs match exactly in your app settings
   - Check for trailing slashes or typos

2. **"Invalid client credentials"**
   - Verify Client ID and Secret are correct
   - Ensure no extra spaces in environment variables

3. **"Insufficient permissions"**
   - Check that required permissions are approved
   - Some permissions may require app review

4. **"Token expired"**
   - The app handles token refresh automatically
   - Check database for valid refresh tokens

### Debug Mode

Enable debug logging by adding to `.env.local`:

```bash
DEBUG=oauth:*
NODE_ENV=development
```

## Production Deployment

### 1. Update Environment Variables

Replace localhost URLs with your production domain:

```bash
NEXTAUTH_URL=https://yourdomain.com
```

### 2. Update OAuth App Settings

1. Add production callback URLs to your LinkedIn and Twitter apps
2. Update website URLs to your production domain

### 3. Security Considerations

- Use HTTPS in production
- Rotate client secrets regularly
- Monitor API usage and rate limits
- Implement proper error handling and logging

## Rate Limits

### LinkedIn
- 25 posts per day per user
- 5 posts per hour per user

### Twitter
- 300 posts per day per user
- 50 posts per hour per user

The app automatically handles rate limiting and will queue posts if limits are exceeded.

## Support

If you encounter issues:

1. Check the [LinkedIn API Documentation](https://docs.microsoft.com/en-us/linkedin/)
2. Check the [Twitter API Documentation](https://developer.twitter.com/en/docs)
3. Review the app logs for detailed error messages
4. Contact support with specific error messages and steps to reproduce