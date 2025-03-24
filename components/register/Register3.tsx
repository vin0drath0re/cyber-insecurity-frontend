"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  CircleAlert,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/components/register/UserProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// ✅ Define Validation Schema
const formSchema = z.object({
  street: z.string().min(4, { message: "Enter valid street name" }),
  zip: z.string().length(6, { message: "Enter valid ZIP Code" }),
  city: z.string(),
  state: z.string(),
});

export default function Register3() {
  const { user, updateUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ Initialize React Hook Form with Context API values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: user.street || "",
      zip: user.zip || "",
      city: user.city || "",
      state: user.state || "",
    },
  });

  // ✅ Sync React Hook Form with Context API
  useEffect(() => {
    const subscription = form.watch((values) => {
      updateUser("street", values.street);
      updateUser("zip", values.zip);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async(values: any) => {
    setIsLoading(true)
    updateUser("street", values.street);
    updateUser("zip", values.zip);
    updateUser("city", values.city);
    updateUser("state", values.state);

    console.log(user)
    
  };

  const backHandler = () => {
    updateUser("register1", false);
    updateUser("register2", true);
    updateUser("register3", false);
  };

  const pinFetch = async (zipcode: string) => {
    try {
      let response = await fetch(
        `https://api.postalpincode.in/pincode/${zipcode}`
      );
      let data = await response.json();
      if (data[0].Status === "Success") {
        updateUser("state", data[0].PostOffice[0].State);
        if (data[0].PostOffice[0].Block === "NA")
          updateUser("city", data[0].PostOffice[0].Region);
        else updateUser("city", data[0].PostOffice[0].Block);
      }
    } catch (error) {
      console.error("Error fetching PIN code data:", error);
    }
  };

  return (
    <Card
      className={`shadow-lg border-border border bg-card ${
        user.register3 ? "" : "hidden"
      }`}
    >
      <Button onClick={() => console.log(user)}>here</Button>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-primary">
          Create an Account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your information to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-10"
                        placeholder="Azad Nagar"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP Code</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-10"
                        placeholder="400001"
                        {...field}
                        value={field.value}
                        onChange={async (e) => {
                          field.onChange(e);
                          await pinFetch(e.target.value);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-10"
                        placeholder="Mumbai"
                        {...field}
                        value={user.city}
                        onChange={(e) => updateUser("city", e.target.value)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-10"
                        placeholder="Maharashtra"
                        {...field}
                        value={user.state}
                        onChange={(e) => updateUser("state", e.target.value)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button onClick={(e) => {
                  e.preventDefault();
                  backHandler();
                }} className="w-full" disabled={isLoading}>
                <ChevronLeft />
                Back
              </Button>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
                <ChevronRight />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
