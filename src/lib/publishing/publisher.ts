import { createClient } from '@/lib/supabase/server'
import { refreshTokenIfNeeded } from '@/lib/oauth/utils'
import { OAUTH_CONFIGS, Platform } from '@/lib/oauth/config'

export interface PublishRequest {
  postId: string
  content: string
  platforms: Platform[]
  scheduledAt?: Date
  mediaUrls?: string[]
}

export interface PublishResult {
  platform: Platform
  success: boolean
  platformPostId?: string
  error?: string
  publishedAt: Date
}

export class SocialMediaPublisher {
  
  /**
   * Publish a post to multiple platforms
   */
  async publishPost(request: PublishRequest): Promise<PublishResult[]> {
    const results: PublishResult[] = []
    
    for (const platform of request.platforms) {
      try {
        const result = await this.publishToPlatform(
          request.postId,
          platform,
          request.content,
          request.mediaUrls
        )
        results.push(result)
      } catch (error) {
        console.error(`Failed to publish to ${platform}:`, error)
        results.push({
          platform,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          publishedAt: new Date()
        })
      }
    }

    // Update post status in database
    await this.updatePostStatus(request.postId, results)
    
    return results
  }

  /**
   * Publish to a specific platform
   */
  private async publishToPlatform(
    postId: string,
    platform: Platform,
    content: string,
    mediaUrls?: string[]
  ): Promise<PublishResult> {
    // Get social account for this platform
    const account = await this.getSocialAccount(postId, platform)
    if (!account) {
      throw new Error(`No connected ${platform} account found`)
    }

    // Refresh token if needed
    const accessToken = await refreshTokenIfNeeded(account.id)

    // Publish based on platform
    switch (platform) {
      case 'linkedin':
        return await this.publishToLinkedIn(content, accessToken, mediaUrls)
      
      case 'twitter':
        return await this.publishToTwitter(content, accessToken, mediaUrls)
      
      case 'facebook':
        return await this.publishToFacebook(content, accessToken, mediaUrls)
      
      case 'instagram':
        return await this.publishToInstagram(content, accessToken, mediaUrls)
      
      default:
        throw new Error(`Publishing to ${platform} not implemented`)
    }
  }

  /**
   * Publish to LinkedIn
   */
  private async publishToLinkedIn(
    content: string,
    accessToken: string,
    mediaUrls?: string[]
  ): Promise<PublishResult> {
    const config = OAUTH_CONFIGS.linkedin

    // Get user profile first
    const profileResponse = await fetch(`${config.apiBaseUrl}/people/~`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!profileResponse.ok) {
      throw new Error('Failed to get LinkedIn profile')
    }

    const profile = await profileResponse.json()
    const authorUrn = `urn:li:person:${profile.id}`

    // Create post payload
    const postData = {
      author: authorUrn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content
          },
          shareMediaCategory: mediaUrls && mediaUrls.length > 0 ? 'IMAGE' : 'NONE',
          ...(mediaUrls && mediaUrls.length > 0 && {
            media: mediaUrls.map(url => ({
              status: 'READY',
              description: {
                text: 'Shared via ContentFlow'
              },
              media: url,
              title: {
                text: 'ContentFlow Post'
              }
            }))
          })
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    }

    const response = await fetch(`${config.apiBaseUrl}/ugcPosts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(postData),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`LinkedIn API error: ${error}`)
    }

    const result = await response.json()

    return {
      platform: 'linkedin',
      success: true,
      platformPostId: result.id,
      publishedAt: new Date()
    }
  }

  /**
   * Publish to Twitter
   */
  private async publishToTwitter(
    content: string,
    accessToken: string,
    mediaUrls?: string[]
  ): Promise<PublishResult> {
    const config = OAUTH_CONFIGS.twitter

    // Upload media first if provided
    let mediaIds: string[] = []
    if (mediaUrls && mediaUrls.length > 0) {
      // Note: This is simplified - in production you'd need to download and upload media
      // For now, we'll skip media uploads and just post text
    }

    // Create tweet
    const tweetData = {
      text: content,
      ...(mediaIds.length > 0 && { media: { media_ids: mediaIds } })
    }

    const response = await fetch(`${config.apiBaseUrl}/tweets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tweetData),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Twitter API error: ${error}`)
    }

    const result = await response.json()

    return {
      platform: 'twitter',
      success: true,
      platformPostId: result.data.id,
      publishedAt: new Date()
    }
  }

  /**
   * Publish to Facebook
   */
  private async publishToFacebook(
    content: string,
    accessToken: string,
    mediaUrls?: string[]
  ): Promise<PublishResult> {
    const config = OAUTH_CONFIGS.facebook

    // Get user's pages first
    const pagesResponse = await fetch(`${config.apiBaseUrl}/me/accounts`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!pagesResponse.ok) {
      throw new Error('Failed to get Facebook pages')
    }

    const pages = await pagesResponse.json()
    
    // Use the first page or user's feed
    const pageId = pages.data?.[0]?.id || 'me'
    const pageToken = pages.data?.[0]?.access_token || accessToken

    // Create post
    const postData = new URLSearchParams({
      message: content,
      access_token: pageToken,
    })

    const response = await fetch(`${config.apiBaseUrl}/${pageId}/feed`, {
      method: 'POST',
      body: postData,
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Facebook API error: ${error}`)
    }

    const result = await response.json()

    return {
      platform: 'facebook',
      success: true,
      platformPostId: result.id,
      publishedAt: new Date()
    }
  }

  /**
   * Publish to Instagram
   */
  private async publishToInstagram(
    content: string,
    accessToken: string,
    mediaUrls?: string[]
  ): Promise<PublishResult> {
    // Instagram requires media, so we'll skip if no media provided
    if (!mediaUrls || mediaUrls.length === 0) {
      throw new Error('Instagram posts require media')
    }

    // This is a simplified implementation
    // In production, you'd need to use Instagram Basic Display API or Instagram Graph API
    throw new Error('Instagram publishing not fully implemented - requires media upload')
  }

  /**
   * Get social account for platform
   */
  private async getSocialAccount(postId: string, platform: Platform) {
    const supabase = await createClient()
    
    // Get post to find user
    const { data: post } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', postId)
      .single()

    if (!post) {
      throw new Error('Post not found')
    }

    // Get social account
    const { data: account } = await supabase
      .from('social_accounts')
      .select('*')
      .eq('user_id', post.user_id)
      .eq('platform', platform)
      .eq('is_active', true)
      .single()

    return account
  }

  /**
   * Update post status after publishing
   */
  private async updatePostStatus(postId: string, results: PublishResult[]) {
    const supabase = await createClient()
    
    const successfulPublishes = results.filter(r => r.success)
    const failedPublishes = results.filter(r => !r.success)
    
    let status = 'published'
    if (failedPublishes.length > 0 && successfulPublishes.length === 0) {
      status = 'failed'
    } else if (failedPublishes.length > 0) {
      status = 'partially_published'
    }

    // Update post
    await supabase
      .from('posts')
      .update({
        status,
        published_at: successfulPublishes.length > 0 ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', postId)

    // Create publish logs
    for (const result of results) {
      await supabase
        .from('publish_logs')
        .insert({
          post_id: postId,
          platform: result.platform,
          status: result.success ? 'success' : 'failed',
          platform_post_id: result.platformPostId,
          error_message: result.error,
          published_at: result.publishedAt.toISOString(),
        })
    }
  }
}

// Export singleton instance
export const publisher = new SocialMediaPublisher()