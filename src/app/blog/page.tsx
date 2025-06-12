import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const featuredPosts = [
  {
    id: 1,
    title: "The Future of AI-Powered Content Marketing",
    excerpt: "How artificial intelligence is revolutionizing the way brands create, schedule, and optimize their content for maximum engagement.",
    author: "Sarah Chen",
    date: "January 15, 2024",
    readTime: "8 min read",
    category: "AI & Marketing",
    image: "/api/placeholder/600/300",
    featured: true
  },
  {
    id: 2,
    title: "Building Scalable Content Operations",
    excerpt: "Learn how enterprise teams are streamlining their content workflows to publish consistently across multiple platforms.",
    author: "Mark Rodriguez",
    date: "January 12, 2024",
    readTime: "6 min read",
    category: "Operations",
    image: "/api/placeholder/600/300",
    featured: true
  }
]

const blogPosts = [
  {
    id: 3,
    title: "Social Media Analytics That Actually Matter",
    excerpt: "Beyond vanity metrics: discover the KPIs that drive real business growth and how to track them effectively.",
    author: "Lisa Wang",
    date: "January 10, 2024",
    readTime: "5 min read",
    category: "Analytics"
  },
  {
    id: 4,
    title: "Cross-Platform Content Strategy Guide",
    excerpt: "Master the art of adapting your content for different social platforms while maintaining brand consistency.",
    author: "Alex Thompson",
    date: "January 8, 2024",
    readTime: "7 min read",
    category: "Strategy"
  },
  {
    id: 5,
    title: "Team Collaboration Best Practices",
    excerpt: "How to set up approval workflows, manage content calendars, and coordinate across distributed marketing teams.",
    author: "Jennifer Kim",
    date: "January 5, 2024",
    readTime: "4 min read",
    category: "Collaboration"
  },
  {
    id: 6,
    title: "Content Calendar Templates for 2024",
    excerpt: "Free templates and frameworks to plan your content strategy for the year ahead, with seasonal campaigns included.",
    author: "David Park",
    date: "January 3, 2024",
    readTime: "6 min read",
    category: "Templates"
  },
  {
    id: 7,
    title: "API Integration Success Stories",
    excerpt: "Real-world examples of how companies are using ContentFlow's API to automate their content workflows.",
    author: "Maya Patel",
    date: "December 28, 2023",
    readTime: "8 min read",
    category: "Technical"
  },
  {
    id: 8,
    title: "Measuring Content ROI Effectively",
    excerpt: "A comprehensive guide to tracking the business impact of your content marketing efforts with actionable metrics.",
    author: "Ryan Foster",
    date: "December 25, 2023",
    readTime: "9 min read",
    category: "Analytics"
  }
]

const categories = [
  "All Posts",
  "AI & Marketing",
  "Analytics", 
  "Strategy",
  "Operations",
  "Collaboration",
  "Templates",
  "Technical"
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
            <span className="text-xl font-bold">ContentFlow</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/docs" className="text-sm font-medium text-gray-600 hover:text-gray-900">Docs</Link>
            <Link href="/blog" className="text-sm font-medium text-blue-600">Blog</Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">Pricing</Link>
            <Button asChild size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            ContentFlow Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Insights, strategies, and best practices for modern content marketing. 
            Learn how to build, scale, and optimize your content operations.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <input
              type="search"
              placeholder="Search articles..."
              className="px-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button>Search</Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All Posts" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-r from-blue-100 to-purple-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span>{post.date} • {post.readTime}</span>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">By {post.author}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Read More →
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">By {post.author}</p>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Read →
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest content marketing insights and ContentFlow updates delivered to your inbox.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg w-64 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 