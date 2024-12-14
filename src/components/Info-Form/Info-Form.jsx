"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { updateUserInfo } from "@/actions/users";
import { uploadImage } from "@/actions/upload";
import { Loader2 } from "lucide-react";

export default function InfoForm({ userId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const updateInfo = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const profileImg = await uploadImage(formData);

    const userData = {
      id: userId,
      fullname: formData.get("fullname"),
      bio: formData.get("bio"),
      profileImg: profileImg,
    };

    const isUpdated = await updateUserInfo(userData);

    if (isUpdated.success) {
      router.push("/");
    } else if (isUpdated.err) {
      setError(isUpdated.err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={updateInfo} className="grid items-start gap-4">
      <div className="grid gap-2">
        <Label
          htmlFor="fullname"
          className="text-primary font-lilita text-xl tracking-wide"
        >
          Fullname
        </Label>
        <Input
          required
          name="fullname"
          id="fullname"
          placeholder="eg. Ahmed Raza"
          className="rounded-lg border-2 border-primary font-poppins bg-transparent text-sm text-white p-2 !placeholder-white"
        />
      </div>
      <div className="grid gap-2">
        <Label
          htmlFor="bio"
          className="text-primary font-lilita text-xl tracking-wide"
        >
          Bio
        </Label>
        <Textarea
          required
          name="bio"
          id="bio"
          placeholder="eg. I'm a freelancer"
          className="rounded-lg border-2 border-primary font-poppins bg-transparent text-sm text-white p-2 !placeholder-white"
        />
      </div>
      <div className="grid gap-2">
        <Label
          htmlFor="thumbnail"
          className="text-primary font-lilita text-xl tracking-wide"
        >
          Profile Image
        </Label>
        <Input
          required
          name="thumbnail"
          type="file"
          className="rounded-lg border-2 border-primary font-poppins bg-transparent text-sm text-white p-2 !placeholder-white"
        />
      </div>
      <Button disabled={loading} type="submit" variant="secondary">
        {loading ? (
          <>
            Updating
            <Loader2 className="animate-spin mr-2" />
          </>
        ) : (
          "Lets Go!"
        )}
      </Button>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
    </form>
  );
}
