import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateAuthUrl } from '@/lib/oauth/utils'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Get return URL from query params
    const { searchParams } = new URL(request.url)
    const returnUrl = searchParams.get('returnUrl') || '/social-accounts'

    // Generate Twitter OAuth URL
    const authUrl = generateAuthUrl('twitter', user.id, returnUrl)
    
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('Twitter OAuth initiation error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate Twitter OAuth' },
      { status: 500 }
    )
  }
}