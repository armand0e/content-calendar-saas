import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: January 15, 2024
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These terms govern your use of ContentFlow and describe the rights and responsibilities 
            that apply to both you and ContentFlow.
          </p>
        </div>

        {/* Quick Summary */}
        <Card className="mb-12 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-2xl text-green-900">Terms Summary</CardTitle>
            <CardDescription className="text-green-800">
              Here are the key points of our Terms of Service:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">You own your content</h3>
                    <p className="text-sm text-green-800">Your content remains yours. We just help you manage and publish it.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">Use responsibly</h3>
                    <p className="text-sm text-green-800">Follow platform rules and respect others&apos; rights.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">We provide the service</h3>
                    <p className="text-sm text-green-800">We maintain and improve ContentFlow for your use.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">Fair usage</h3>
                    <p className="text-sm text-green-800">Use our service within reasonable limits and guidelines.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Acceptance of Terms</h2>
            
            <p className="text-gray-700 mb-4">
              By accessing or using ContentFlow (&quot;the Service&quot;), you agree to be bound by these Terms of Service 
              (&quot;Terms&quot;). If you disagree with any part of these terms, you may not access the Service.
            </p>

            <p className="text-gray-700 mb-6">
              These Terms apply to all visitors, users, and others who access or use the Service. 
              We may update these Terms from time to time, and we&apos;ll notify you of significant changes.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Note</h3>
              <p className="text-yellow-800">
                You must be at least 13 years old to use ContentFlow. If you&apos;re under 18, you need parental consent.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Description of Service</h2>
            
            <p className="text-gray-700 mb-4">
              ContentFlow is a content calendar and social media management platform that allows you to:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Create, schedule, and publish content across multiple social media platforms</li>
              <li>Collaborate with team members on content creation and approval</li>
              <li>Analyze content performance and engagement metrics</li>
              <li>Manage multiple social media accounts from a single dashboard</li>
              <li>Access AI-powered features for content optimization and scheduling</li>
            </ul>

            <p className="text-gray-700 mb-6">
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time, 
              with or without notice. We will not be liable for any modification, suspension, or discontinuation.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. User Accounts and Responsibilities</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Creation</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the security of your account and password</li>
              <li>You must notify us immediately of any unauthorized use of your account</li>
              <li>One person or legal entity may not maintain more than one free account</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Acceptable Use</h3>
            <p className="text-gray-700 mb-4">You agree not to use the Service to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit spam, malware, or harmful content</li>
              <li>Harass, abuse, or harm others</li>
              <li>Impersonate others or provide false information</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Content and Intellectual Property</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• You retain ownership of your content</li>
                    <li>• You grant us license to process and display your content</li>
                    <li>• You&apos;re responsible for your content&apos;s legality</li>
                    <li>• You can delete your content anytime</li>
                    <li>• We may remove content that violates our policies</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Our Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• ContentFlow platform and features are our property</li>
                    <li>• Our trademarks and logos are protected</li>
                    <li>• You may not copy or redistribute our content</li>
                    <li>• Templates and tools are licensed for your use</li>
                    <li>• Feedback you provide may be used by us</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800">
                <strong>Content License:</strong> By uploading content, you grant ContentFlow a worldwide, 
                non-exclusive license to use, display, and process your content solely to provide our services.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Payment and Billing</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Subscription Plans</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Paid plans are billed in advance on a monthly or annual basis</li>
              <li>All fees are non-refundable except as required by law or our refund policy</li>
              <li>We may change pricing with 30 days&apos; notice to existing subscribers</li>
              <li>Taxes may apply based on your location</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cancellation and Refunds</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>You may cancel your subscription at any time</li>
              <li>Cancellation takes effect at the end of your current billing period</li>
              <li>We offer a 30-day money-back guarantee for new subscribers</li>
              <li>Refunds are processed within 5-10 business days</li>
            </ul>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Privacy and Data Protection</h2>
            
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect 
              your information when you use our Service.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Privacy Points</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• We collect only necessary information to provide our services</li>
                <li>• We never sell your personal data to third parties</li>
                <li>• You have control over your data and can request deletion</li>
                <li>• We comply with GDPR, CCPA, and other privacy regulations</li>
              </ul>
            </div>

            <p className="text-gray-700">
              By using ContentFlow, you also agree to our{" "}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Limitation of Liability</h2>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Important Legal Notice</h3>
              <p className="text-red-800 mb-4">
                ContentFlow is provided &quot;as is&quot; without warranties of any kind. We do not guarantee 
                uninterrupted or error-free service.
              </p>
            </div>

            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law, ContentFlow shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including but not limited to:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Loss of profits, data, or business opportunities</li>
              <li>Service interruptions or delays</li>
              <li>Third-party actions or content</li>
              <li>Unauthorized access to your account</li>
              <li>Errors or omissions in our service</li>
            </ul>

            <p className="text-gray-700 mb-6">
              Our total liability for any claims related to the Service shall not exceed the amount 
              you paid us in the 12 months preceding the claim.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Termination</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Termination by You</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>You may terminate your account at any time through your account settings</li>
              <li>Upon termination, your right to use the Service ceases immediately</li>
              <li>We will retain your data for 30 days to allow for account recovery</li>
              <li>After 30 days, your data will be permanently deleted</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Termination by Us</h3>
            <p className="text-gray-700 mb-4">We may terminate or suspend your account if you:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Violate these Terms of Service</li>
              <li>Engage in fraudulent or illegal activities</li>
              <li>Fail to pay applicable fees</li>
              <li>Abuse or misuse our Service</li>
            </ul>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Contact Information</h2>
            
            <p className="text-gray-700 mb-6">
              If you have questions about these Terms of Service, please contact us:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Legal Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Email:</strong> legal@contentflow.com
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Address:</strong> 123 Legal Street, San Francisco, CA 94105
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Response Time:</strong> Within 5 business days
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Email:</strong> support@contentflow.com
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Live Chat:</strong> Available 24/7
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Help Center:</strong> help.contentflow.com
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-2xl p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Questions About Our Terms?
          </h2>
          <p className="text-gray-600 mb-6">
            Our legal team is here to help clarify any questions about these terms.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button>
              Contact Legal Team
            </Button>
            <Button variant="outline" asChild>
              <Link href="/privacy">View Privacy Policy</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 