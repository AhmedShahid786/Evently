import { AddSubCategory } from "@/components/add-sub-category";
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

const subCategories = [
  {
    title: "Cricket",
    category: "Sports",
    thumbnail:
      "https://images.unsplash.com/photo-1470920456752-d50214d7ed59?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3ljbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    description: "All Community Members will be have cycling Race",
  },
  {
    title: "Footbal",
    category: "Sports",
    thumbnail:
      "https://images.unsplash.com/photo-1470920456752-d50214d7ed59?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3ljbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    description: "All Community Members will be have cycling Race",
  },
  {
    title: "Tennis",
    category: "Sports",
    thumbnail:
      "https://images.unsplash.com/photo-1470920456752-d50214d7ed59?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3ljbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    description: "All Community Members will be have cycling Race",
  },
];

export default function SubCategories() {
  return (
        <div className="min-h-screen mx-10 px-1">
      <div className="flex justify-between items-center my-4">
        <h1 className="font-bold text-xl">Categories</h1>
        <AddSubCategory />
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
          <TableRow>
            <TableCell>
              <Image
                src={subCategory.thumbnail}
                style={{ objectFit: "cover" }}
                height={40}
                width={40}
              />
            </TableCell>
            <TableCell className="font-medium">{subCategory.category}</TableCell>
            <TableCell>{subCategory.title}</TableCell>
            <TableCell>{subCategory.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}
