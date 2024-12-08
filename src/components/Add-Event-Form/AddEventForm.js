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
import { addEventToDb } from "@/actions/events";
import { useToast } from "../ui/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddEventForm({ session, categories }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const formRef = useRef();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef?.current);
    formData.append("createdBy", session?.user?._id);

    try {
      await addEventToDb(formData);
      setOpen(false);
      toast({ title: "Event Added", description: "Event Added Successfully" });
      formRef?.current?.reset();
    } catch (err) {
      console.log(err);
      toast({ title: "Oops", description: "Something went wrong" });
    }
    setLoading(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Add Event</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto bg-black">
        <SheetHeader>
          <SheetTitle className="font-lilita text-3xl text-primary tracking-wider">
            Add New Event
          </SheetTitle>
          <SheetDescription className="font-poppins text-white">
            Fill in the details for your new event.
          </SheetDescription>
        </SheetHeader>
        <EventForm categories={categories} addEventToDb={addEventToDb} />
      </SheetContent>
    </Sheet>
  );

  function EventForm() {
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
            maxlength="150"
            placeholder="Event Title"
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
            maxlength="1000"
            placeholder="Event Description"
            className="border-2 border-white rounded-lg text-sm text-white font-poppins !placeholder-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label
              htmlFor="startDate"
              className="text-primary font-poppins text-base"
            >
              Start Date
            </Label>
            <Input
              required
              name="startDate"
              type="date"
              id="startDate"
              className="border-2 border-white rounded-lg text-sm text-white font-poppins !placeholder-white"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="endDate"
              className="text-primary font-poppins text-base"
            >
              End Date
            </Label>
            <Input
              required
              name="endDate"
              type="date"
              id="endDate"
              className="border-2 border-white rounded-lg text-sm text-white font-poppins !placeholder-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label
              htmlFor="startTime"
              className="text-primary font-poppins text-base"
            >
              Start Time
            </Label>
            <Input
              required
              name="startTime"
              type="time"
              id="startTime"
              className="border-2 border-white rounded-lg text-sm text-white font-poppins !placeholder-white"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="endTime"
              className="text-primary font-poppins text-base"
            >
              End Time
            </Label>
            <Input
              required
              name="endTime"
              type="time"
              id="endTime"
              className="border-2 border-white rounded-lg text-sm text-white font-poppins !placeholder-white"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label
            htmlFor="category"
            className="text-primary font-poppins text-base"
          >
            Category
          </Label>
          <Select name="category">
            <SelectTrigger className="w-[180px] border-2 border-primary text-white font-poppins">
              <SelectValue placeholder="Select Category" name="category" />
            </SelectTrigger>
            <SelectContent className="border-2 border-primary text-white font-poppins bg-black">
              <SelectGroup>
                {categories?.map((data) => (
                  <SelectItem key={data._id} value={data._id}>
                    {data.title}
                  </SelectItem>
                ))}
              </SelectGroup>
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
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label
              htmlFor="lat"
              className="text-primary font-poppins text-base"
            >
              Latitude
            </Label>
            <Input
              required
              name="lat"
              type="number"
              id="lat"
              step="any"
              className="border-2 border-white rounded-lg text-sm text-white font-poppins !placeholder-white"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="long"
              className="text-primary font-poppins text-base"
            >
              Longitude
            </Label>
            <Input
              required
              name="long"
              type="number"
              id="long"
              step="any"
              className="border-2 border-white rounded-lg text-sm text-white font-poppins !placeholder-white"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label
            htmlFor="address"
            className="text-primary font-poppins text-base"
          >
            Address
          </Label>
          <Input
            required
            name="address"
            type="text"
            id="address"
            maxlength="500"
            placeholder="Venue Address"
            className="border-2 border-white rounded-lg text-sm text-white font-poppins !placeholder-white"
          />
        </div>
        <Button type="submit" variant="secondary" disabled={loading}>
          {loading ? "Adding..." : "Add Event"}
        </Button>
      </form>
    );
  }
}
