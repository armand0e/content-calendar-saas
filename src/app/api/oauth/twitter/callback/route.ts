import { NextRequest, NextResponse } from 'next/server'
import { 
  validateOAuthState, 
  exchangeCodeForToken, 
  getUserProfile, 
  saveSocialAccount 
} from '@/lib/oauth/utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    // Handle OAuth errors
    if (error) {
      console.error('Twitter OAuth error:', error)
      return NextResponse.redirect(
        new URL(`/social-accounts?error=${encodeURIComponent(error)}`, request.url)
      )
    }

    if (!code || !state) {
      return NextResponse.redirect(
        new URL('/social-accounts?error=missing_parameters', request.url)
      )
    }

    // Validate state parameter
    const oauthState = validateOAuthState(state)
    
    if (oauthState.platform !== 'twitter') {
      throw new Error('Invalid platform in state')
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForToken('twitter', code, state)
    
    // Get user profile
    const profile = await getUserProfile('twitter', tokens.access_token)
    
    // Save to database
    await saveSocialAccount(oauthState.userId, 'twitter', profile, tokens)

    // Redirect back to social accounts page with success
    const returnUrl = oauthState.returnUrl || '/social-accounts'
    return NextResponse.redirect(
      new URL(`${returnUrl}?success=twitter_connected`, request.url)
    )

  } catch (error) {
    console.error('Twitter OAuth callback error:', error)
    return NextResponse.redirect(
      new URL(`/social-accounts?error=${encodeURIComponent('connection_failed')}`, request.url)
    )
  }
}