import { resend } from "@/lib/resend";
import VerificationEmail from "@/components/Verification-Email/VerificationEmail";

export async function sendVerificationEmail(email, otp) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Evently OTP Code",
      react: <VerificationEmail otp={otp} />,
    });

    return { ok: true, message: "Verification email sent successfully" };
  } catch (err) {
    console.error("Error sending verification email =>", err);
    return { ok: false, message: "Failed to send verification email" };
  }
}
