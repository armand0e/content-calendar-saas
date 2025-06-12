import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const securityFeatures = [
  {
    title: "Data Encryption",
    description: "All data is encrypted in transit and at rest using industry-standard AES-256 encryption.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
      </svg>
    )
  },
  {
    title: "SOC 2 Type II Compliant",
    description: "We undergo regular third-party security audits to ensure the highest standards of data protection.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    )
  },
  {
    title: "GDPR & CCPA Ready",
    description: "Full compliance with global privacy regulations including GDPR, CCPA, and other data protection laws.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    )
  },
  {
    title: "Multi-Factor Authentication",
    description: "Secure your account with 2FA, SSO integration, and advanced authentication methods.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
      </svg>
    )
  },
  {
    title: "Regular Security Audits",
    description: "Continuous monitoring and regular penetration testing by leading cybersecurity firms.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    )
  },
  {
    title: "Data Backup & Recovery",
    description: "Automated daily backups with 99.9% uptime guarantee and disaster recovery protocols.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
      </svg>
    )
  }
]

const certifications = [
  {
    name: "SOC 2 Type II",
    description: "System and Organization Controls",
    status: "Certified"
  },
  {
    name: "ISO 27001",
    description: "Information Security Management",
    status: "Certified"
  },
  {
    name: "GDPR",
    description: "General Data Protection Regulation",
    status: "Compliant"
  },
  {
    name: "CCPA",
    description: "California Consumer Privacy Act",
    status: "Compliant"
  },
  {
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act",
    status: "Available"
  }
]

export default function SecurityPage() {
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

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Security & Compliance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your data security is our top priority. ContentFlow is built with enterprise-grade security 
            measures and compliance standards to protect your content and business information.
          </p>
          <Button size="lg" asChild>
            <Link href="/docs/security">View Security Documentation</Link>
          </Button>
        </div>

        {/* Security Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Enterprise-Grade Security
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Compliance & Certifications */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Compliance & Certifications
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{cert.name}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cert.status === 'Certified' ? 'bg-green-100 text-green-700' :
                      cert.status === 'Compliant' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                  <CardDescription>{cert.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Practices */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Security Practices
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Zero Trust Architecture</h3>
                    <p className="text-gray-600">Every request is verified and authenticated before accessing any system or data.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">24/7 Security Monitoring</h3>
                    <p className="text-gray-600">Continuous monitoring and threat detection with immediate incident response.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Regular Security Training</h3>
                    <p className="text-gray-600">All team members receive ongoing security awareness and best practices training.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Incident Response Plan</h3>
                    <p className="text-gray-600">Comprehensive incident response procedures with clear escalation paths.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">99.9% Uptime SLA</h3>
                <p className="text-gray-600 mb-6">
                  We guarantee 99.9% uptime with redundant infrastructure and automatic failover systems.
                </p>
                <Button variant="outline">View Status Page</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Security Team */}
        <div className="text-center bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Have Security Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our security team is here to help. Contact us for security questionnaires, 
            compliance documentation, or any security-related inquiries.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg">
              Contact Security Team
            </Button>
            <Button size="lg" variant="outline">
              Download Security Whitepaper
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 