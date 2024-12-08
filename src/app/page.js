import Hero from "@/components/Hero/Hero";
import PopularEvents from "@/components/Popular Events/PopularEvents";
import KeyFeatures from "@/components/Key-Features/KeyFeatures";
import Footer from "@/components/Footer/Footer";
import HowItWorks from "@/components/How-It-Works/HowItWorks";
import Navbar from "@/components/Navbar/Navbar";

export default async function Home() {
  return (
    <main className="w-full">
      <nav>
        <Navbar />
      </nav>

      <div className="px-6">
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
      </div>
    </main>
  );
}
