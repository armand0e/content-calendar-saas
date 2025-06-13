import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AnalyticsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Get posts with engagement data
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const totalPosts = posts?.length || 0
  const totalLikes = posts?.reduce((sum, post) => sum + (post.likes_count || 0), 0) || 0
  const totalShares = posts?.reduce((sum, post) => sum + (post.shares_count || 0), 0) || 0
  const totalComments = posts?.reduce((sum, post) => sum + (post.comments_count || 0), 0) || 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          </div>
          <Link href="/posts/new">
            <Button>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Create New Post
            </Button>
          </Link>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-6">
          <p className="text-gray-600">Track your content performance across all platforms.</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                {totalPosts === 0 ? 'No published posts yet' : 'Total published content'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLikes}</div>
              <p className="text-xs text-muted-foreground">
                {totalPosts > 0 ? `${(totalLikes / totalPosts).toFixed(1)} avg per post` : 'Publish content to see metrics'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalShares}</div>
              <p className="text-xs text-muted-foreground">
                {totalPosts > 0 ? `${(totalShares / totalPosts).toFixed(1)} avg per post` : 'Publish content to see metrics'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.89 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalComments}</div>
              <p className="text-xs text-muted-foreground">
                {totalPosts > 0 ? `${(totalComments / totalPosts).toFixed(1)} avg per post` : 'Publish content to see metrics'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Notice */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Advanced Analytics - Coming Soon!</span>
            </CardTitle>
            <CardDescription>
              We're building comprehensive analytics with charts, platform comparisons, and engagement insights.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Recent Posts Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts Performance</CardTitle>
            <CardDescription>
              Performance metrics for your latest published content
            </CardDescription>
          </CardHeader>
          <CardContent>
            {posts && posts.length > 0 ? (
              <div className="space-y-4">
                {posts.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-500">
                        Published {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Recently'}
                      </p>
                      <div className="flex space-x-2 mt-2">
                        {post.platforms.map((platform: string) => (
                          <span key={platform} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded capitalize">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-6 text-sm text-gray-600">
                      <div className="text-center">
                        <div className="font-medium">❤️ {post.likes_count || 0}</div>
                        <div className="text-xs">Likes</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">🔄 {post.shares_count || 0}</div>
                        <div className="text-xs">Shares</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">💬 {post.comments_count || 0}</div>
                        <div className="text-xs">Comments</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No published posts yet</h3>
                <p className="text-gray-500 mb-4">Create and publish content to start tracking analytics.</p>
                <Link href="/posts/new">
                  <Button>Create Your First Post</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
              <CardDescription>Engagement by social media platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['LinkedIn', 'Twitter', 'Facebook', 'Instagram'].map((platform) => (
                  <div key={platform} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{platform}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      <span className="text-sm text-gray-500">0%</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">Connect social accounts to see platform-specific metrics</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Performing Content</CardTitle>
              <CardDescription>Your top posts by engagement</CardDescription>
            </CardHeader>
            <CardContent>
              {posts && posts.length > 0 ? (
                <div className="space-y-3">
                  {posts
                    .sort((a, b) => ((b.likes_count || 0) + (b.shares_count || 0) + (b.comments_count || 0)) - 
                                   ((a.likes_count || 0) + (a.shares_count || 0) + (a.comments_count || 0)))
                    .slice(0, 3)
                    .map((post, index) => (
                      <div key={post.id} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium truncate">{post.title}</p>
                          <p className="text-xs text-gray-500">
                            {(post.likes_count || 0) + (post.shares_count || 0) + (post.comments_count || 0)} total engagements
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No published posts to analyze yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}