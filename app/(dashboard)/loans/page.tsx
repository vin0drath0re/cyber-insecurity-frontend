"use client";

import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  ArrowRight,
  Calculator,
  Clock,
  IndianRupee,
  Percent,
  PercentIcon,
  Shield,
} from "lucide-react";
import GlassCard from "@/components/ui/cards/GlassCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserData } from "@/components/context/UserContext";
import { useRouter } from "next/navigation";

const Loans = () => {
  const { ref, isInView } = useScrollAnimation();

  const loanFeatures = [
    {
      icon: <Percent className="h-8 w-8 text-violet-600" />,
      title: "Competitive Rates",
      description:
        "Get some of the lowest rates on the market, with transparent terms and no hidden fees.",
    },
    {
      icon: <Clock className="h-8 w-8 text-violet-600" />,
      title: "Quick Approval",
      description:
        "Apply online and get pre-approved in minutes with our streamlined application process.",
    },
    {
      icon: <Shield className="h-8 w-8 text-violet-600" />,
      title: "Payment Protection",
      description:
        "Optional payment protection to safeguard your loan in case of unexpected life events.",
    },
    {
      icon: <Calculator className="h-8 w-8 text-violet-600" />,
      title: "Flexible Terms",
      description:
        "Choose payment terms that fit your budget with options from 12 to 84 months.",
    },
  ];

  const loanTypes = [
    {
      title: "Home Loans",
      description:
        "Make your dream home a reality with competitive mortgage rates and flexible terms.",
      interestRate: 8.25,
      features: [
        "Fixed & adjustable rates",
        "First-time homebuyer programs",
        "Low down payment options",
      ],
    },
    {
      title: "Auto Loans",
      description:
        "Drive your perfect vehicle with affordable financing options for new and used cars.",
      interestRate: 9.2,
      features: [
        "New and used vehicles",
        "Terms up to 72 months",
        "Pre-approval available",
      ],
    },
    {
      title: "Personal Loans",
      description:
        "Get the funds you need for major expenses, debt consolidation, or unexpected costs.",
      interestRate: 10.3,
      features: [
        "Fixed monthly payments",
        "No collateral required",
        "Funds as soon as same day",
      ],
    },
    {
      title: "Student Loans",
      description:
        "Invest in your education with flexible repayment options for tuition and expenses.",
      interestRate: 8.15,
      features: [
        "Undergraduate & graduate loans",
        "Deferred payment options",
        "Refinancing available",
      ],
    },
  ];

  const [amount, setAmount] = useState(25000);
  const [interest, setInterest] = useState(2.5);
  const [term, setTerm] = useState(5);
   const {isAuth} = UserData()
     const router = useRouter()
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        if (!isAuth) {
          router.push("/login"); // Redirect if not authenticated
        } else {
          setLoading(false);
        }
      }, [isAuth, router]);
    
      if (loading) {
        return <p className="text-center text-lg">Loading...</p>; // Show a loading state
      }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary dark:text-violet-400 mb-4">
                Loans
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Flexible financing for{" "}
                <span className="text-primary">your goals</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                From home purchases to education expenses, we offer competitive
                rates and flexible terms to help you achieve your dreams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-lg group">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
            <div className="relative rounded-xl border bg-card text-card-foreground shadow p-6 md:p-10">
                <h3 className="text-xl font-semibold mb-4">Loan Calculator</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Loan Amount</Label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            min="0"
                            step="1000"
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Interest Rate (per Annum)</Label>
                        <div className="relative">
                          <Input
                            min="0"
                            step="0.1"
                            id="amount"
                            type="number"
                            value={interest}
                            onChange={(e) =>
                              setInterest(Number(e.target.value))
                            }
                            className="pr-7"
                          />
                          <PercentIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Term (Years)</Label>
                        <div className="relative">
                          <Input
                            min="1"
                            id="term"
                            type="number"
                            value={term}
                            onChange={(e) => setTerm(Number(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly Payment:</span>
                    <span className="text-xl font-bold">
                        ₹{Math.floor((amount * (1 + interest * term / 100)) / (term * 12))}
                        </span>
                  </div>
                </div>
             
              <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-violet-200 rounded-full blur-3xl opacity-60 -z-10"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding">
          <div className="container-padding mx-auto">
            <div
              ref={ref}
              className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
                isInView ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary dark:text-violet-400 mb-4">
                Benefits
              </div>
              <h2 className="heading-lg mb-4">
                Why choose SafeXBank for{" "}
                <span className="text-primary"> your loan</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We make borrowing simple, transparent, and tailored to your
                needs with competitive rates and excellent service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loanFeatures.map((feature, index) => (
                <GlassCard
                  key={index}
                  delay={index * 100}
                  variant="default"
                  className="p-6 flex flex-col items-center text-center h-full"
                >
                  <div className="mb-4 p-3 rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Loan Types Section */}
        <section className="section-padding">
          <div className="container-padding mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:text-violet-400 mb-4">
                Loan Options
              </div>
              <h2 className="heading-lg mb-4">
                Find the right loan for{" "}
                <span className="text-primary">your needs</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Whether you're buying a home, a car, or funding education, we
                offer competitive loans for every purpose.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loanTypes.map((loan, index) => (
                <GlassCard
                  key={index}
                  delay={index * 100}
                  variant="default"
                  className="p-6"
                >
                  <h3 className="text-xl font-semibold mb-2">{loan.title}</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    {loan.description}
                  </p>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Interest rates from</span>
                      <span className="font-semibold">
                        {loan.interestRate}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-violet-500 rounded-full"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    {loan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500 mr-2"></span>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full rounded-lg">Apply Now</Button>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Loans;
