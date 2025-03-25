import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { UserContextProvider, UserData } from "@/components/context/UserContext";
import ProtectedRoute from "@/components/protected";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SafeXBank - Modern Banking",
  description: "Manage your finances with ease",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <UserContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ProtectedRoute>
            {children}
            </ProtectedRoute>
          </ThemeProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
