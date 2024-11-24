import { Button } from "../ui/button";
import { logo } from "@/assets";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6">
      <div>
        <Image src={logo} width={120} height={20} />
      </div>

      <div className="flex gap-2 py-3">
        <Button variant="outline">Login</Button>
        <Button variant="secondary"> Sign Up</Button>
      </div>
    </nav>
  );
}
