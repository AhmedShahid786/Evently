import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { AddCategory } from "@/components/Add-Category/Add-Category";
import { getCategories } from "@/actions/categories";

export default async function Categories() {
  let categories = await getCategories();
  categories = categories.categories;

  return (
    <div className="min-w-full min-h-full border-2 border-primary">
      <AddCategory />
    </div>
  );
}
