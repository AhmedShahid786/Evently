import Image from "next/image";
import { googleLogo, logo } from "@/assets";
import LoginForm from "@/components/Login-Form/LoginForm";
import { Button } from "@/components/ui/button";
import { signIn } from "../../../auth";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-evenly">
      <div className="w-1/4 relative flex items-center justify-center">
        <Image src={logo} alt="Evently-Logo" objectFit="contain" />
      </div>
      <div className="w-1/4 flex flex-col items-center justify-center gap-2">
        <LoginForm />
        <p className="text-primary font-lilita text-xl tracking-wide">Or</p>

        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button variant="outline" className="text-base px-4">
            <Image src={googleLogo} alt="google-logo" width={25} height={25} />
            Login With Google
          </Button>
        </form>
        <p className="text-white font-poppins text-base border-t-2 border-primary py-1">
          Dont have an account?
          <Link
            href={"/signup"}
            className="ml-1 font-lilita tracking-wider text-primary cursor-pointer"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
