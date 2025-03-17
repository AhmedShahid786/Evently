"use client";

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { deleteEventFromDb } from "@/actions/events";
import { useToast } from "../ui/hooks/use-toast";
import { useRouter } from "next/navigation";
import EventForm from "../Event-Form/EventForm";

export default function EventControls({ event, categories }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleEventDeletion = async () => {
    const { success, err } = await deleteEventFromDb(event._id);

    if (err) {
      toast({ title: "Oops", description: err });
    } else {
      toast({ title: "Event deleted successfully" });
      router.push("/admin/events");
    }
  };

  return (
    <div className="w-full mb-2 flex items-center justify-between">
      <Button
        onClick={handleEventDeletion}
        variant="secondary"
        className="w-[45%]"
      >
        Delete <Trash className="mr-2 h-4 w-4" />
      </Button>
      <EventForm existingEvent={event} categories={categories} />
    </div>
  );
}
