export default async function SocialAccountsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch connected social accounts
  const { data: connectedAccounts, error } = await supabase
    .from('social_accounts')
    .select('*')
    .eq('user_id', user.id)

  if (error) {
    console.error('Error fetching social accounts:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Social Accounts</h1>
              <p className="text-gray-600">Connect your social media accounts to start publishing</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <SocialAccountsClient connectedAccounts={connectedAccounts || []} />
        
        {/* OAuth Integration Notice */}
        <div className="max-w-4xl mx-auto mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">OAuth Integration Ready!</h3>
              <p className="text-blue-800 mb-4">
                LinkedIn and Twitter OAuth integrations are now available! You can:
              </p>
              <ul className="list-disc list-inside text-blue-800 space-y-1 mb-4">
                <li>Connect your LinkedIn and Twitter accounts with secure OAuth</li>
                <li>Publish posts directly to connected platforms</li>
                <li>Schedule content across your accounts</li>
                <li>Track publishing status and errors</li>
                <li>Manage multiple accounts from one dashboard</li>
              </ul>
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> To use OAuth integrations, you'll need to set up API credentials in your environment variables. 
                Facebook and Instagram integrations are coming soon!
              </p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">OAuth Setup Guide</h4>
              <p className="text-sm text-gray-600 mb-3">
                Learn how to configure LinkedIn and Twitter API credentials for OAuth.
              </p>
              <Link href="/docs/oauth-setup">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  View Setup Guide
                </button>
              </Link>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Publishing Documentation</h4>
              <p className="text-sm text-gray-600 mb-3">
                Technical details about our publishing engine and API integrations.
              </p>
              <Link href="/docs/publishing">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  Read Docs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}