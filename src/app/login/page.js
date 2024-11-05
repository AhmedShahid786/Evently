import { Image } from "lucide-react";
import { auth, signIn, signOut } from "../../../auth";

export default async function SignIn() {
    const session = await auth()
    console.log("Session =>", session);
    
  return (
    <div className="mx-auto">
      {session ? (
        <div className="flex flex-col gap-12 items-center justify-between">
          <img
            src={session?.user?.image}
            width={10}
            height={10}
            className="mt-2 w-full rounded-lg border border-gray-300 min-h-32"
          />
          <p>{session?.user?.email}</p>
          <p>{session?.user?.name}</p>
          <form
            action={async () => {
              "use server";
              await signOut("google");
            }}
          >
            <button type="submit">Signout</button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-12 items-center justify-between">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button type="submit">Signin with Google</button>
          </form>
        </div>
      )}
    </div>
  );
}
