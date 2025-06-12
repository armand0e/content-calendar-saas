'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { login, signup, signInWithGoogle, signInWithGitHub } from "@/app/auth/actions"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
            <span className="text-2xl font-bold">ContentFlow</span>
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isLogin ? "Welcome back" : "Create your account"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Sign in to your ContentFlow account" 
                : "Start building content that converts"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Login */}
            <div className="space-y-3">
              <form action={signInWithGoogle}>
                <Button 
                  type="submit" 
                  variant="outline" 
                  className="w-full justify-center space-x-2"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </Button>
              </form>
              
              <form action={signInWithGitHub}>
                <Button 
                  type="submit" 
                  variant="outline" 
                  className="w-full justify-center space-x-2"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.068 1.219-5.068s-.31-.618-.31-1.532c0-1.434.833-2.505 1.87-2.505.881 0 1.307.663 1.307 1.458 0 .888-.567 2.219-.859 3.449-.245 1.035.52 1.879 1.546 1.879 1.852 0 3.285-2.199 3.285-4.84 0-1.992-1.312-3.496-3.707-3.496-2.727 0-4.429 2.016-4.429 4.252 0 .776.223 1.319.578 1.748.266.312.305.438.208.711-.074.21-.223.846-.296 1.096-.105.36-.42.475-.761.354-1.338-.544-1.961-1.999-1.961-3.649 0-2.68 2.104-5.748 6.287-5.748 3.368 0 5.634 2.325 5.634 4.996 0 3.439-1.946 6.065-4.82 6.065-.967 0-1.876-.53-2.189-1.156l-.612 2.251c-.229.81-.854 1.865-1.305 2.54C8.926 23.027 10.438 23.5 12.017 23.5c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                  <span>Continue with GitHub</span>
                </Button>
              </form>
            </div>

            <div className="flex items-center space-x-4">
              <Separator className="flex-1" />
              <span className="text-sm text-gray-500">or</span>
              <Separator className="flex-1" />
            </div>

            {/* Email Form */}
            <form action={isLogin ? login : signup} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
                onClick={() => setIsLoading(true)}
              >
                {isLoading ? "Loading..." : (isLogin ? "Sign In" : "Create Account")}
              </Button>
            </form>

            {/* Toggle Login/Signup */}
            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-gray-600 hover:text-gray-900"
                disabled={isLoading}
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>

            {/* Terms */}
            {!isLogin && (
              <p className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </Link>
              </p>
            )}
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to ContentFlow
          </Link>
        </div>
      </div>
    </div>
  )
} 