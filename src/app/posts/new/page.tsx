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