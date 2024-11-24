import Hero from "@/components/Hero/Hero";
import { auth, signOut } from "../../auth";
import PopularEvents from "@/components/Popular Events/PopularEvents";

export default async function Home() {
  const session = await auth();
  return (
    <main className="w-full px-6">
      <Hero />
      <PopularEvents />
    </main>
  );
}
