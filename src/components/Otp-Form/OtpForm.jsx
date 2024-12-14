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
import { verifyUserOtp } from "@/actions/users";
import { Loader2 } from "lucide-react";

export default function OtpForm({ email, id }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const otpSchema = z.object({
    otp: z.string().regex(/^\d{6}$/, "Please enter a valid 6 digit OTP"),
  });

  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const verifyOtp = async (data) => {
    setLoading(true);

    const verificationObj = {
      id: id,
      otp: data.otp,
    };

    const validateOtpRes = await verifyUserOtp(verificationObj);

    if (validateOtpRes.success) {
      router.push(`/info/${validateOtpRes.user._id}`);
    } else {
      form.setError("otp", {
        message: validateOtpRes.err,
      });
    }
    setLoading(false);
  };
  return (
    <Form {...form} className="w-full">
      <form onSubmit={form.handleSubmit(verifyOtp)} className="w-full">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col my-3">
              <FormLabel className="text-primary font-lilita text-sm tracking-wide">
                We have sent a 6-digit otp to {email}. Please enter the OTP
                below to verify your account. The OTP will expire in 60 mins
              </FormLabel>
              <FormControl>
                <input
                  type="number"
                  {...field}
                  placeholder="Enter OTP"
                  className="rounded-lg border-2 border-primary font-poppins bg-transparent text-base text-white py-1 px-2 placeholder-white"
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
            "Verify"
          )}
        </Button>
      </form>
    </Form>
  );
}
