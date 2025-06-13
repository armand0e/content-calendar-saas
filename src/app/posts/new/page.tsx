'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { createPost } from '../actions'
import Link from 'next/link'

const platforms = [
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'twitter', label: 'Twitter / X' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
]

export default function NewPostPage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 mb-4 block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          <p className="text-gray-600">Draft your content and select platforms to publish on.</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form action={createPost} className="space-y-6">
              <div>
                <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  required
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
                      <Checkbox id={platform.id} name="platforms" value={platform.id} />
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
                      Leave date/time empty to save as draft. Set a future date to schedule automatic publishing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  type="submit"
                  disabled={isLoading}
                  onClick={() => setIsLoading(true)}
                >
                  {isLoading ? 'Creating...' : 'Create Post'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 