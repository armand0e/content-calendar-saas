import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { publisher } from '@/lib/publishing/publisher'
import { Platform } from '@/lib/oauth/config'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { postId, platforms } = body

    if (!postId || !platforms || !Array.isArray(platforms)) {
      return NextResponse.json(
        { error: 'Missing required fields: postId, platforms' },
        { status: 400 }
      )
    }

    // Get the post
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .eq('user_id', user.id)
      .single()

    if (postError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Check if post is in a publishable state
    if (post.status === 'published') {
      return NextResponse.json(
        { error: 'Post is already published' },
        { status: 400 }
      )
    }

    // Publish the post
    const results = await publisher.publishPost({
      postId: post.id,
      content: post.content,
      platforms: platforms as Platform[],
      mediaUrls: post.media_urls || [],
    })

    return NextResponse.json({
      success: true,
      results,
      message: 'Post publishing initiated'
    })

  } catch (error) {
    console.error('Publish API error:', error)
    return NextResponse.json(
      { error: 'Failed to publish post' },
      { status: 500 }
    )
  }
}