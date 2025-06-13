'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { updatePost, deletePost } from '../../actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const platforms = [
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'twitter', label: 'Twitter / X' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
]

interface Post {
  id: string
  title: string
  content: string
  platforms: string[]
  hashtags: string[]
  scheduled_at: string | null
  status: string
}

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) {
          console.error('Error fetching post:', error)
          router.push('/posts')
          return
        }

        setPost(data)
      } catch (error) {
        console.error('Error:', error)
        router.push('/posts')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.id, router, supabase])

  const handleSubmit = async (formData: FormData) => {
    setIsSaving(true)
    try {
      await updatePost(params.id, formData)
      router.push('/posts')
    } catch (error) {
      console.error('Error updating post:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deletePost(params.id)
      router.push('/posts')
    } catch (error) {
      console.error('Error deleting post:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
          <p className="text-gray-600 mb-4">The post you're looking for doesn't exist.</p>
          <Link href="/posts">
            <Button>Back to Posts</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Format date for input
  const formatDateForInput = (dateString: string | null) => {
    if (!dateString) return { date: '', time: '' }
    const date = new Date(dateString)
    const dateStr = date.toISOString().split('T')[0]
    const timeStr = date.toTimeString().slice(0, 5)
    return { date: dateStr, time: timeStr }
  }

  const { date: scheduledDate, time: scheduledTime } = formatDateForInput(post.scheduled_at)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/posts" className="text-sm text-gray-600 hover:text-gray-900 mb-4 block">
            ← Back to Posts
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
              <p className="text-gray-600">Update your content and scheduling.</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Delete Post
              </Button>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <form action={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  required
                  defaultValue={post.title}
                  placeholder="e.g., My Awesome New Product Launch"
                />
              </div>

              <div>
                <Label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  required
                  rows={8}
                  defaultValue={post.content}
                  placeholder="Write your masterpiece here..."
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Platforms
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {platforms.map((platform) => (
                    <div key={platform.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={platform.id} 
                        name="platforms" 
                        value={platform.id}
                        defaultChecked={post.platforms.includes(platform.id)}
                      />
                      <Label htmlFor={platform.id} className="text-sm font-normal">
                        {platform.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="hashtags" className="block text-sm font-medium text-gray-700 mb-1">
                  Hashtags (optional)
                </Label>
                <Input
                  id="hashtags"
                  name="hashtags"
                  defaultValue={post.hashtags?.join(', ') || ''}
                  placeholder="e.g., productivity, marketing, socialmedia (comma-separated)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scheduled_date" className="block text-sm font-medium text-gray-700 mb-1">
                    Schedule Date (optional)
                  </Label>
                  <Input
                    id="scheduled_date"
                    name="scheduled_date"
                    type="date"
                    defaultValue={scheduledDate}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="scheduled_time" className="block text-sm font-medium text-gray-700 mb-1">
                    Schedule Time (optional)
                  </Label>
                  <Input
                    id="scheduled_time"
                    name="scheduled_time"
                    type="time"
                    defaultValue={scheduledTime}
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Scheduling Info</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Clear date/time to save as draft. Set future date to schedule for publishing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Link href="/posts">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button 
                  type="submit"
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Post</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{post.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Post'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}