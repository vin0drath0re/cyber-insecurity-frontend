import Link from "next/link"
import { ArrowRight, CheckCircle2, CreditCard, Lock, Shield, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-purple-800 to-purple-950 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Banking Made Simple</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Manage your finances with ease using our modern banking platform. Secure, fast, and user-friendly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-white font-bold text-purple-800 hover:bg-purple-100 ">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button asChild variant="default" size="lg" className=" bg-purple-700 font-bold text-white hover:bg-purple-800">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SafeXBank?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our modern banking platform offers everything you need to manage your finances effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Banking</h3>
              <p className="text-gray-600">
                Bank with confidence knowing your data is protected with industry-leading security.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Payments</h3>
              <p className="text-gray-600">Send money, pay bills, and manage transactions with just a few clicks.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Wallet className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Financial Insights</h3>
              <p className="text-gray-600">
                Get detailed analytics and insights to help you make better financial decisions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-gray-600">
                Your privacy matters. We never sell your data or share it with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Modern Banking</h2>
              <p className="text-lg text-gray-600 mb-8">
                SafeXBank combines cutting-edge technology with user-friendly design to provide you with the best
                banking experience possible.
              </p>

              <ul className="space-y-4">
                {[
                  "24/7 access to your accounts",
                  "Real-time transaction notifications",
                  "Seamless transfers between accounts",
                  "Automated savings and budgeting tools",
                  "Dedicated customer support",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="mt-8">
                <Link href="/register">
                  Open an Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src="/" alt="Banking App Interface" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24  bg-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust SafeXBank with their finances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-700 font-bold hover:bg-purple-100">
              <Link href="/register">Create Account</Link>
            </Button>
            <Button asChild variant="default" size="lg" className=" bg-purple-700 font-bold text-white hover:bg-purple-800">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container flex justify-evenly flex-col items-center p-6">
          <div className=" grid grid-cols-2 md:grid-cols-4 xl:gap-44 md:gap-30 sm:gap-x-36 sm:gap-10 gap-y-10 gap-x-16">
            <div>
              <h3 className="text-lg font-semibold mb-4">SafeXBank</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    Checking
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    Savings
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    Credit Cards
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    Loans
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-300">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 SafeXBank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

