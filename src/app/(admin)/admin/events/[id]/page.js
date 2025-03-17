import { deleteEventFromDb, getSingleEvent } from "@/actions/events";
import { auth } from "../../../../../../auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getComments } from "@/actions/comments";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Comments from "@/components/Comments/Comments";
import Attendees from "@/components/Attendees/Attendees";
import EventControls from "@/components/Event-Controls/EventControls";
import { getCategories } from "@/actions/categories";
dayjs.extend(relativeTime);

export default async function EventDetailsPage({ params }) {
  const event = (await getSingleEvent(params.id)).event;
  const categories = (await getCategories()).categories;

  if (!event) redirect("not-found");
  const session = await auth();
  const comments = (await getComments(params.id))?.comments?.comments || [];
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const deleteEvent = async () => {
    let deleteEventRes = await deleteEventFromDb(params.id);
  };
  return (
    <div className="max-h-screen overflow-y-scroll bg-black p-6">
      <Card className="max-w-3xl mx-auto bg-black">
        <CardHeader>
          <div className="relative w-full h-64 mb-4">
            <Image
              src={event?.thumbnail}
              alt={event?.title}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
          <Badge className="mb-2 px-3 py-1 max-w-fit text-black font-poppins text-xs">
            {event?.category?.title}
          </Badge>
          <CardTitle className="text-3xl font-lilita text-primary tracking-wider">
            {event?.title}
          </CardTitle>
          <CardDescription className="text-white font-poppins">
            {event?.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4 text-white font-poppins text-sm">
            <CalendarIcon className="text-primary" />
            <span>
              {formatDate(event?.startDate)} - {formatDate(event?.endDate)}
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-4 text-white font-poppins text-sm">
            <ClockIcon className="text-primary" />
            <span>
              {event?.startTime} - {event?.endTime}
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-4 text-white font-poppins text-sm">
            <MapPinIcon className="text-primary" />
            <span>{event?.address}</span>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={event?.createdBy?.profileImg} />
              <AvatarFallback />
            </Avatar>
            <div>
              <p className="text-sm text-white font-lilita tracking-wider">
                Event Organizer
              </p>
              <p className="font-poppins text-primary text-sm">
                {event?.createdBy?.fullname}
              </p>
            </div>
          </div>

          <Separator className="my-4" />
          <Attendees attendees={event?.going} />
        </CardContent>
        <CardFooter className="flex flex-col">
          <EventControls event={event} categories={categories} />

          {session && (
            <Comments
              comments={comments}
              currentUserId={session?.user._id}
              eventId={params?.id}
            />
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
