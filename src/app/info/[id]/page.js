import Image from "next/image";
import { logo } from "@/assets";
import InfoForm from "@/components/Info-Form/Info-Form";

export default function Info() {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-evenly">
      <div className="w-1/4 relative flex items-center justify-center">
        <Image src={logo} alt="Evently-Logo" objectFit="contain" />
      </div>
      <div className="w-1/4 flex flex-col items-center justify-center gap-2">
        <InfoForm />
        <p className="text-primary font-lilita text-xl tracking-wide">Or</p>
      </div>
    </div>
  );
}
