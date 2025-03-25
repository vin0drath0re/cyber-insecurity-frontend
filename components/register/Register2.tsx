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
  ChevronRight,
  ChevronLeft,
  CalendarIcon,
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
import { useUser } from "@/components/context/UserProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


// Import ShadCN date picker components
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const currentDate = dayjs();


// ✅ Define Validation Schema
const formSchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/, { message: "Enter valid Phone No" }), // Phone number validation
  dob: z
    .date({ required_error: "Enter valid DOB" })
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Enter valid DOB",
    }),

  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
    message: "Enter valid PAN (e.g., ABCDE1234K)",
  }),

});

export default function Register2() {
  const { user, updateUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Initialize React Hook Form with Context API values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: user.phone || "",
      dob: user.dob ? new Date(user.dob) : undefined, // Use undefined as default instead of current date
      pan: user.pan || "",
      customerType: user.customerType,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "customerType") {
        updateUser("customerType", value.customerType);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateUser]);

  // ✅ Handle Form Submission
  const onSubmit = (values: any) => {
    updateUser("phone", values.phone);
    updateUser("pan", values.pan);
    updateUser("dob", values.dob);
    updateUser("customerType", values.customerType);
    updateUser("register1", false);
    updateUser("register2", false);
    updateUser("register3", true);
  };

  const backHandler = () => {
    updateUser("register1", true);
    updateUser("register2", false);
    updateUser("register3", false);
  };

  return (
    <Card
      className={`shadow-lg border-border border bg-card ${
        user.register2 ? "" : "hidden"
      }`}
    >
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-primary">
          Enter Details
        </CardTitle>
        <CardDescription className="text-center">
          Enter additional information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                      required
                        type="tel"
                        className="pl-10"
                        placeholder="9876543210"
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
              name="customerType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <FormControl>
                    <Select required onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Account Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                          <SelectItem value="SHOPPING">Shopping</SelectItem>
                          <SelectItem value="ENTERTAINMENT">
                            Entertainment
                          </SelectItem>
                          <SelectItem value="HOUSING">Housing</SelectItem>
                          <SelectItem value="FOOD">Food</SelectItem>
                          <SelectItem value="OTHERS">Others</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth with ShadCN DatePicker */}
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">

                  <FormLabel>{user.customerType === "INDIVIDUAL" ? "" : "Owner's "}Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          type="button" // Important: Prevent form submission
                          onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          // Optional: Close popover on date selection
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PAN Number */}
            <FormField
              control={form.control}
              name="pan"
              render={({ field }) => (
                <FormItem>

                  <FormLabel>
                    {user.customerType === "INDIVIDUAL" ? "" : "Owner's "}PAN no
                  </FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                      required
                        className="pl-10"
                        placeholder="ABCDE1234K"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.toUpperCase())
                        }
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  backHandler();
                }}
                className="w-full"
                disabled={isLoading}
                variant="outline"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="submit" className="w-full" disabled={isLoading}>
                Proceed
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
