import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
// Simple date formatting helper
const formatTimeAgo = (date: string) => {
  const now = new Date()
  const past = new Date(date)
  const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours} hours ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays} days ago`
  
  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`
  
  return past.toLocaleDateString()
}

export default async function PostsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        )
      case 'twitter':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        )
      case 'facebook':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        )
      case 'instagram':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.036.388a5.918 5.918 0 0 0-2.14 1.393A5.918 5.918 0 0 0 .503 4.921c-.184.484-.306 1.058-.34 2.005C.128 7.874.115 8.281.115 11.902s.013 4.028.048 4.976c.034.947.156 1.521.34 2.005a5.918 5.918 0 0 0 1.393 2.14 5.918 5.918 0 0 0 2.14 1.393c.484.184 1.058.306 2.005.34.948.035 1.355.048 4.976.048s4.028-.013 4.976-.048c.947-.034 1.521-.156 2.005-.34a5.918 5.918 0 0 0 2.14-1.393 5.918 5.918 0 0 0 1.393-2.14c.184-.484.306-1.058.34-2.005.035-.948.048-1.355.048-4.976s-.013-4.028-.048-4.976c-.034-.947-.156-1.521-.34-2.005a5.918 5.918 0 0 0-1.393-2.14A5.918 5.918 0 0 0 19.078.503c-.484-.184-1.058-.306-2.005-.34C16.125.013 15.718 0 12.097 0h-.08zm-.05 2.168c3.536 0 3.954.013 5.35.048.29.013.447.06.552.1.139.054.238.118.342.222.104.104.168.203.222.342.04.105.087.262.1.552.035 1.396.048 1.814.048 5.35s-.013 3.954-.048 5.35c-.013.29-.06.447-.1.552-.054.139-.118.238-.222.342-.104.104-.203.168-.342.222-.105.04-.262.087-.552.1-1.396.035-1.814.048-5.35.048s-3.954-.013-5.35-.048c-.29-.013-.447-.06-.552-.1a.926.926 0 0 1-.342-.222.926.926 0 0 1-.222-.342c-.04-.105-.087-.262-.1-.552-.035-1.396-.048-1.814-.048-5.35s.013-3.954.048-5.35c.013-.29.06-.447.1-.552.054-.139.118-.238.222-.342.104-.104.203-.168.342-.222.105-.04.262-.087.552-.1 1.396-.035 1.814-.048 5.35-.048z"/>
            <path d="M12.017 15.33a3.33 3.33 0 1 1 0-6.66 3.33 3.33 0 0 1 0 6.66zm0-8.493a5.163 5.163 0 1 0 0 10.326 5.163 5.163 0 0 0 0-10.326z"/>
            <circle cx="17.338" cy="6.735" r="1.204"/>
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          </svg>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Content Library</h1>
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
        {posts && posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <CardDescription className="mt-1">
                        Created {formatTimeAgo(post.created_at)}
                        {post.scheduled_at && (
                          <span className="ml-2">
                            • Scheduled for {new Date(post.scheduled_at).toLocaleDateString()} at {new Date(post.scheduled_at).toLocaleTimeString()}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
                  
                  {/* Platforms */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm text-gray-500">Platforms:</span>
                    <div className="flex space-x-2">
                      {post.platforms.map((platform: string) => (
                        <div key={platform} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md">
                          {getPlatformIcon(platform)}
                          <span className="text-xs capitalize">{platform}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hashtags */}
                  {post.hashtags && post.hashtags.length > 0 && (
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-sm text-gray-500">Tags:</span>
                      <div className="flex flex-wrap gap-1">
                        {post.hashtags.map((tag: string, index: number) => (
                          <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Engagement Stats */}
                  {(post.likes_count > 0 || post.shares_count > 0 || post.comments_count > 0) && (
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>❤️ {post.likes_count}</span>
                      <span>🔄 {post.shares_count}</span>
                      <span>💬 {post.comments_count}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Duplicate
                    </Button>
                    {post.status === 'draft' && (
                      <Button size="sm">
                        Schedule
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first piece of content.</p>
            <Link href="/posts/new">
              <Button>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Create Your First Post
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}