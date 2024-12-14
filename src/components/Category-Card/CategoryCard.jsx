import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";

export default function CategoryCard({ category }) {
  const { _id, title, thumbnail } = category;
  return (
    <div className="w-60 flex flex-col items-start justify-between gap-1 p-2 border-2 border-primary rounded-lg">
      <div>
        <h1 className="text-primary text-xl font-lilita tracking-wide">
          {title}
        </h1>
      </div>
      <div className="h-40 w-full relative my-1">
        <Image
          src={thumbnail}
          alt="Category Thumbnail"
          fill
          className="rounded-lg"
        />
      </div>
      <Link href={`/admin/categories/${_id}`} className="w-full">
        <Button variant="secondary" className="w-full text-base">
          View
        </Button>
      </Link>
    </div>
  );
}
