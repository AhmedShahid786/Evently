// "use client";
// import React, { useState, useRef } from "react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//   SelectGroup,
//   SelectLabel,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { uploadImage } from "@/actions/upload";
// import { addSubCategory } from "@/actions/sub-categories";
// import { useToast } from "@/components/ui/hooks/use-toast";

// export function AddSubCategory({ categories }) {
//   const [open, setOpen] = useState(false);
//   const { toast } = useToast();
//   const formRef = useRef();

//   const addSubCategoryToDb = async (formData) => {
//     const thumbnailLink = await uploadImage(formData);

//     const subCategoryObj = {
//       title: formData.get("title"),
//       description: formData.get("description"),
//       category: formData.get("category"),
//       thumbnail: thumbnailLink,
//     };

//     await addSubCategory(subCategoryObj);

//     setOpen(!open);
//     formRef?.current?.reset();
//     toast({
//       title: "Sub-category Added",
//       description: "Sub-category added successfully",
//     });
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline">Add Subcategory</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add Sub-Category</DialogTitle>
//           <DialogDescription>All fields are required</DialogDescription>
//         </DialogHeader>
//         <SubCategoryForm />
//       </DialogContent>
//     </Dialog>
//   );

//   function SubCategoryForm({ className }) {
//     return (
//       <form
//         ref={formRef}
//         action={addSubCategoryToDb}
//         className={cn("grid items-start gap-4", className)}
//       >
//         <div className="grid gap-2">
//           <Label htmlFor="title">Title</Label>
//           <Input
//             required
//             name="title"
//             type="title"
//             id="title"
//             placeholder="Sub-category Title"
//           />
//         </div>
//         <div className="grid gap-2">
//           <Label htmlFor="description">Description</Label>
//           <Input
//             required
//             name="description"
//             id="description"
//             placeholder="Sub-category Description"
//           />
//         </div>
//         <div className="grid gap-2">
//           <Label htmlFor="Category">Category</Label>
//           <Select name="category">
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Select category" />
//             </SelectTrigger>
//             <SelectContent>
//               {categories?.map((category) => (
//                 <SelectItem key={category._id} value={category._id}>
//                   {category.title}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="grid gap-2">
//           <Label htmlFor="thumbnail">Thumbnail</Label>
//           <Input required name="thumbnail" type="file" />
//         </div>
//         <Button type="submit">Add Sub-Category</Button>
//       </form>
//     );
//   }
// }

"use client";

import { useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "../ui/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadImage } from "@/actions/upload";
import { addCategory } from "@/actions/categories";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addSubCategory } from "@/actions/sub-categories";

export default function AddSubCategoryForm({ categories }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const formRef = useRef();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef?.current);

    try {
      const thumbnailLink = await uploadImage(formData);

      const subCategoryObj = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        thumbnail: thumbnailLink,
      };

      await addSubCategory(subCategoryObj);

      setLoading(false);
      setOpen(false);
      formRef?.current?.reset();
      toast({
        title: "Subategory Added",
        description: "Subcategory added successfully",
      });
      formRef?.current?.reset();
    } catch (err) {
      console.log(err);
      toast({ title: "Oops", description: err.message });
    }
    setLoading(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Add Subcategory</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto bg-black">
        <SheetHeader>
          <SheetTitle className="font-lilita text-3xl text-primary tracking-wider">
            Add New Subcategory
          </SheetTitle>
          <SheetDescription className="font-poppins text-white">
            Fill in the details for new subcategory.
          </SheetDescription>
        </SheetHeader>
        <SubCategoryForm />
      </SheetContent>
    </Sheet>
  );

  function SubCategoryForm() {
    return (
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="grid items-start gap-4 mt-4"
      >
        <div className="grid gap-2">
          <Label
            htmlFor="title"
            className="text-primary font-poppins text-base"
          >
            Title
          </Label>
          <Input
            required
            name="title"
            type="text"
            id="title"
            maxlength="20"
            placeholder="Title"
            className="border-2 border-white rounded-lg text-sm text-white font-poppins !placeholder-white"
          />
        </div>
        <div className="grid gap-2">
          <Label
            htmlFor="description"
            className="text-primary font-poppins text-base"
          >
            Description
          </Label>
          <Textarea
            required
            name="description"
            id="description"
            maxlength="500"
            placeholder="Description"
            className="border-2 border-white rounded-lg text-sm text-white font-poppins !placeholder-white"
          />
        </div>
        <div className="grid gap-2 relative">
          <Label
            htmlFor="category"
            className="text-primary font-poppins text-base"
          >
            Category
          </Label>
          <Select name="category" className="w-full">
            <SelectTrigger className="w-full border-2 border-primary text-white font-poppins">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="max-h-40 overflow-y-scroll border-2 border-primary text-white font-poppins bg-black">
              {categories?.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label
            htmlFor="thumbnail"
            className="text-primary font-poppins text-base"
          >
            Thumbnail
          </Label>
          <Input
            required
            name="thumbnail"
            type="file"
            accept="image/*"
            className="border-2 border-white rounded-lg text-sm text-white font-poppins !placeholder-white"
          />
        </div>
        <Button type="submit" variant="secondary" disabled={loading}>
          {loading ? (
            <>
              Adding
              <Loader2 className="animate-spin mr-2" />
            </>
          ) : (
            "Add Category"
          )}
        </Button>
      </form>
    );
  }
}
