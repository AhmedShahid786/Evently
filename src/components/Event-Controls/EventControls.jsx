"use client";

import { PenBox, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { deleteEventFromDb } from "@/actions/events";
import { useToast } from "../ui/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function EventControls({ eventId }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleEventDeletion = async () => {
    const { success, err } = await deleteEventFromDb(eventId);

    if (err) {
      toast({ title: "Oops", description: err });
    } else {
      toast({ title: "Event deleted successfully" });
      router.push("/admin/events");
    }
  };

  const handleEventUpdation = async () => {};

  return (
    <div className="w-full mb-2 flex items-center justify-between">
      <Button
        onClick={handleEventDeletion}
        variant="secondary"
        className="w-[45%]"
      >
        Delete <Trash className="mr-2 h-4 w-4" />
      </Button>
      <Button
        onClick={handleEventUpdation}
        variant="secondary"
        className="w-[45%]"
      >
        Edit <PenBox className="mr-2 h-4 w-4" />
      </Button>
    </div>
  );
}
