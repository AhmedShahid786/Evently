"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/users";
import { useState } from "react";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const signupSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password cannot exceed 20 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain an uppercase letter, a lowercase letter, a number, and a special character."
      ),
  });

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupUser = async (data) => {
    setLoading(true);
    let newUser = await registerUser(data);
    setLoading(false);
    router.push(`/verify/${newUser._id}`);
  };

  return (
    <Form {...form} className="w-full">
      <form onSubmit={form.handleSubmit(signupUser)} className="w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col my-3">
              <FormLabel className="text-primary font-lilita text-xl tracking-wide">
                Email
              </FormLabel>
              <FormControl>
                <input
                  {...field}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border-2 border-primary font-poppins bg-transparent text-sm text-white p-2 placeholder-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col my-3">
              <FormLabel className="text-primary font-lilita text-xl tracking-wide">
                Password
              </FormLabel>
              <FormControl>
                <input
                  {...field}
                  placeholder="Enter password"
                  className="rounded-lg border-2 border-primary font-poppins bg-transparent text-sm text-white p-2 placeholder-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="secondary"
          disabled={loading}
          className="w-full text-base"
        >
          Signup
        </Button>
      </form>
    </Form>
  );
}
