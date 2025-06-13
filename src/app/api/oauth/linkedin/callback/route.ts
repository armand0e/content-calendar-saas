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
      console.error('LinkedIn OAuth error:', error)
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
    
    if (oauthState.platform !== 'linkedin') {
      throw new Error('Invalid platform in state')
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForToken('linkedin', code, state)
    
    // Get user profile
    const profile = await getUserProfile('linkedin', tokens.access_token)
    
    // Save to database
    await saveSocialAccount(oauthState.userId, 'linkedin', profile, tokens)

    // Redirect back to social accounts page with success
    const returnUrl = oauthState.returnUrl || '/social-accounts'
    return NextResponse.redirect(
      new URL(`${returnUrl}?success=linkedin_connected`, request.url)
    )

  } catch (error) {
    console.error('LinkedIn OAuth callback error:', error)
    return NextResponse.redirect(
      new URL(`/social-accounts?error=${encodeURIComponent('connection_failed')}`, request.url)
    )
  }
}