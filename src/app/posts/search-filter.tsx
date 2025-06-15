'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SearchFilterProps {
  onSearch: (query: string) => void
  onFilterStatus: (status: string) => void
  onFilterPlatform: (platform: string) => void
  onClearFilters: () => void
  activeFilters: {
    search: string
    status: string
    platform: string
  }
}

export default function SearchFilter({
  onSearch,
  onFilterStatus,
  onFilterPlatform,
  onClearFilters,
  activeFilters
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState(activeFilters.search)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const hasActiveFilters = activeFilters.search || activeFilters.status || activeFilters.platform

  return (
    <div className="bg-white border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search posts by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1 h-8 w-8 p-0"
              variant="ghost"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </Button>
          </div>
        </form>

        {/* Status Filter */}
        <Select value={activeFilters.status} onValueChange={onFilterStatus}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        {/* Platform Filter */}
        <Select value={activeFilters.platform} onValueChange={onFilterPlatform}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Filter by platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="twitter">Twitter / X</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-sm text-gray-600">Active filters:</span>
          {activeFilters.search && (
            <Badge variant="secondary">
              Search: "{activeFilters.search}"
              <button
                onClick={() => onSearch('')}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </Badge>
          )}
          {activeFilters.status && activeFilters.status !== 'all' && (
            <Badge variant="secondary">
              Status: {activeFilters.status}
              <button
                onClick={() => onFilterStatus('all')}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </Badge>
          )}
          {activeFilters.platform && activeFilters.platform !== 'all' && (
            <Badge variant="secondary">
              Platform: {activeFilters.platform}
              <button
                onClick={() => onFilterPlatform('all')}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}