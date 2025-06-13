'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { duplicatePost } from './actions'
import SearchFilter from './search-filter'
import PublishButton from './publish-button'

// Simple date formatting helper
const formatTimeAgo = (date: string) => {
  const now = new Date()
  const past = new Date(date)
  const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  
  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`
  
  const diffInMonths = Math.floor(diffInDays / 30)
  return `${diffInMonths}mo ago`
}

interface Post {
  id: string
  title: string
  content: string
  platforms: string[]
  hashtags: string[]
  status: string
  scheduled_at: string | null
  created_at: string
  likes_count: number
  shares_count: number
  comments_count: number
}

interface PostsClientProps {
  initialPosts: Post[]
}

export default function PostsClient({ initialPosts }: PostsClientProps) {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    platform: 'all'
  })

  // Filter posts based on current filters
  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch = 
          post.title.toLowerCase().includes(searchLower) ||
          post.content.toLowerCase().includes(searchLower) ||
          post.hashtags.some(tag => tag.toLowerCase().includes(searchLower))
        
        if (!matchesSearch) return false
      }

      // Status filter
      if (filters.status !== 'all' && post.status !== filters.status) {
        return false
      }

      // Platform filter
      if (filters.platform !== 'all' && !post.platforms.includes(filters.platform)) {
        return false
      }

      return true
    })
  }, [initialPosts, filters])

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }))
  }

  const handleFilterStatus = (status: string) => {
    setFilters(prev => ({ ...prev, status }))
  }

  const handleFilterPlatform = (platform: string) => {
    setFilters(prev => ({ ...prev, platform }))
  }

  const handleClearFilters = () => {
    setFilters({ search: '', status: 'all', platform: 'all' })
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
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        )
      case 'tiktok':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
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
    <div className="p-6">
      {/* Search and Filter */}
      <SearchFilter
        onSearch={handleSearch}
        onFilterStatus={handleFilterStatus}
        onFilterPlatform={handleFilterPlatform}
        onClearFilters={handleClearFilters}
        activeFilters={filters}
      />

      {/* Results Summary */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredPosts.length} of {initialPosts.length} posts
        </p>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {formatTimeAgo(post.created_at)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {post.content}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Platforms */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-500">Platforms:</span>
                  <div className="flex space-x-1">
                    {post.platforms.map((platform) => (
                      <div
                        key={platform}
                        className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded text-gray-600"
                        title={platform}
                      >
                        {getPlatformIcon(platform)}
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
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>❤️ {post.likes_count}</span>
                    <span>🔄 {post.shares_count}</span>
                    <span>💬 {post.comments_count}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end space-x-2">
                  <Link href={`/posts/${post.id}/edit`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <form action={duplicatePost.bind(null, post.id)} className="inline">
                    <Button variant="outline" size="sm" type="submit">
                      Duplicate
                    </Button>
                  </form>
                  {(post.status === 'draft' || post.status === 'scheduled') && (
                    <PublishButton postId={post.id} platforms={post.platforms} status={post.status} />
                  )}
                  {post.status === 'draft' && (
                    <Link href={`/posts/${post.id}/edit`}>
                      <Button size="sm">
                        Schedule
                      </Button>
                    </Link>
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filters.search || filters.status !== 'all' || filters.platform !== 'all' 
              ? 'No posts match your filters' 
              : 'No posts yet'
            }
          </h3>
          <p className="text-gray-600 mb-4">
            {filters.search || filters.status !== 'all' || filters.platform !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Create your first post to get started with content planning.'
            }
          </p>
          {(filters.search || filters.status !== 'all' || filters.platform !== 'all') ? (
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          ) : (
            <Link href="/posts/new">
              <Button>Create Your First Post</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}