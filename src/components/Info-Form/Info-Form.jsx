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
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function InfoForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const infoSchema = z.object({
    fullname: z
      .string()
      .min(1, "Please enter your fullname")
      .max(20, "Fullname cannot exceed 20 characters"),
    bio: z
      .string()
      .min(1, "Please enter your bio.")
      .max(500, "Bio cannot exceed 20 characters"),
    country: z.string(),
    city: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      fullname: "",
      bio: "",
      country: "",
      city: "",
    },
  });

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://api.first.org/data/v1/countries");
        const result = await response.json();
        console.log("result =>", result);

        const countriesArray = Object.entries(result.data); // Convert object to array
        setCountries(countriesArray);
        console.log(countries);
      } catch (error) {
        console.error("Error fetching countries:", error.message);
      }
    };

    fetchCountries();
  }, []); // Empty dependency array ensures this runs only once

  const updateUserInfo = async (data) => {
    console.log(data);
  };

  return (
    <Form {...form} className="w-full">
      <form onSubmit={form.handleSubmit(updateUserInfo)} className="w-full">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col my-3">
              <FormLabel className="text-primary font-lilita text-xl tracking-wide">
                Fullname
              </FormLabel>
              <FormControl>
                <input
                  {...field}
                  placeholder="eg. Ahmed Raza"
                  className="w-full rounded-lg border-2 border-primary font-poppins bg-transparent text-sm text-white p-2 placeholder-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col my-3">
              <FormLabel className="text-primary font-lilita text-xl tracking-wide">
                Bio
              </FormLabel>
              <FormControl>
                <input
                  {...field}
                  placeholder="eg. I'm a freelancer"
                  className="rounded-lg border-2 border-primary font-poppins bg-transparent text-sm text-white p-2 placeholder-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col my-3">
              <FormLabel className="text-primary font-lilita text-xl tracking-wide">
                Country
              </FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-[180px] border-2 border-primary text-white font-poppins">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-primary text-white font-poppins bg-transparent">
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value={"All"}>All</SelectItem>
                      {/* {countries.entries(countries)?.map(([code, data]) => (
                        <SelectItem key={code} value={code}>
                          {data.country}
                        </SelectItem>
                      ))} */}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
