import { createClient } from '@/lib/supabase/server'
import { OAUTH_CONFIGS, Platform, OAuthState } from './config'
import crypto from 'crypto'

/**
 * Generate OAuth authorization URL for a platform
 */
export function generateAuthUrl(platform: Platform, userId: string, returnUrl?: string): string {
  const config = OAUTH_CONFIGS[platform]
  const state: OAuthState = {
    platform,
    userId,
    returnUrl,
    csrfToken: crypto.randomBytes(32).toString('hex')
  }
  
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scope,
    response_type: 'code',
    state: Buffer.from(JSON.stringify(state)).toString('base64'),
  })

  // Platform-specific parameters
  if (platform === 'twitter') {
    params.append('code_challenge_method', 'S256')
    params.append('code_challenge', generateCodeChallenge())
  }

  return `${config.authUrl}?${params.toString()}`
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(
  platform: Platform, 
  code: string, 
  state: string
): Promise<{
  access_token: string
  refresh_token?: string
  expires_in?: number
  token_type: string
}> {
  const config = OAUTH_CONFIGS[platform]
  
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    redirect_uri: config.redirectUri,
  })

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: body.toString(),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Token exchange failed: ${error}`)
  }

  return response.json()
}

/**
 * Get user profile from platform API
 */
export async function getUserProfile(platform: Platform, accessToken: string): Promise<{
  id: string
  username: string
  display_name: string
  profile_image_url?: string
  email?: string
}> {
  const config = OAUTH_CONFIGS[platform]
  
  const response = await fetch(config.profileUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.statusText}`)
  }

  const data = await response.json()
  
  // Platform-specific profile mapping
  switch (platform) {
    case 'linkedin':
      return {
        id: data.id,
        username: data.localizedFirstName + ' ' + data.localizedLastName,
        display_name: data.localizedFirstName + ' ' + data.localizedLastName,
        profile_image_url: data.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier,
      }
    
    case 'twitter':
      return {
        id: data.data.id,
        username: data.data.username,
        display_name: data.data.name,
        profile_image_url: data.data.profile_image_url,
      }
    
    case 'facebook':
      return {
        id: data.id,
        username: data.name,
        display_name: data.name,
        profile_image_url: `https://graph.facebook.com/${data.id}/picture?type=large`,
        email: data.email,
      }
    
    case 'instagram':
      return {
        id: data.id,
        username: data.username,
        display_name: data.username,
        profile_image_url: data.profile_picture_url,
      }
    
    default:
      throw new Error(`Unsupported platform: ${platform}`)
  }
}

/**
 * Save social account to database
 */
export async function saveSocialAccount(
  userId: string,
  platform: Platform,
  profile: any,
  tokens: any
) {
  const supabase = await createClient()
  
  const expiresAt = tokens.expires_in 
    ? new Date(Date.now() + tokens.expires_in * 1000)
    : null

  const { data, error } = await supabase
    .from('social_accounts')
    .upsert({
      user_id: userId,
      platform,
      platform_user_id: profile.id,
      username: profile.username,
      display_name: profile.display_name,
      profile_image_url: profile.profile_image_url,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      token_expires_at: expiresAt?.toISOString(),
      is_active: true,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id,platform',
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to save social account: ${error.message}`)
  }

  return data
}

/**
 * Refresh access token if needed
 */
export async function refreshTokenIfNeeded(accountId: string): Promise<string> {
  const supabase = await createClient()
  
  const { data: account, error } = await supabase
    .from('social_accounts')
    .select('*')
    .eq('id', accountId)
    .single()

  if (error || !account) {
    throw new Error('Social account not found')
  }

  // Check if token needs refresh (expires within 5 minutes)
  const expiresAt = account.token_expires_at ? new Date(account.token_expires_at) : null
  const needsRefresh = expiresAt && expiresAt.getTime() - Date.now() < 5 * 60 * 1000

  if (!needsRefresh) {
    return account.access_token
  }

  if (!account.refresh_token) {
    throw new Error('No refresh token available')
  }

  // Refresh the token
  const config = OAUTH_CONFIGS[account.platform as Platform]
  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: account.refresh_token,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to refresh token')
  }

  const tokens = await response.json()
  const newExpiresAt = tokens.expires_in 
    ? new Date(Date.now() + tokens.expires_in * 1000)
    : null

  // Update the account with new tokens
  await supabase
    .from('social_accounts')
    .update({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token || account.refresh_token,
      token_expires_at: newExpiresAt?.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', accountId)

  return tokens.access_token
}

/**
 * Generate PKCE code challenge for Twitter OAuth 2.0
 */
function generateCodeChallenge(): string {
  const codeVerifier = crypto.randomBytes(32).toString('base64url')
  return crypto.createHash('sha256').update(codeVerifier).digest('base64url')
}

/**
 * Validate OAuth state parameter
 */
export function validateOAuthState(stateParam: string): OAuthState {
  try {
    const decoded = Buffer.from(stateParam, 'base64').toString('utf-8')
    const state: OAuthState = JSON.parse(decoded)
    
    if (!state.platform || !state.userId || !state.csrfToken) {
      throw new Error('Invalid state structure')
    }
    
    return state
  } catch (error) {
    throw new Error('Invalid OAuth state parameter')
  }
}