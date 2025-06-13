'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

interface PublishButtonProps {
  postId: string
  platforms: string[]
  status: string
}

export default function PublishButton({ postId, platforms, status }: PublishButtonProps) {
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishResult, setPublishResult] = useState<any>(null)

  const handlePublish = async () => {
    setIsPublishing(true)
    setPublishResult(null)

    try {
      const response = await fetch('/api/posts/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          platforms,
        }),
      })

      const result = await response.json()
      
      if (response.ok) {
        setPublishResult(result)
        // Refresh the page to show updated status
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        throw new Error(result.error || 'Publishing failed')
      }
    } catch (error) {
      console.error('Publishing error:', error)
      setPublishResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsPublishing(false)
    }
  }

  if (publishResult) {
    if (publishResult.success) {
      return (
        <Button size="sm" className="bg-green-600 hover:bg-green-700" disabled>
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Published!
        </Button>
      )
    } else {
      return (
        <Button size="sm" variant="destructive" disabled>
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          Failed
        </Button>
      )
    }
  }

  return (
    <Button 
      size="sm" 
      onClick={handlePublish}
      disabled={isPublishing || platforms.length === 0}
      className="bg-blue-600 hover:bg-blue-700"
    >
      {isPublishing ? (
        <>
          <svg className="w-4 h-4 mr-1 animate-spin" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" opacity="0.3"/>
            <path d="M12 2v4c3.31 0 6 2.69 6 6s-2.69 6-6 6v4c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
          </svg>
          Publishing...
        </>
      ) : (
        <>
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
          Publish Now
        </>
      )}
    </Button>
  )
}