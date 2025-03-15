"use client"

import { useState } from "react"
import { ArrowDownUp, Calendar, Download, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample transaction data
const transactions = [
  {
    id: "T-1234",
    date: "Mar 15, 2025",
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: -14.99,
    status: "Completed",
  },
  {
    id: "T-1235",
    date: "Mar 14, 2025",
    description: "Grocery Store",
    category: "Groceries",
    amount: -156.24,
    status: "Completed",
  },
  {
    id: "T-1236",
    date: "Mar 13, 2025",
    description: "Gas Station",
    category: "Transportation",
    amount: -45.5,
    status: "Completed",
  },
  {
    id: "T-1237",
    date: "Mar 12, 2025",
    description: "Salary Deposit",
    category: "Income",
    amount: 3500.0,
    status: "Completed",
  },
  {
    id: "T-1238",
    date: "Mar 10, 2025",
    description: "Restaurant Payment",
    category: "Dining",
    amount: -85.75,
    status: "Completed",
  },
  {
    id: "T-1239",
    date: "Mar 8, 2025",
    description: "Electric Bill",
    category: "Utilities",
    amount: -85.75,
    status: "Pending",
  },
  {
    id: "T-1240",
    date: "Mar 7, 2025",
    description: "Amazon Purchase",
    category: "Shopping",
    amount: -42.99,
    status: "Completed",
  },
  {
    id: "T-1241",
    date: "Mar 5, 2025",
    description: "Phone Bill",
    category: "Utilities",
    amount: -65.0,
    status: "Completed",
  },
  {
    id: "T-1242",
    date: "Mar 3, 2025",
    description: "Gym Membership",
    category: "Health",
    amount: -29.99,
    status: "Completed",
  },
  {
    id: "T-1243",
    date: "Mar 1, 2025",
    description: "Rent Payment",
    category: "Housing",
    amount: -1200.0,
    status: "Completed",
  },
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter
      const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

  // Get unique categories for filter
  const categories = ["all", ...new Set(transactions.map((t) => t.category))]
  const statuses = ["all", ...new Set(transactions.map((t) => t.status))]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View and manage all your transactions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A detailed list of all your recent transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "all" ? "All Statuses" : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                title={`Sort by date ${sortDirection === "asc" ? "newest first" : "oldest first"}`}
              >
                <ArrowDownUp className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === "Completed" ? "default" : "outline"}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right font-medium ${
                          transaction.amount < 0 ? "text-destructive" : "text-emerald-600 dark:text-emerald-500"
                        }`}
                      >
                        {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

