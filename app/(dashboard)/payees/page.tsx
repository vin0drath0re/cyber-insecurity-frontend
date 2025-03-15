"use client"

import { useState } from "react"
import { Building, Check, Edit, MoreHorizontal, Plus, Search, Trash, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Sample payees data
const initialPayees = [
  {
    id: "P-1234",
    name: "Electric Company",
    accountNumber: "AC-98765432",
    type: "Utility",
    lastPayment: "Mar 8, 2025",
    amount: 85.75,
    isFrequent: true,
  },
  {
    id: "P-1235",
    name: "Mortgage Lender",
    accountNumber: "ML-12345678",
    type: "Housing",
    lastPayment: "Mar 1, 2025",
    amount: 1200.0,
    isFrequent: true,
  },
  {
    id: "P-1236",
    name: "Internet Provider",
    accountNumber: "IP-56781234",
    type: "Utility",
    lastPayment: "Mar 5, 2025",
    amount: 65.0,
    isFrequent: true,
  },
  {
    id: "P-1237",
    name: "Cell Phone Company",
    accountNumber: "CP-43218765",
    type: "Utility",
    lastPayment: "Mar 10, 2025",
    amount: 95.5,
    isFrequent: true,
  },
  {
    id: "P-1238",
    name: "Insurance Provider",
    accountNumber: "INS-87654321",
    type: "Insurance",
    lastPayment: "Mar 15, 2025",
    amount: 150.25,
    isFrequent: true,
  },
  {
    id: "P-1239",
    name: "Credit Card Company",
    accountNumber: "CC-12348765",
    type: "Financial",
    lastPayment: "Mar 20, 2025",
    amount: 350.0,
    isFrequent: true,
  },
  {
    id: "P-1240",
    name: "Gym Membership",
    accountNumber: "GM-87651234",
    type: "Health",
    lastPayment: "Mar 3, 2025",
    amount: 29.99,
    isFrequent: false,
  },
  {
    id: "P-1241",
    name: "Streaming Service",
    accountNumber: "SS-43215678",
    type: "Entertainment",
    lastPayment: "Mar 15, 2025",
    amount: 14.99,
    isFrequent: false,
  },
]

export default function PayeesPage() {
  const [payees, setPayees] = useState(initialPayees)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddPayeeOpen, setIsAddPayeeOpen] = useState(false)
  const [newPayee, setNewPayee] = useState({
    name: "",
    accountNumber: "",
    type: "Utility",
  })

  // Filter payees based on search term
  const filteredPayees = payees.filter(
    (payee) =>
      payee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payee.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payee.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle adding a new payee
  const handleAddPayee = () => {
    if (newPayee.name && newPayee.accountNumber && newPayee.type) {
      const id = `P-${Math.floor(Math.random() * 10000)}`
      setPayees([
        ...payees,
        {
          id,
          ...newPayee,
          lastPayment: "N/A",
          amount: 0,
          isFrequent: false,
        },
      ])
      setNewPayee({
        name: "",
        accountNumber: "",
        type: "Utility",
      })
      setIsAddPayeeOpen(false)
    }
  }

  // Handle deleting a payee
  const handleDeletePayee = (id: string) => {
    setPayees(payees.filter((payee) => payee.id !== id))
  }

  // Handle marking a payee as frequent
  const handleToggleFrequent = (id: string) => {
    setPayees(payees.map((payee) => (payee.id === id ? { ...payee, isFrequent: !payee.isFrequent } : payee)))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payees</h1>
          <p className="text-muted-foreground">Manage your payees and make payments.</p>
        </div>
        <Dialog open={isAddPayeeOpen} onOpenChange={setIsAddPayeeOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Payee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Payee</DialogTitle>
              <DialogDescription>Enter the details of the payee you want to add.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Payee Name</Label>
                <Input
                  id="name"
                  value={newPayee.name}
                  onChange={(e) => setNewPayee({ ...newPayee, name: e.target.value })}
                  placeholder="Enter payee name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={newPayee.accountNumber}
                  onChange={(e) =>
                    setNewPayee({
                      ...newPayee,
                      accountNumber: e.target.value,
                    })
                  }
                  placeholder="Enter account number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Payee Type</Label>
                <Select value={newPayee.type} onValueChange={(value) => setNewPayee({ ...newPayee, type: value })}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Utility">Utility</SelectItem>
                    <SelectItem value="Housing">Housing</SelectItem>
                    <SelectItem value="Financial">Financial</SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddPayeeOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPayee}>Add Payee</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Payees</CardTitle>
          <CardDescription>View and manage all your saved payees.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search payees..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPayees.length === 0 ? (
              <div className="md:col-span-2 lg:col-span-3 text-center py-8">
                <p className="text-muted-foreground">No payees found.</p>
              </div>
            ) : (
              filteredPayees.map((payee) => (
                <Card key={payee.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback
                          className={
                            payee.type === "Utility"
                              ? "bg-blue-500"
                              : payee.type === "Housing"
                                ? "bg-green-500"
                                : payee.type === "Financial"
                                  ? "bg-purple-500"
                                  : "bg-orange-500"
                          }
                        >
                          {payee.type === "Utility" || payee.type === "Housing" ? (
                            <Building className="h-4 w-4 text-white" />
                          ) : (
                            <User className="h-4 w-4 text-white" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{payee.name}</CardTitle>
                        <CardDescription className="text-xs">{payee.accountNumber}</CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleToggleFrequent(payee.id)}>
                          {payee.isFrequent ? (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              <span>Frequent Payee</span>
                            </>
                          ) : (
                            <span>Mark as Frequent</span>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit Payee</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeletePayee(payee.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete Payee</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-medium">{payee.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Payment</p>
                        <p className="font-medium">{payee.lastPayment}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Last Amount</p>
                        <p className="font-medium">{payee.amount > 0 ? `$${payee.amount.toFixed(2)}` : "N/A"}</p>
                      </div>
                    </div>
                    <Button className="w-full mt-4">Pay Now</Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

