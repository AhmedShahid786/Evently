import { getCategories } from "@/actions/categories";
import { getSubCategories } from "@/actions/sub-categories";
import { AddSubCategory } from "@/components/Add-Sub-Category/Add-Sub-Category";
import CategoryDropdown from "@/components/Category-Dropdown/Category-Dropdown";
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

export default async function SubCategories({searchParams}) {

  let subCategories = await getSubCategories(searchParams.category);
  subCategories = subCategories.subCategories

  const categories = (await getCategories()).categories
  return (
    <div className="min-h-screen mx-10 px-1">
      <div className="flex justify-between items-center my-4">
        <h1 className="font-bold text-xl">Sub Categories</h1>
        <CategoryDropdown categories={categories} />
        <AddSubCategory categories={categories} />
      </div>
      <Table>
        <TableCaption>A list of recent Sub Categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Thumbnail</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Location</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subCategories.map((subCategory) => (
            <TableRow key={subCategory.title}>
              <TableCell>
                <Image
                  src={
                    subCategory.thumbnail === "null"
                      ? "https://images.unsplash.com/photo-1633591324611-55ee4caa790f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3JlbmFkZXxlbnwwfHwwfHx8MA%3D%3D"
                      : subCategory.thumbnail
                  }
                  style={{ objectFit: "cover" }}
                  height={40}
                  width={40}
                  alt="subcategory thumbnail"
                />
              </TableCell>
              <TableCell className="font-medium">
                {subCategory.category.title}
              </TableCell>
              <TableCell>{subCategory.title}</TableCell>
              <TableCell>{subCategory.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
