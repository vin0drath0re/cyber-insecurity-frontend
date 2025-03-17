"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Menu, Moon, Search, Sun, User, Wallet, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { useTheme } from "@/components/theme-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Navbar() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isAuthPage = pathname?.includes("/login") || pathname?.includes("/register")
  const isHomePage = pathname === "/"

  // Don't show navbar on auth pages
  if (isAuthPage) return null

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log("Searching for:", searchQuery)
    setIsSearchOpen(false)
  }

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b ${isHomePage ? "bg-transparent border-transparent" : "bg-background border-border"}`}
    >
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {!isHomePage && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 bg-sidebar">
                <div className="h-full flex flex-col">
                  <div className="p-6 border-b border-sidebar-border">
                    <div className="flex items-center gap-2">
                      <SheetHeader><SheetTitle><Wallet className="h-6 w-6 text-primary" />
                      <span className="font-bold text-xl">SafeXBank</span></SheetTitle></SheetHeader>
                      
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto py-2">
                    <nav className="grid gap-1 px-2">
                      <Link
                        href="/dashboard"
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                          pathname === "/dashboard"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/transactions"
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                          pathname === "/transactions"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        Transactions
                      </Link>
                      <Link
                        href="/payees"
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                          pathname === "/payees"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        Payees
                      </Link>
                      <Link
                        href="/history"
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                          pathname === "/history"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        History
                      </Link>
                      <Link
                        href="/profile"
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                          pathname === "/profile"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        Profile
                      </Link>
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}

          <Link href="/" className="flex items-center gap-2">
            <Wallet className={`h-6 w-6 ${isHomePage ? "text-white" : "text-primary"}`} />
            <span className={`font-bold text-xl ${isHomePage ? "text-white" : ""}`}>SafeXBank</span>
          </Link>

          {!isHomePage && (
            <nav className="hidden md:flex items-center gap-6 ml-6">
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/transactions"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/transactions" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Transactions
              </Link>
              <Link
                href="/payees"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/payees" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Payees
              </Link>
              <Link
                href="/investments"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/payees" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                investments
              </Link>
              <Link
                href="/history"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/history" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                History
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isHomePage && (
            <>
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="relative hidden md:flex">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-[200px] pr-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex"
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}

              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                {isMounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  3
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/login">Sign out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {isHomePage && (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" className="text-white hover:bg-white/10">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="bg-white text-purple-700 hover:bg-gray-100">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

