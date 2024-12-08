import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";

export default function EventCard({ event }) {
  const { _id, category, title, description, thumbnail, address } = event;
  return (
    <div className="w-60 flex flex-col items-start justify-between gap-1 p-2 border-2 border-primary rounded-lg">
      <div>
        <h1 className="text-primary text-xl font-lilita tracking-wide">
          {title}
        </h1>
        <p className="text-white text-sm opacity-90 font-poppins">
          {category.title}
        </p>
      </div>
      <div className="h-40 w-full relative my-1">
        <Image
          src={thumbnail}
          alt="Event Thumbnail"
          fill
          className="rounded-lg"
        />
      </div>
      <p className="text-primary text-xs font-sans inline-flex items-center justify-center gap-1">
        <span>
          <MapPin size={16} />
        </span>
        <span className="line-clamp-1">{address}</span>
      </p>
      <h3 className="text-white font-poppins text-sm text-left line-clamp-2">
        {description}
      </h3>
      <Link href={`/events/${_id}`} className="w-full">
        <Button variant="secondary" className="w-full text-base">
          Explore
        </Button>
      </Link>
    </div>
  );
}
