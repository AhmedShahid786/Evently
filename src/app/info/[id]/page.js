import Image from "next/image";
import { logo } from "@/assets";
import InfoForm from "@/components/Info-Form/Info-Form";
import { getSingleUser } from "@/actions/users";
import { redirect } from "next/navigation";

export default async function Info({ params }) {
  const { success } = await getSingleUser(params.id, {
    cache: "no-store",
  });

  if (!success) redirect("/not-found");
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-evenly">
      <div className="w-1/4 relative flex items-center justify-center">
        <Image src={logo} alt="Evently-Logo" objectFit="contain" />
      </div>
      <div className="w-1/4 flex flex-col items-center justify-center gap-2">
        <InfoForm userId={params.id} />
      </div>
    </div>
  );
}
