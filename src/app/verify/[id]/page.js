import Image from "next/image";
import OtpForm from "@/components/Otp-Form/OtpForm";
import { logo } from "@/assets";
import { getSingleUser } from "@/actions/users";
import { redirect } from "next/navigation";

export default async function Verify({ params }) {
  const { success, user } = await getSingleUser(params.id, {
    cache: "no-store",
  });

  if (!success) redirect("/not-found");

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-evenly">
      <div className="w-1/4 relative flex items-center justify-center">
        <Image src={logo} alt="Evently-Logo" objectFit="contain" />
      </div>
      <div className="w-1/4 flex flex-col items-center justify-center gap-2">
        <OtpForm id={user._id} email={user.email} />
      </div>
    </div>
  );
}
