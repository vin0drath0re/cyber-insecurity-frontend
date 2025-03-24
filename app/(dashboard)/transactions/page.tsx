"use client";

import { useEffect, useState } from "react";
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
import { Transaction } from "@/types/Interface";
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

export default function HistoryPage() {
  const accountNo = "1837906204450";
  // All transactions fetched from API
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Error state
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [date, setDate] = useState<Date | undefined>(undefined);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Status mapping
  const mapping: Record<string, string> = {
    true: "completed",
    false: "pending",
  };

  // Fetch transactions only once when component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/byUserAcc/${accountNo}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAllTransactions(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to load transactions. Please try again later.");
        setAllTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter, categoryFilter, statusFilter, date]);

  // Filter transactions locally instead of fetching again
  const filteredTransactions = allTransactions.filter(
    (transaction: Transaction) => {
      // Safely handle undefined values
      const description = transaction.description || "";
      const category = transaction.category || "";
      const transactionType = transaction.transactionType || "";
      const status =
        transaction.status !== undefined ? transaction.status.toString() : "";
      const timestamp = transaction.timestamp
        ? new Date(transaction.timestamp)
        : new Date();

      const matchesSearch =
        description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        typeFilter === "all" || transactionType === typeFilter;

      const matchesCategory =
        categoryFilter === "all" || category === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        mapping[status] === statusFilter.toLowerCase();

      const matchesDate =
        !date ||
        format(timestamp, "MMM dd, yyyy") === format(date, "MMM dd, yyyy");

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesStatus &&
        matchesDate
      );
    }
  );

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique types, categories, and statuses for filters
  const types = [
    "all",
    ...Array.from(
      new Set(
        allTransactions
          .map((t: Transaction) => t.transactionType)
          .filter(Boolean)
      )
    ),
  ];

  const categories = [
    "all",
    ...Array.from(
      new Set(allTransactions.map((t) => t.category).filter(Boolean))
    ),
  ];

  const statuses = [
    "all",
    ...Array.from(
      new Set(
        allTransactions
          .map((t) =>
            t.status !== undefined ? mapping[t.status.toString()] : null
          )
          .filter(Boolean)
      )
    ),
  ];

  // Function to determine if account is sender or receiver
  const isAccountSender = (transaction: Transaction) => {
    return transaction.senderAccNo === accountNo;
  };
  const toSelf = (transaction: Transaction) => {
    if (transaction.transactionType === "TRANSFER") {
      return true;
    }
    return false;
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Transaction History
          </h1>
          <p className='text-muted-foreground'>
            View your complete transaction history.
          </p>
        </div>
        <div className='flex gap-2'>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline'>
                <CalendarIcon className='mr-2 h-4 w-4' />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant='outline'>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className='p-6'>
          <div className='flex flex-col sm:flex-row gap-4 mb-6'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search transactions...'
                className='pl-10'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='flex flex-wrap gap-2'>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className='w-[140px]'>
                  <SelectValue placeholder='Type' />
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
                <SelectTrigger className='w-[140px]'>
                  <SelectValue placeholder='Category' />
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
                <SelectTrigger className='w-[140px]'>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status?.toString() || ""}>
                      {status === "all" ? "All Statuses" : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {date && (
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setDate(undefined)}
                  title='Clear date filter'>
                  <Filter className='h-4 w-4' />
                </Button>
              )}
            </div>
          </div>

          <div className='space-y-4'>
            {isLoading ? (
              <div className='text-center py-8'>
                <p className='text-muted-foreground'>Loading transactions...</p>
              </div>
            ) : error ? (
              <div className='text-center py-8'>
                <p className='text-rose-500'>{error}</p>
                <Button
                  variant='outline'
                  className='mt-4'
                  onClick={() => {
                    setError(null);
                    setIsLoading(true);
                    fetch(`http://localhost:5000/api/byUserAcc/${accountNo}`)
                      .then((res) => res.json())
                      .then((data) => {
                        setAllTransactions(data || []);
                        setIsLoading(false);
                      })
                      .catch((err) => {
                        console.error(err);
                        setError("Failed to reload transactions.");
                        setIsLoading(false);
                      });
                  }}>
                  Try Again
                </Button>
              </div>
            ) : paginatedTransactions.length === 0 ? (
              <div className='text-center py-8'>
                <p className='text-muted-foreground'>No transactions found.</p>
              </div>
            ) : (
              paginatedTransactions.map((transaction) => {
                // Determine if logged-in account is sender or receiver
                const isSender = isAccountSender(transaction);
                const toself = toSelf(transaction);
                const amount = Math.abs(transaction.amount || 0);

                return (
                  <div
                    key={transaction.id}
                    className='flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-2 sm:mb-0'>
                      <div className='flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center'>
                        {toself ? (
                          <ArrowLeftRight className='h-6 w-6 text-emerald-600' />
                        ) : isSender ? (
                          <ArrowDown className='h-6 w-6 text-rose-600' />
                        ) : (
                          <ArrowUp className='h-6 w-6 text-emerald-600' />
                        )}
                      </div>
                      <div>
                        <h4 className='font-medium'>
                          {transaction.description}
                        </h4>
                        <div className='flex flex-wrap gap-2 text-sm text-muted-foreground'>
                          <span>
                            {transaction.timestamp
                              ? format(
                                  new Date(transaction.timestamp),
                                  "MMM dd, yyyy"
                                )
                              : "No date"}
                          </span>
                          <span>•</span>
                          <span>
                            {isSender ? "Sent to" : "Received from"}{" "}
                            {isSender
                              ? transaction.receiverAccount.customer.name ||
                                `Account #${transaction.receiverAccNo}`
                              : transaction.senderAccount.customer.name ||
                                `Account #${transaction.senderAccNo}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
                      <div className='flex flex-col sm:items-end'>
                        <span
                          className={`font-bold ${
                            isSender
                              ? "text-rose-600 dark:text-rose-500"
                              : "text-emerald-600 dark:text-emerald-500"
                          }`}>
                          {isSender ? "-" : "+"}${amount.toFixed(2)}
                        </span>
                      </div>
                      <div
                        className='flex justify-center'
                        style={{ minWidth: "6.5rem" }}>
                        <Badge
                          variant={
                            transaction.status !== undefined &&
                            mapping[transaction.status.toString()] ===
                              "completed"
                              ? "default"
                              : transaction.status !== undefined &&
                                mapping[transaction.status.toString()] ===
                                  "pending"
                              ? "outline"
                              : "destructive"
                          }
                          className='sm:ml-4 flex sm:justify-center'>
                          <span>{transaction.category}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {totalPages > 1 && (
            <Pagination className='mt-6'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href='#'
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
                        href='#'
                        isActive={pageNumber === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(pageNumber);
                        }}>
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
                        href='#'
                        isActive={totalPages === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(totalPages);
                        }}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                <PaginationItem>
                  <PaginationNext
                    href='#'
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
