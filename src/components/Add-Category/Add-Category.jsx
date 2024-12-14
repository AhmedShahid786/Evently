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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/actions/upload";
import { addCategory } from "@/actions/categories";
import { useToast } from "@/components/ui/hooks/use-toast";

export function AddCategory() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const formRef = useRef();

  const addCategoryToDb = async (formData) => {
    setLoading(true);
    const thumbnailLink = await uploadImage(formData);

    const categoryObj = {
      title: formData.get("title"),
      description: formData.get("description"),
      thumbnail: thumbnailLink,
    };

    await addCategory(categoryObj);

    setLoading(false);
    setOpen(false);
    formRef?.current?.reset();
    toast({
      title: "Category Added",
      description: "Category added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>All fields are required</DialogDescription>
        </DialogHeader>
        <CategoryForm />
      </DialogContent>
    </Dialog>
  );

  function CategoryForm({ className }) {
    return (
      <form
        ref={formRef}
        action={addCategoryToDb}
        className={cn("grid items-start gap-4", className)}
      >
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            required
            name="title"
            type="title"
            id="title"
            placeholder="Category Title"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input
            required
            name="description"
            id="description"
            placeholder="Category Description"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="thumbnail">Thumbnail</Label>
          <Input required name="thumbnail" type="file" />
        </div>
        <Button disabled={loading} type="submit">
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Adding
            </>
          ) : (
            "Add Category"
          )}
        </Button>
      </form>
    );
  }
}
