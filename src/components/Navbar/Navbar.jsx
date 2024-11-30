import { Button } from "../ui/button";
import { logo } from "@/assets";
import Image from "next/image";
import { auth } from "../../../auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default async function Navbar() {
  const session = await auth();
  const AvatarFallbackText = session?.user.name.split(" ");
  console.log(AvatarFallbackText);

  return (
    <nav className="flex items-center justify-between px-6">
      <div>
        <Image src={logo} width={120} height={20} />
      </div>

      {session ? (
        <div className="flex gap-2 py-3 items-center">
          <p className="text-primary font-poppins text-sm opacity-95">
            {session?.user?.name}
          </p>
          <Avatar>
            <AvatarImage
              src={session?.user?.image}
              className="border-2 border-primary rounded-full"
            />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div className="flex gap-2 py-3">
          <Button variant="outline">Login</Button>
          <Button variant="secondary"> Sign Up</Button>
        </div>
      )}
    </nav>
  );
}
