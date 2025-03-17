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
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password cannot exceed 20 characters"),
  });
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernname: "",
      password: "",
    },
  });

  const loginUser = async (data) => {
    // const loginResult = await signIn("credentials", {
    //   redirect: false,
    //   email: data.email,
    //   password: data.password,
    // });
    // if (loginResult.error) {
    //   form.setError("password", {
    //     type: "manual",
    //     message: loginResult.error,
    //   });
    //   setLoading(false);
    // } else {
    //   console.log("Login successful", result);
    //   router.push("/");
    // }
  };

  return (
    <Form {...form} className="w-full">
      <form onSubmit={form.handleSubmit(loginUser)} className="w-full">
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
          disabled={loading}
          type="submit"
          variant="secondary"
          className="w-full text-base"
        >
          {loading ? (
            <>
              Verifying
              <Loader2 className="animate-spin mr-2" />
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
