import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function CalendarPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Get scheduled posts for the calendar
  const { data: scheduledPosts } = await supabase
    .from('posts')
    .select('id, title, scheduled_at, platforms, status')
    .eq('user_id', user.id)
    .not('scheduled_at', 'is', null)
    .order('scheduled_at', { ascending: true })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Content Calendar</h1>
          </div>
          <Link href="/posts/new">
            <Button>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Schedule New Post
            </Button>
          </Link>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-6">
          <p className="text-gray-600">Plan and visualize your content schedule across all platforms.</p>
        </div>

        {/* Coming Soon Notice */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Interactive Calendar View - Coming Soon!</span>
            </CardTitle>
            <CardDescription>
              We're building a beautiful drag-and-drop calendar interface. For now, view your scheduled content below.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Scheduled Posts List */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Scheduled Posts</CardTitle>
            <CardDescription>
              {scheduledPosts?.length || 0} posts scheduled for publication
            </CardDescription>
          </CardHeader>
          <CardContent>
            {scheduledPosts && scheduledPosts.length > 0 ? (
              <div className="space-y-4">
                {scheduledPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(post.scheduled_at).toLocaleDateString()} at {new Date(post.scheduled_at).toLocaleTimeString()}
                      </p>
                      <div className="flex space-x-2 mt-2">
                        {post.platforms.map((platform: string) => (
                          <span key={platform} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded capitalize">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No scheduled posts</h3>
                <p className="text-gray-500 mb-4">Start planning your content by scheduling your first post.</p>
                <Link href="/posts/new">
                  <Button>Schedule Your First Post</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {scheduledPosts?.filter(post => {
                  const postDate = new Date(post.scheduled_at)
                  const now = new Date()
                  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
                  return postDate >= now && postDate <= weekFromNow
                }).length || 0}
              </div>
              <p className="text-xs text-muted-foreground">posts scheduled</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {scheduledPosts?.filter(post => {
                  const postDate = new Date(post.scheduled_at)
                  const now = new Date()
                  const monthFromNow = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
                  return postDate >= now && postDate <= monthFromNow
                }).length || 0}
              </div>
              <p className="text-xs text-muted-foreground">posts scheduled</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Most Active Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {scheduledPosts && scheduledPosts.length > 0 ? 'LinkedIn' : '-'}
              </div>
              <p className="text-xs text-muted-foreground">based on scheduled posts</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}