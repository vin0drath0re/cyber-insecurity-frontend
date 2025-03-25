"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Lock,
  Shield,
  Wallet,
  BarChart3,
  DollarSign,
  Users,
  BadgeCheck,
  ArrowUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/cards/GlassCard";
import { useTheme } from "@/components/theme-provider";
import { useEffect } from "react";

export default function HomePage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light"); // Force light theme when visiting this page
  }, [setTheme]);
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* <div className="heading-lg flex items-center justify-center text-zinc-950 font-bold h-20">
          SafeXBank
        </div> */}
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center bg-gradient-to-b from-white to-violet-50 animate-bounce-once"
        style={{ animationDelay: "300ms" }}
      >
        {/* <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-violet-50"></div>
        </div> */}

        <div className="container-padding py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-lg mb-6 animate-slide-up text-zinc-950">
              <span className="text-violet-600">Modern Banking</span> For a
              Modern World
            </h1>
            <p
              className="text-lg md:text-xl text-gray-600 mb-10 animate-slide-up"
              style={{ animationDelay: "150ms" }}
            >
              Experience seamless financial management with our user-centered
              banking platform. Secure, beautiful, and designed with your needs
              in mind.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
              style={{ animationDelay: "300ms" }}
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-violet-600 hover:bg-violet-700 text-white rounded-full"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="rounded-full ">
                  <span>Sign In</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 mb-4 items-center justify-center flex flex-col">
          <div
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: "650ms" }}
          >
            <span
              className="text-violet-300 animate-fade-out"
              style={{ animationDelay: "2000ms" }}
            >
              Learn More
            </span>

            <ArrowUp
              className="h-20 w-20 text-violet-300 animate-fade-out"
              style={{ animationDelay: "2000ms" }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-padding mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-950">
              Why Choose SafeXBank?
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our modern banking platform offers everything you need to manage
              your finances effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-violet-600" />,
                title: "Secure Banking",
                description:
                  "Bank with confidence knowing your data is protected with industry-leading security.",
              },
              {
                icon: <CreditCard className="h-8 w-8 text-violet-600" />,
                title: "Easy Payments",
                description:
                  "Send money, pay bills, and manage transactions with just a few clicks.",
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-violet-600" />,
                title: "Financial Insights",
                description:
                  "Get detailed analytics and insights to help you make better financial decisions.",
              },
              {
                icon: <Lock className="h-8 w-8 text-violet-600" />,
                title: "Privacy First",
                description:
                  "Your privacy matters. We never sell your data or share it with third parties.",
              },
            ].map((feature, index) => (
              <GlassCard
                key={index}
                delay={index * 100}
                className="p-6 flex flex-col items-center text-center h-full"
              >
                <div className="mb-4 p-3 rounded-full bg-violet-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-zinc-950">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gradient-to-b from-violet-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-950">
                Experience Modern Banking
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                SafeXBank combines cutting-edge technology with user-friendly
                design to provide you with the best banking experience possible.
              </p>

              <ul className="space-y-4">
                {[
                  "24/7 access to your accounts",
                  "Real-time transaction notifications",
                  "Seamless transfers between accounts",
                  "Automated savings and budgeting tools",
                  "Dedicated customer support",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start text-zinc-950">
                    <CheckCircle2 className="h-6 w-6 text-violet-600 mr-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* <Button asChild className="mt-8">
                <Link href="/register">
                  Open an Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button> */}
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="/interface.png"
                alt="Banking App Interface"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-violet-700 to-violet-900 text-white">
        <div className="container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-md mb-6">
                Ready to take control of your finances?
              </h2>
              <p className="text-lg text-violet-100 mb-8">
                Join thousands of customers who have simplified their banking
                experience with SafeXBank.
              </p>
              <Button
                size="lg"
                className="bg-white text-violet-800 hover:bg-violet-50 rounded-full"
              >
                <Link className="flex justify-center" href="/register">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                  <Wallet className="h-10 w-10 text-violet-300 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold mb-1">98%</h3>
                  <p className="text-violet-200">Satisfaction Rate</p>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                  <DollarSign className="h-10 w-10 text-violet-300 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold mb-1">$2M+</h3>
                  <p className="text-violet-200">Transactions Daily</p>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                  <Users className="h-10 w-10 text-violet-300 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold mb-1">250k+</h3>
                  <p className="text-violet-200">Active Users</p>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                  <BadgeCheck className="h-10 w-10 text-violet-300 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold mb-1">100%</h3>
                  <p className="text-violet-200">Secure & Reliable</p>
                </div>
              </div>
            </div>
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
                  <Link href="#" className="hover:text-violet-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-violet-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-violet-300">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-violet-300">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-violet-300">
                    Checking
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-violet-300">
                    Savings
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-violet-300">
                    Credit Cards
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-violet-300">
                    Loans
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-violet-300">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-violet-300">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-violet-300">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-violet-300">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-violet-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-violet-300">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-violet-300">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-violet-300">
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
  );
}
