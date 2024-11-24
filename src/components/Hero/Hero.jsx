import DotPattern from "../ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronRight, Github } from "lucide-react";

export default function Hero() {
  return (
    <main className="min-w-full min-h-[80dvh] flex flex-col justify-center items-center gap-8">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        )}
      />
      <h1 className="text-secondary text-9xl font-lilita tracking-wider inline-flex items-center justify-center">
        Evently
      </h1>
      <h3 className="text-white font-poppins text-3xl">
        Find, Join And Enjoy - The Evently Way!
      </h3>

      <div className="flex gap-4">
        <Button variant="secondary" size="lg">
          Join An Event <ChevronRight />
        </Button>
        <Button variant="outline" size="lg">
          Star On Github <Github />
        </Button>
      </div>
    </main>
  );
}
