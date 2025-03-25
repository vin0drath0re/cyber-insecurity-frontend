"use client"

import axios from "axios";
import { useEffect, useState } from "react"
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
import { UserData } from "@/components/context/UserContext"
import { accounts } from '@/data/mockData';

import PaymentModal from "@/components/modals/PaymentModal"
import { useRouter } from "next/navigation"

export default function PayeesPage() {
  // State management
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddPayeeOpen, setIsAddPayeeOpen] = useState(false)
  const [isEditPayeeOpen, setIsEditPayeeOpen] = useState(false)
  const [newPayee, setNewPayee] = useState({
    name: "",
    payeeAccNo: "",
    ifsc: "",
    payeeType: "OTHERS"
  })
  const [editPayee, setEditPayee] = useState({
    payeeAccNo: "",
    name: "",
    ifsc: "",
    payeeType: "OTHERS"
  })
   // Context functions
   const {
    fetchPayees,
    AddPayeeById,
    EditPayee,
    DeletePayee,
    CheckPayeeName,
    PayeeName,
    payees,
    addPayee,
    isAuth
  } = UserData()

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [payeeAccNo, setPayeeAccNo] = useState("")

 
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

  const payerCustomerId = "e48d6144-972e-4572-b6fa-747a22d814d3"

  // Initial data fetch
  useEffect(() => {
    fetchPayees(payerCustomerId)
  }, [])

  // Filter payees based on search term
  const filteredPayees = payees.filter(
    (payee) =>
      payee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payee.payeeAccNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payee.payeeType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle adding a new payee
  const handleAddPayee = async () => {
    if (newPayee.name && newPayee.payeeAccNo && newPayee.ifsc) {
      try {
        await AddPayeeById(payerCustomerId, newPayee.name, newPayee.ifsc, newPayee.payeeAccNo, newPayee.payeeType)
        setNewPayee({
          name: "",
          payeeAccNo: "",
          payeeType: "OTHERS",
          ifsc: ""
        })
        setIsAddPayeeOpen(false)
        fetchPayees(payerCustomerId) // Refresh the payees list
      } catch (error) {
        console.error("Error adding payee:", error)
      }
    }
  }

  // Handle editing a payee
  const handleEditPayee = async (updatedPayee: { name: string; payeeAccNo: string; ifsc: string; payeeType: string }) => {
    try {
      await EditPayee(payerCustomerId, updatedPayee.name, updatedPayee.ifsc, updatedPayee.payeeAccNo, updatedPayee.payeeType)
      fetchPayees(payerCustomerId) // Refresh the payees list
      setIsEditPayeeOpen(false)
    } catch (error) {
      console.error("Error editing payee:", error)
    }
  }

  // Handle deleting a payee
  const handleDeletePayee = async (payeeAccNo: string) => {
    try {
      await DeletePayee(payerCustomerId, payeeAccNo)
      fetchPayees(payerCustomerId)
    } catch (error) {
      console.error("Error deleting payee:", error)
    }
  }

  const handleCheckPayeeName = async (payeeAccNo: string, payeeifsc: string, event: React.MouseEvent) => {
    event.preventDefault()
    try {
       
      await CheckPayeeName(payeeAccNo, payeeifsc) 
    } catch (error) {
      console.error("Error checking payee name:", error)
    }
  }

  const handlePayment = async (fromId: string, toId: string, amount: number) => {


    interface TransactionResponse {
      success: boolean;
      message: string;
      data?: any; // Replace `any` with the actual structure of the response data if known
    }

    const response = await axios.post<TransactionResponse>(
      "http://localhost:5000/transactions",
      {
        data: {
          senderAccNo: fromId,
          receiverAccNo: toId,
          amount,
          status: false,
          category: "OTHERS",
          transactionType: "PAYMENT"
        },
      }
    );

    console.log(response.data);


  }

  

  // Handle opening edit dialog
  const handleOpenEditDialog = (payee: any) => {
    setEditPayee({
      payeeAccNo: payee.payeeAccNo,
      name: payee.name,
      ifsc: payee.payeeifsc,
      payeeType: payee.payeeType
    })
    setIsEditPayeeOpen(true)
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
                {PayeeName ? (
                   <p className="ml-1 text-sm text-black">Banking Name : <span className="text-violet-600 font-semibold">{PayeeName}</span></p>
                ):(
                  <p className="text-red-500"></p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="payeeAccNo">Account Number</Label>
                <Input
                  id="payeeAccNo"
                  value={newPayee.payeeAccNo}
                  onChange={(e) => setNewPayee({ ...newPayee, payeeAccNo: e.target.value })}
                  placeholder="Enter account number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ifsc">IFSC Code</Label>
                <Input
                  id="ifsc"
                  value={newPayee.ifsc}
                  onChange={(e) => setNewPayee({ ...newPayee, ifsc: e.target.value })}
                  placeholder="Enter account number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="payeeType">Payee Type</Label>
                <Select value={newPayee.payeeType} onValueChange={(value) => setNewPayee({ ...newPayee, payeeType: value })}>
                  <SelectTrigger id="payeeType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SHOPPING">Shopping</SelectItem>
                    <SelectItem value="ENTERTAINMENT">Entertainment</SelectItem>
                    <SelectItem value="HOUSING">Housing</SelectItem>
                    <SelectItem value="FOOD">Food</SelectItem>
                    <SelectItem value="OTHERS">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="flex flex-wrap gap-2">
                <Button onClick={(e) => handleCheckPayeeName(newPayee.payeeAccNo, newPayee.ifsc, e)} variant="outline">Check Payee Name</Button>
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
                <Card key={payee.payeeAccNo} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback
                          className={
                            payee.payeeType === "Other"
                              ? "bg-blue-500"
                              : payee.payeeType === "Housing"
                              ? "bg-green-500"
                              : payee.payeeType === "Financial"
                              ? "bg-purple-500"
                              : "bg-orange-500"
                          }
                        >
                          {payee.payeeType === "Other" || payee.payeeType === "Housing" ? (
                            <Building className="h-4 w-4 text-white" />
                          ) : (
                            <User className="h-4 w-4 text-white" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{payee.name}</CardTitle>
                        <CardDescription className="text-xs"> {"**** **** " + payee.payeeAccNo.slice(-4)}</CardDescription>
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
                        <DropdownMenuItem onClick={() => handleOpenEditDialog(payee)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit Payee</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeletePayee(payee.payeeAccNo)}
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
                        <p className="font-medium ">{payee.payeeType.charAt(0).toUpperCase() + payee.payeeType.slice(1).toLowerCase()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Payment</p>
                        <p className="font-medium">N/A</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Last Amount</p>
                        <p className="font-medium">N/A</p>
                      </div>
                    </div>
                    <Button className="w-full mt-4" onClick={()=>{setShowPaymentModal(true);
                      setPayeeAccNo(payee.payeeAccNo);
                    }}>Pay Now</Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditPayeeOpen} onOpenChange={setIsEditPayeeOpen}>
        <DialogTrigger asChild>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Payee</DialogTitle>
            <DialogDescription>Edit the details of the selected payee.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Payee Name</Label>
              <Input
                id="edit-name"
                value={editPayee.name}
                onChange={(e) => setEditPayee({ ...editPayee, name: e.target.value })}
                placeholder="Enter payee name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-payeeAccNo">Account Number</Label>
              <Input
                id="edit-payeeAccNo"
                value={editPayee.payeeAccNo}
                disabled
                placeholder="Account number cannot be changed"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-ifsc">IFSC Code</Label>
              <Input
                id="edit-ifsc"
                value={editPayee.ifsc}
                disabled
                placeholder="IFSC code cannot be changed"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-payeeType">Payee Type</Label>
              <Select 
                value={editPayee.payeeType} 
                onValueChange={(value) => setEditPayee({ ...editPayee, payeeType: value })}
              >
                <SelectTrigger id="edit-payeeType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SHOPPING">Shopping</SelectItem>
                  <SelectItem value="ENTERTAINMENT">Entertainment</SelectItem>
                  <SelectItem value="HOUSING">Housing</SelectItem>
                  <SelectItem value="FOOD">Food</SelectItem>
                  <SelectItem value="OTHERS">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {setIsEditPayeeOpen(false);}}>
              Cancel
            </Button>
            <Button onClick={() => handleEditPayee(editPayee)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <PaymentModal
      isOpen={showPaymentModal}
              onClose={() => setShowPaymentModal(false)}
              accounts={accounts}
              onPayment={handlePayment}
              payeeAccNo={payeeAccNo}
      ></PaymentModal>
    </div>
  )
}