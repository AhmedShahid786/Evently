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

export default function AddCategoryForm() {
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
        <Button variant="outline">Add Category</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto bg-black">
        <SheetHeader>
          <SheetTitle className="font-lilita text-3xl text-primary tracking-wider">
            Add New Category
          </SheetTitle>
          <SheetDescription className="font-poppins text-white">
            Fill in the details for new category.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm />
      </SheetContent>
    </Sheet>
  );

  function CategoryForm() {
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
          <Textarea
            required
            name="title"
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
            placeholder="Category Description"
            className="border-2 border-white rounded-lg text-sm text-white font-poppins !placeholder-white"
          />
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
