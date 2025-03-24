"use client";

import type React from "react";
import Register1 from "@/components/register/Register1";
import Register2 from "@/components/register/Register2";
import Register3 from "@/components/register/Register3";
import { UserProvider } from "@/components/register/UserProvider";
import { useUser } from "@/components/register/UserProvider";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {

  const {user} = useUser();

  return (
    <UserProvider>
      <Register1 />
      <Register2 />
      <Register3 />
    </UserProvider>
  );
}
