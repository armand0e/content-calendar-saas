import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function PrivacyPage() {
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
            <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900">Blog</Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">Pricing</Link>
            <Button asChild size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: January 15, 2024
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At ContentFlow, we take your privacy seriously. This policy explains how we collect, 
            use, and protect your personal information when you use our services.
          </p>
        </div>

        {/* Quick Summary */}
        <Card className="mb-12 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">Privacy at a Glance</CardTitle>
            <CardDescription className="text-blue-800">
              Here&apos;s what you need to know about how we handle your data:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">We don&apos;t sell your data</h3>
                    <p className="text-sm text-blue-800">Your personal information is never sold to third parties.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">You control your data</h3>
                    <p className="text-sm text-blue-800">Access, update, or delete your information anytime.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">Enterprise-grade security</h3>
                    <p className="text-sm text-blue-800">Your data is encrypted and protected with industry standards.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">GDPR & CCPA compliant</h3>
                    <p className="text-sm text-blue-800">We comply with global privacy regulations.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Information You Provide</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><strong>Account Information:</strong> Name, email address, password, and profile information</li>
              <li><strong>Content Data:</strong> Posts, images, videos, and other content you create or upload</li>
              <li><strong>Social Media Accounts:</strong> Information from connected social media platforms</li>
              <li><strong>Payment Information:</strong> Billing details and payment method information (processed securely by our payment providers)</li>
              <li><strong>Communication Data:</strong> Messages you send to our support team or through our platform</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect Automatically</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><strong>Usage Data:</strong> How you interact with our platform, features used, and time spent</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers</li>
              <li><strong>Analytics Data:</strong> Performance metrics and engagement statistics for your content</li>
              <li><strong>Log Data:</strong> Server logs, error reports, and security events</li>
            </ul>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. How We Use Your Information</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Service Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Provide and maintain our platform</li>
                    <li>• Schedule and publish your content</li>
                    <li>• Generate analytics and insights</li>
                    <li>• Process payments and billing</li>
                    <li>• Provide customer support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Platform Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Improve our services and features</li>
                    <li>• Develop new functionality</li>
                    <li>• Conduct research and analytics</li>
                    <li>• Ensure platform security</li>
                    <li>• Prevent fraud and abuse</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Information Sharing</h2>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">We Never Sell Your Data</h3>
              <p className="text-red-800">
                ContentFlow does not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">We may share information in these limited circumstances:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><strong>Service Providers:</strong> Trusted partners who help us operate our platform (hosting, analytics, payment processing)</li>
              <li><strong>Social Media Platforms:</strong> When you authorize us to publish content to your connected accounts</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets (with notice to users)</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share specific information</li>
            </ul>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Your Rights and Choices</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Access & Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Access your personal information</li>
                    <li>• Update or correct your data</li>
                    <li>• Delete your account and data</li>
                    <li>• Export your content and data</li>
                    <li>• Restrict data processing</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Communication Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Opt out of marketing emails</li>
                    <li>• Control notification settings</li>
                    <li>• Manage cookie preferences</li>
                    <li>• Withdraw consent anytime</li>
                    <li>• Request data portability</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800">
                <strong>Exercise Your Rights:</strong> Contact us at privacy@contentflow.com or use the data controls in your account settings.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Data Security</h2>
            
            <p className="text-gray-700 mb-6">
              We implement industry-standard security measures to protect your information:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Encryption</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    All data is encrypted in transit (TLS 1.3) and at rest (AES-256).
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Access Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Strict access controls and multi-factor authentication for all systems.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    24/7 security monitoring and regular security audits and assessments.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. International Data Transfers</h2>
            
            <p className="text-gray-700 mb-4">
              ContentFlow operates globally and may transfer your information to countries outside your residence. 
              We ensure appropriate safeguards are in place for international transfers, including:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Standard Contractual Clauses approved by the European Commission</li>
              <li>Adequacy decisions for countries with equivalent privacy protections</li>
              <li>Binding Corporate Rules for transfers within our organization</li>
              <li>Your explicit consent for specific transfers when required</li>
            </ul>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Contact Us</h2>
            
            <p className="text-gray-700 mb-6">
              If you have questions about this Privacy Policy or want to exercise your rights, contact us:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Privacy Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Email:</strong> privacy@contentflow.com
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Response Time:</strong> Within 30 days
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Languages:</strong> English, Spanish, French
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Protection Officer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Email:</strong> dpo@contentflow.com
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Address:</strong> 123 Privacy Street, San Francisco, CA 94105
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>EU Representative:</strong> Available upon request
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-2xl p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Questions About Your Privacy?
          </h2>
          <p className="text-gray-600 mb-6">
            Our privacy team is here to help you understand and control your data.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button>
              Contact Privacy Team
            </Button>
            <Button variant="outline" asChild>
              <Link href="/security">View Security Measures</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 