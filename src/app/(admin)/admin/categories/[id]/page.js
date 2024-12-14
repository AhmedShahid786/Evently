import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSingleCategory } from "@/actions/categories";
import { Trash } from "lucide-react";

export default async function CategoryDetailsPage({ params }) {
  const category = await getSingleCategory(params.id);
  console.log(category);

  if (!category) redirect("not-found");

  return (
    <div className="min-h-screen bg-black p-6">
      <Card className="max-w-3xl mx-auto bg-black">
        <CardHeader>
          <div className="relative w-full h-64 mb-4">
            <Image
              src={category?.thumbnail}
              alt={category?.title}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
          <CardTitle className="text-3xl font-lilita text-primary tracking-wider">
            {category?.title}
          </CardTitle>
          <CardDescription className="text-white font-poppins">
            {category?.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col">
          <form className="w-full mb-2">
            <Button type="submit" variant="secondary">
              <span className="flex">
                Delete
                <Trash className="mr-2 h-4 w-4" />
              </span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
