'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

interface Post {
  id: string
  title: string
  content: string
  platforms: string[]
  status: string
  scheduled_at: string | null
  created_at: string
}

interface CalendarClientProps {
  posts: Post[]
}

export default function CalendarClient({ posts }: CalendarClientProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'week' | 'list'>('month')

  // Filter posts that have scheduled dates
  const scheduledPosts = useMemo(() => {
    return posts.filter(post => post.scheduled_at)
  }, [posts])

  // Generate calendar days for current month
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const currentDay = new Date(startDate)
    
    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
      const dayPosts = scheduledPosts.filter(post => {
        const postDate = new Date(post.scheduled_at!)
        return postDate.toDateString() === currentDay.toDateString()
      })
      
      days.push({
        date: new Date(currentDay),
        isCurrentMonth: currentDay.getMonth() === month,
        isToday: currentDay.toDateString() === new Date().toDateString(),
        posts: dayPosts
      })
      
      currentDay.setDate(currentDay.getDate() + 1)
    }
    
    return days
  }, [currentDate, scheduledPosts])

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

  const getPlatformColor = (platform: string) => {
    const colors = {
      linkedin: 'bg-blue-100 text-blue-800',
      twitter: 'bg-sky-100 text-sky-800',
      facebook: 'bg-blue-100 text-blue-800',
      instagram: 'bg-pink-100 text-pink-800',
      tiktok: 'bg-gray-100 text-gray-800'
    }
    return colors[platform as keyof typeof colors] || 'bg-gray-100 text-gray-800'
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

  if (view === 'list') {
    return (
      <div className="space-y-6">
        {/* View Controls */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button
              variant={view === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('month')}
            >
              Month
            </Button>
            <Button
              variant={view === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('week')}
            >
              Week
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('list')}
            >
              List
            </Button>
          </div>
        </div>

        {/* Scheduled Posts List */}
        <Card>
          <CardHeader>
            <CardTitle>All Scheduled Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {scheduledPosts.length > 0 ? (
              <div className="space-y-4">
                {scheduledPosts
                  .sort((a, b) => new Date(a.scheduled_at!).getTime() - new Date(b.scheduled_at!).getTime())
                  .map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-gray-900">{post.title}</h3>
                          <Badge className={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</p>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm text-gray-500">
                            📅 {new Date(post.scheduled_at!).toLocaleDateString()} at {new Date(post.scheduled_at!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <div className="flex space-x-1">
                            {post.platforms.map((platform) => (
                              <Badge key={platform} variant="secondary" className={getPlatformColor(platform)}>
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/posts/${post.id}/edit`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
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
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* View Controls */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button
            variant={view === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('month')}
          >
            Month
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('week')}
          >
            Week
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('list')}
          >
            List
          </Button>
        </div>
      </div>

      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </Button>
              <h2 className="text-xl font-semibold">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </Button>
            </div>
            <Button onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`min-h-[100px] p-2 border border-gray-200 ${
                  !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
                } ${day.isToday ? 'bg-blue-50 border-blue-200' : ''}`}
              >
                <div className={`text-sm font-medium mb-1 ${day.isToday ? 'text-blue-600' : ''}`}>
                  {day.date.getDate()}
                </div>
                
                {/* Posts for this day */}
                <div className="space-y-1">
                  {day.posts.slice(0, 3).map((post) => (
                    <Link key={post.id} href={`/posts/${post.id}/edit`}>
                      <div className="text-xs p-1 bg-blue-100 text-blue-800 rounded cursor-pointer hover:bg-blue-200 truncate">
                        {post.title}
                      </div>
                    </Link>
                  ))}
                  {day.posts.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{day.posts.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledPosts.length}</div>
            <p className="text-xs text-gray-500">posts scheduled</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {scheduledPosts.filter(post => {
                const postDate = new Date(post.scheduled_at!)
                const now = new Date()
                const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
                return postDate >= now && postDate <= weekFromNow
              }).length}
            </div>
            <p className="text-xs text-gray-500">posts this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {scheduledPosts.filter(post => {
                const postDate = new Date(post.scheduled_at!)
                const now = new Date()
                return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear()
              }).length}
            </div>
            <p className="text-xs text-gray-500">posts this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Used Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {scheduledPosts.length > 0 ? 'LinkedIn' : '-'}
            </div>
            <p className="text-xs text-gray-500">most scheduled</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}