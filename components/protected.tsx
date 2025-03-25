"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserData } from "@/components/context/UserContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuth } = UserData();
  const router = useRouter();
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    if (!isAuth && pathname !== "/login" && pathname !== "/register" && pathname !== "/") {
      router.replace("/login"); // Redirect unauthenticated users to login
    }
  }, [isAuth, pathname, router]);

  return <>{children}</>;
}
