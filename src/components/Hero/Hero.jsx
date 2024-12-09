import { Button } from "../ui/button";
import { ChevronRight, Github } from "lucide-react";
import dynamic from "next/dynamic";

export default function Hero() {
  const Particles = dynamic(() => import("../ui/particles.jsx"), { ssr: false });
  return (
    <main className="min-w-full min-h-[80dvh] flex flex-col justify-center items-center gap-8">
      <Particles />
      <h1 className="text-primary text-9xl font-lilita tracking-wider inline-flex items-center justify-center">
        Evently
      </h1>
      <h3 className="text-white font-poppins text-3xl">
        Find, Join And Enjoy - The Evently Way!
      </h3>

      <Button variant="secondary" size="lg">
        Join An Event <ChevronRight />
      </Button>

      <div className="w-full flex items-center justify-start gap-4 px-6">
        <div className="border-r-2 border-r-primary/90 pr-3">
          <h3 className="text-primary text-2xl font-lilita">100+</h3>
          <p className="text-white text-sm font-poppins">Live events</p>
        </div>
        <div>
          <h3 className="text-primary text-2xl font-lilita">20+</h3>
          <p className="text-white text-sm font-poppins">
            Exciting Communities
          </p>
        </div>
      </div>
    </main>
  );
}
