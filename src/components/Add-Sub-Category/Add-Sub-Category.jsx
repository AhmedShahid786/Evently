"use client";
import React, { useState, useRef } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/actions/upload";
import { addSubCategory } from "@/actions/sub-categories";
import { useToast } from "@/components/ui/hooks/use-toast";

export function AddSubCategory({ categories }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const formRef = useRef();

  const addSubCategoryToDb = async (formData) => {
    const thumbnailLink = await uploadImage(formData);

    const subCategoryObj = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      thumbnail: thumbnailLink,
    };

    await addSubCategory(subCategoryObj);

    setOpen(!open);
    formRef?.current?.reset();
    toast({
      title: "Sub-category Added",
      description: "Sub-category added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Sub-Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Sub-Category</DialogTitle>
          <DialogDescription>All fields are required</DialogDescription>
        </DialogHeader>
        <SubCategoryForm />
      </DialogContent>
    </Dialog>
  );

  function SubCategoryForm({ className }) {
    return (
      <form
        ref={formRef}
        action={addSubCategoryToDb}
        className={cn("grid items-start gap-4", className)}
      >
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            required
            name="title"
            type="title"
            id="title"
            placeholder="Sub-category Title"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input
            required
            name="description"
            id="description"
            placeholder="Sub-category Description"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="Category">Category</Label>
          <Select name="category">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="thumbnail">Thumbnail</Label>
          <Input required name="thumbnail" type="file" />
        </div>
        <Button type="submit">Add Sub-Category</Button>
      </form>
    );
  }
}
