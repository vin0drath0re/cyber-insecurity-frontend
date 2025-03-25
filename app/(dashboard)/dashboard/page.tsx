"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, CreditCard, DollarSign, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import AnalyticsSection from "@/components/sections/AnalyticsSection"
import { UserData } from "@/components/context/UserContext"
import { useRouter } from "next/navigation"


export default function DashboardPage() {
  const { userId , isAuth } = UserData();
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

  useEffect(() => {
    console.log("dashboard id:",userId);
  }, [userId]);
  const [activeTab, setActiveTab] = useState("overview")

  return (
    
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here's an overview of your finances.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ArrowDown className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button>
            <ArrowUp className="mr-2 h-4 w-4" />
            Transfer
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Income</CardTitle>
                <ArrowDown className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$7,350.00</div>
                <p className="text-xs text-muted-foreground">+4.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                <ArrowUp className="h-4 w-4 text-rose-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$3,850.50</div>
                <p className="text-xs text-muted-foreground">-2.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,234.00</div>
                <p className="text-xs text-muted-foreground">+10.1% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Recent Transactions */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your recent transactions from the past 30 days.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Netflix Subscription",
                      amount: "-$14.99",
                      date: "Mar 15, 2025",
                      icon: "N",
                      iconColor: "bg-red-500",
                    },
                    {
                      name: "Salary Deposit",
                      amount: "+$3,500.00",
                      date: "Mar 10, 2025",
                      icon: "SD",
                      iconColor: "bg-green-500",
                    },
                    {
                      name: "Grocery Store",
                      amount: "-$156.24",
                      date: "Mar 8, 2025",
                      icon: "GS",
                      iconColor: "bg-orange-500",
                    },
                    {
                      name: "Electric Bill",
                      amount: "-$85.75",
                      date: "Mar 5, 2025",
                      icon: "EB",
                      iconColor: "bg-blue-500",
                    },
                    {
                      name: "Amazon Purchase",
                      amount: "-$42.99",
                      date: "Mar 3, 2025",
                      icon: "AP",
                      iconColor: "bg-yellow-500",
                    },
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className={transaction.iconColor}>{transaction.icon}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{transaction.name}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                      <div className="ml-auto font-medium">{transaction.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
          </div>

        </TabsContent>
        <TabsContent value="analytics" className="space-y-4 ">
          <Card >
            <CardHeader>
              <CardTitle className="text-3xl">Analytics</CardTitle>
              <CardDescription>View detailed analytics of your spending patterns.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <AnalyticsSection/>
            </CardContent>
          </Card>
          
        </TabsContent>
      </Tabs>
    </div>
  )
}

