import Hero from "@/components/Hero/Hero";
import { auth, signOut } from "../../auth";
import PopularEvents from "@/components/Popular Events/PopularEvents";
import KeyFeatures from "@/components/Key-Features/KeyFeatures";
import Footer from "@/components/Footer/Footer";
import HowItWorks from "@/components/How-It-Works/HowItWorks";

export default async function Home() {
  const session = await auth();
  return (
    <main className="w-full px-6">
      <Hero />
      <section className="mt-12">
        <PopularEvents />
      </section>
      <section className="mt-48">
        <HowItWorks />
      </section>
      <section className="mt-48">
        <KeyFeatures />
      </section>
      <section className="mt-72">
        <Footer />
      </section>
    </main>
  );
}
