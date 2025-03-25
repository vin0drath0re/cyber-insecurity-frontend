"use client";

import type React from "react";
import Register1 from "@/components/register/Register1";
import Register2 from "@/components/register/Register2";
import Register3 from "@/components/register/Register3";
import { UserProvider } from "@/components/context/UserProvider";
import { useUser } from "@/components/context/UserProvider";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function RegisterPage() {

  const {user} = useUser();
  const checkHandler = async()=>{
    const response = (await axios.get("http://localhost:5000/")).data
    console.log(response)
  }

  return (
    <UserProvider>
      <Button onClick={() => {checkHandler()}}>check server</Button>
      <Register1 />
      <Register2 />
      <Register3 />
    </UserProvider>
  );
}
