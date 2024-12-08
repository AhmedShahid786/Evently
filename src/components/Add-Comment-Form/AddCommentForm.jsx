"use client";
import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { useToast } from "../ui/hooks/use-toast";
import { addComment } from "@/actions/comments";

export default function AddCommentForm({ eventId, currentUserId }) {
  const formRef = useRef();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef?.current);

    try {
      await addComment({
        event: eventId,
        userId: currentUserId,
        comment: formData.get("comment"),
      });
      formRef?.current?.reset();
      toast({
        title: "Comment Added",
        description: "Your comment was posted",
      });
    } catch (err) {
      console.log("Error in adding comment =>", err);
      toast({ title: "Oops!", description: "Something went wrong" });
    }
    setLoading(false);
  };

  return (
    <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-2">
      <div className="flex space-x-2">
        <Input
          className="border-2 border-white rounded-lg text-sm text-white font-poppins !placeholder-white"
          name="comment"
          placeholder="Add a comment..."
        />
        <Button type="submit" variant="secondary" disabled={loading}>
          Comment
          <Send />
        </Button>
      </div>
    </form>
  );
}
