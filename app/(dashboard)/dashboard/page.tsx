"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, CreditCard, DollarSign, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
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
          <TabsTrigger value="cards">Cards</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
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
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Spending Budget</CardTitle>
                <CardDescription>Your monthly budget allocation and usage.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      category: "Groceries",
                      spent: 450,
                      budget: 500,
                      percentage: 90,
                    },
                    {
                      category: "Entertainment",
                      spent: 175,
                      budget: 200,
                      percentage: 87.5,
                    },
                    {
                      category: "Transportation",
                      spent: 120,
                      budget: 300,
                      percentage: 40,
                    },
                    {
                      category: "Shopping",
                      spent: 310,
                      budget: 250,
                      percentage: 124,
                    },
                    {
                      category: "Utilities",
                      spent: 180,
                      budget: 200,
                      percentage: 90,
                    },
                  ].map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{category.category}</span>
                          <span className="text-xs text-muted-foreground">
                            ${category.spent} of ${category.budget}
                          </span>
                        </div>
                        <span className="text-sm font-medium">{category.percentage}%</span>
                      </div>
                      <Progress
                        value={category.percentage}
                        className={category.percentage > 100 ? "text-destructive" : ""}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed analytics of your spending patterns.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Analytics charts will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-gradient-to-br from-purple-600 to-purple-800 text-white">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>SafeXBank Platinum</span>
                  <CreditCard className="h-5 w-5" />
                </CardTitle>
                <CardDescription className="text-purple-100">**** **** **** 4589</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-4 text-lg">John Doe</div>
                <div className="text-sm text-purple-100">Valid thru: 05/28</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-700 to-gray-900 text-white">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>SafeXBank Business</span>
                  <CreditCard className="h-5 w-5" />
                </CardTitle>
                <CardDescription className="text-gray-300">**** **** **** 7821</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-4 text-lg">John Doe</div>
                <div className="text-sm text-gray-300">Valid thru: 09/27</div>
              </CardContent>
            </Card>
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
              <Button variant="outline" className="rounded-full h-12 w-12 mb-4">
                +
              </Button>
              <p className="font-medium">Add New Card</p>
              <p className="text-sm text-muted-foreground text-center mt-1">Apply for a new credit or debit card</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

