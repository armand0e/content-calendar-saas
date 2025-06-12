import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for individuals and small teams getting started",
    features: [
      "Up to 3 social accounts",
      "10 scheduled posts per month",
      "Basic analytics",
      "Email support",
      "Content calendar",
      "Mobile app access"
    ],
    limitations: [
      "No team collaboration",
      "Limited integrations",
      "Basic templates only"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    description: "For growing businesses and marketing teams",
    features: [
      "Up to 10 social accounts",
      "Unlimited scheduled posts",
      "Advanced analytics & reporting",
      "Team collaboration (up to 5 members)",
      "AI-powered scheduling",
      "Custom templates",
      "Priority support",
      "Bulk upload",
      "Content approval workflow"
    ],
    limitations: [],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with advanced needs",
    features: [
      "Unlimited social accounts",
      "Unlimited team members",
      "White-label solution",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "Advanced security & compliance",
      "Custom reporting",
      "API access",
      "Single Sign-On (SSO)"
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false
  }
]

const faqs = [
  {
    question: "Can I change my plan at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer: "We'll notify you when you're approaching your limits. You can upgrade your plan or purchase additional capacity as needed."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll provide a full refund."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, all paid plans come with a 14-day free trial. No credit card required to start."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time. Your account will remain active until the end of your billing period."
  }
]

export default function PricingPage() {
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
            <Link href="/pricing" className="text-sm font-medium text-blue-600">Pricing</Link>
            <Button asChild size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your content marketing needs. Start free and scale as you grow.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <span className="text-sm text-gray-600">Monthly</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-12 h-6 bg-gray-200 rounded-full shadow-inner"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform"></div>
            </div>
            <span className="text-sm text-gray-600">
              Annual <span className="text-green-600 font-medium">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-600">{plan.period}</span>}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className={`w-full mb-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation) => (
                    <div key={limitation} className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      <span className="text-sm text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Compare all features</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Features</th>
                  <th className="text-center py-4 px-6 font-medium text-gray-900">Starter</th>
                  <th className="text-center py-4 px-6 font-medium text-gray-900">Professional</th>
                  <th className="text-center py-4 px-6 font-medium text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Social Accounts", starter: "3", pro: "10", enterprise: "Unlimited" },
                  { feature: "Scheduled Posts", starter: "10/month", pro: "Unlimited", enterprise: "Unlimited" },
                  { feature: "Team Members", starter: "1", pro: "5", enterprise: "Unlimited" },
                  { feature: "Analytics", starter: "Basic", pro: "Advanced", enterprise: "Custom" },
                  { feature: "AI Scheduling", starter: "✗", pro: "✓", enterprise: "✓" },
                  { feature: "API Access", starter: "✗", pro: "✗", enterprise: "✓" },
                  { feature: "White Label", starter: "✗", pro: "✗", enterprise: "✓" },
                  { feature: "Support", starter: "Email", pro: "Priority", enterprise: "Dedicated" }
                ].map((row) => (
                  <tr key={row.feature} className="border-b">
                    <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{row.starter}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{row.pro}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses already using ContentFlow to scale their content marketing.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 