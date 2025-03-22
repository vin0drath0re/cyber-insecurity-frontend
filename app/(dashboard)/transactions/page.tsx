"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowUp,
  CalendarIcon,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

// Sample transaction history data
const transactionHistory = Array.from({ length: 50 }, (_, i) => {
  const types = ["Deposit", "Withdrawal", "Transfer"];
  const categories = [
    "People",
    "Shopping",
    "Entertainment",
    "Housing",
    "Food",
    "Other",
  ];
  const descriptions = [
    "Salary Deposit",
    "Grocery Store",
    "Electric Bill",
    "Netflix Subscription",
    "Gas Station",
    "Rent Payment",
    "Amazon Purchase",
    "Phone Bill",
    "Restaurant Payment",
    "Gym Membership",
    "Insurance Premium",
  ];
  const statuses = ["Completed", "Pending", "Failed"];

  const date = new Date();
  date.setDate(date.getDate() - i);

  const type = types[Math.floor(Math.random() * types.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const description =
    descriptions[Math.floor(Math.random() * descriptions.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const amount =
    type === "Deposit" || type === "Refund"
      ? Math.random() * 1000 + 10
      : -(Math.random() * 500 + 10);

  return {
    id: `TH-${1000 + i}`,
    date: format(date, "MMM dd, yyyy"),
    type,
    category,
    description,
    amount,
    status,
    reference: `REF-${Math.floor(Math.random() * 1000000)}`,
  };
});

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter transactions
  const filteredTransactions = transactionHistory.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    const matchesCategory =
      categoryFilter === "all" || transaction.category === categoryFilter;

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;

    const matchesDate =
      !date || transaction.date === format(date, "MMM dd, yyyy");

    return (
      matchesSearch &&
      matchesType &&
      matchesCategory &&
      matchesStatus &&
      matchesDate
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique types, categories, and statuses for filters
  const types = ["all", ...new Set(transactionHistory.map((t) => t.type))];
  const categories = [
    "all",
    ...new Set(transactionHistory.map((t) => t.category)),
  ];
  const statuses = ["all", ...new Set(transactionHistory.map((t) => t.status))];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Transaction History
          </h1>
          <p className="text-muted-foreground">
            View your complete transaction history.
          </p>
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px]">
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
                <SelectTrigger className="w-[140px]">
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
              {date && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setDate(undefined)}
                  title="Clear date filter"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {paginatedTransactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No transactions found.</p>
              </div>
            ) : (
              paginatedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2 sm:mb-0">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {transaction.type === "Deposit" ? (
                        <ArrowUp className="h-6 w-6 text-emerald-600" />
                      ) : transaction.type === "Withdrawal" ? (
                        <ArrowDown className="h-6 w-6 text-rose-600" />
                      ) : (
                        <ArrowLeftRight className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{transaction.description}</h4>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span>{transaction.date}</span>
                        <span>•</span>
                        <span>{transaction.reference}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex flex-col sm:items-end">
                      <span
                        className={`font-bold ${
                          transaction.amount > 0
                            ? "text-emerald-600 dark:text-emerald-500"
                            : "text-rose-600 dark:text-rose-500"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}$
                        {Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-center" style={{minWidth: "6.5rem"}}>
                      <Badge
                        variant={
                          transaction.status === "Completed"
                            ? "default"
                            : transaction.status === "Pending"
                            ? "outline"
                            : "destructive"
                        }
                        className="sm:ml-4 flex sm:justify-center">
                        <span>{transaction.category}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(Math.max(1, currentPage - 1));
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={pageNumber === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(pageNumber);
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        isActive={totalPages === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(totalPages);
                        }}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(Math.min(totalPages, currentPage + 1));
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
