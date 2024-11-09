  import { auth, signOut } from "../../auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="min-h-screen min-w-screen flex flex-col gap-12 justify-center items-center">
      <h1 className="font-bold text-3xl text-center">Find Your Friend</h1>
      {session ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit">Sign Out</Button>
        </form>
      ) : (
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}
