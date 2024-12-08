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

export default function LoginForm() {
  const loginSchema = z.object({
    username: z.string(),
    password: z.number(),
  });
  const form = useForm({
    resolver: zodResolver,
    defaultValues: {
      usernname: "",
      password: "",
    },
  });

  return (
    <Form {...form} className="w-full border-2 border-primary">
      <form>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col my-3">
              <FormLabel className="text-primary font-lilita text-xl tracking-wide">
                Username
              </FormLabel>
              <FormControl>
                <input
                  {...field}
                  placeholder="Your username"
                  className="rounded-lg border-2 border-primary font-poppins bg-transparent text-base text-white py-1 px-2 placeholder-white"
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
                  placeholder="Your password"
                  className="rounded-lg border-2 border-primary font-poppins bg-transparent text-base text-white py-1 px-2 placeholder-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" className="w-full text-base">
          Login
        </Button>
      </form>
    </Form>
  );
}
