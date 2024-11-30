"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function CategoryDropdown({ categories }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSelectCategory(category) {
    const params = new URLSearchParams(searchParams);
    if (category && category != "All") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <Select onValueChange={handleSelectCategory}>
      <SelectTrigger className="w-[180px] border-2 border-primary text-white font-poppins">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent className="border-2 border-primary text-white font-poppins bg-transparent">
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value={"All"}>All</SelectItem>
          {categories?.map((data) => (
            <SelectItem key={data._id} value={data._id}>
              {data.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
