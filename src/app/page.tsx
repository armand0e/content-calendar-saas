import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <CalendarDaysIcon className="h-6 w-6 mr-2" />
          <span className="font-bold">ContentFlow</span>
        </Link>
        <NavigationMenu className="ml-auto hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>Product</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>Pricing</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/docs" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>Docs</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/blog" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>Blog</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>Sign in</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button className="ml-4">Start your project</Button>
        <Button className="ml-auto lg:hidden">Menu</Button>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="absolute top-0 left-0 -z-10 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Build content that converts
                    <br />
                    <span className="text-primary">Scale to millions</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    ContentFlow is the AI-powered content platform. Start with smart scheduling, add team collaboration, instant analytics, and scale with automated workflows.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="h-12 px-8">
                    Start your project
                  </Button>
                  <Button variant="outline" size="lg" className="h-12 px-8">
                    Request a demo
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    Free plan available
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    No credit card required
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/hero-illustration.svg"
                  width="550"
                  height="550"
                  alt="Content Calendar Dashboard"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square border shadow-2xl"
                />
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Live Analytics</span>
                  </div>
                  <div className="text-2xl font-bold">+127%</div>
                  <div className="text-sm text-muted-foreground">Engagement this month</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="w-full py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground">Trusted by fast-growing companies worldwide</p>
            </div>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-lg font-semibold">TechCorp</div>
              <div className="text-lg font-semibold">StartupXYZ</div>
              <div className="text-lg font-semibold">CreativeAgency</div>
              <div className="text-lg font-semibold">MediaFlow</div>
              <div className="text-lg font-semibold">BrandStudio</div>
            </div>
          </div>
        </section>

        {/* Product Features */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Use one or all. Best of breed features.
                <br />
                <span className="text-primary">Integrated as a platform.</span>
              </h2>
            </div>
            
            <div className="grid gap-16">
              {/* AI Scheduling Feature */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <SparklesIcon className="w-4 h-4" />
                    AI-Powered
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Smart Scheduling</h3>
                  <p className="text-muted-foreground mb-6">
                    Our AI analyzes your audience engagement patterns and suggests optimal posting times. 
                    Increase your reach by up to 300% with intelligent scheduling.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      <span>Audience behavior analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      <span>Cross-platform optimization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      <span>Automatic timezone handling</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8">
                  <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Best posting time</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">AI Suggested</span>
                    </div>
                    <div className="text-2xl font-bold">2:30 PM</div>
                    <div className="text-sm text-muted-foreground">+47% higher engagement expected</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div key={i} className="bg-white rounded p-2 text-center">
                        <div className="text-xs text-muted-foreground">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                        </div>
                        <div className={`w-full h-8 rounded mt-1 ${i === 2 ? 'bg-green-500' : i === 1 || i === 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Team Collaboration */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-8">
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">Jane Doe</div>
                            <div className="text-xs text-muted-foreground">Content Manager</div>
                          </div>
                          <div className="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                            Pending Review
                          </div>
                        </div>
                        <div className="text-sm">&quot;New product launch campaign ready for approval&quot;</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>MS</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">Mike Smith</div>
                            <div className="text-xs text-muted-foreground">Designer</div>
                          </div>
                          <div className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Approved
                          </div>
                        </div>
                        <div className="text-sm">&quot;Instagram story graphics completed&quot;</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <UsersIcon className="w-4 h-4" />
                    Collaboration
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Team Workflows</h3>
                  <p className="text-muted-foreground mb-6">
                    Streamline your content creation process with built-in approval workflows, 
                    role-based permissions, and real-time collaboration tools.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      <span>Custom approval workflows</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      <span>Role-based permissions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      <span>Real-time comments & feedback</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Analytics */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <LineChartIcon className="w-4 h-4" />
                    Analytics
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Real-time Insights</h3>
                  <p className="text-muted-foreground mb-6">
                    Track performance across all platforms with comprehensive analytics. 
                    Make data-driven decisions with actionable insights and automated reports.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      <span>Cross-platform analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      <span>Automated reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      <span>ROI tracking</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-8">
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Performance Overview</h4>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Live</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-green-600">+127%</div>
                        <div className="text-sm text-muted-foreground">Engagement</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">2.4M</div>
                        <div className="text-sm text-muted-foreground">Reach</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">89%</div>
                        <div className="text-sm text-muted-foreground">On-time posts</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">$12.4K</div>
                        <div className="text-sm text-muted-foreground">Revenue tracked</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Stories */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
                Customer Stories
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Trusted by the world's most innovative companies. See how ContentFlow empowers teams to accelerate their growth.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-lg font-semibold mb-2">TechStartup scales to 1M followers</div>
                    <p className="text-sm text-muted-foreground">
                      &quot;ContentFlow&apos;s AI scheduling helped us grow from 10K to 1M followers in just 8 months. The ROI is incredible.&quot;
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">Sarah Johnson</div>
                      <div className="text-xs text-muted-foreground">CMO, TechStartup</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-lg font-semibold mb-2">Agency saves 20 hours per week</div>
                    <p className="text-sm text-muted-foreground">
                                             &quot;The team collaboration features transformed our workflow. We&apos;re now managing 50+ clients effortlessly.&quot;
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">Mike Rodriguez</div>
                      <div className="text-xs text-muted-foreground">Founder, CreativeAgency</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-lg font-semibold mb-2">E-commerce brand boosts sales 300%</div>
                    <p className="text-sm text-muted-foreground">
                      &quot;The analytics insights helped us optimize our content strategy and triple our conversion rate.&quot;
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">Anna Lee</div>
                      <div className="text-xs text-muted-foreground">Marketing Director, ShopFlow</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
                Build in a weekend, scale to millions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start for free, then add a site plan to go live. Account plans unlock additional features.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="relative">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>Perfect for personal projects</CardDescription>
                  <div className="text-3xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Up to 2 social accounts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      50 scheduled posts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Basic analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Community support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">Get started</Button>
                </CardFooter>
              </Card>

              <Card className="relative border-primary shadow-lg scale-105">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                  <div className="text-3xl font-bold">$29<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Unlimited social accounts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Unlimited scheduled posts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Advanced analytics & reporting
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Team collaboration (5 users)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      AI-powered scheduling
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Priority support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start free trial</Button>
                </CardFooter>
              </Card>

              <Card className="relative">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                  <div className="text-3xl font-bold">Custom</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Everything in Pro
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Unlimited team members
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Custom integrations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Dedicated account manager
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      SLA & premium support
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Advanced security & compliance
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">Contact sales</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to transform your content strategy?
              </h2>
              <p className="max-w-2xl mx-auto text-primary-foreground/80 md:text-xl">
                Join thousands of creators and businesses who trust ContentFlow to power their social media success.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button size="lg" variant="secondary" className="h-12 px-8">
                  Start your project
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  Request a demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 ContentFlow. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="/security" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Security
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function CalendarDaysIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    )
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  )
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
}

function LineChartIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    )
}
