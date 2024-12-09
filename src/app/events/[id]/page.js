import { Button } from "@/components/ui/button";
import { getSingleEvent, registerForEvent } from "@/actions/events";
import { auth } from "../../../../auth";
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
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  Tickets,
  UserCheckIcon,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getComments } from "@/actions/comments";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Comments from "@/components/Comments/Comments";
import Attendees from "@/components/Attendees/Attendees";
dayjs.extend(relativeTime);

export default async function EventDetailsPage({ params }) {
  const event = (await getSingleEvent(params.id)).event;
  console.log(event);

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

  const isGoingToEvent =
    session && event.going.find((data) => data._id == session.user._id);
  return (
    <div className="min-h-screen bg-black p-6">
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
          {session ? (
            <form
              className="w-full mb-2"
              action={async () => {
                "use server";
                await registerForEvent(params?.id, session?.user?._id);
              }}
            >
              {isGoingToEvent ? (
                <Button type="submit" variant="secondary">
                  <span className="flex">
                    <UserCheckIcon className="mr-2 h-4 w-4" /> Going
                  </span>
                </Button>
              ) : (
                <Button type="submit" variant="secondary" className="w-full">
                  Count Me In!
                  <Tickets className="mr-2 h-4 w-4" />
                </Button>
              )}
            </form>
          ) : (
            <Link className="w-full" href={"/login"}>
              <Button className="w-full"> Login to participate in Event</Button>
            </Link>
          )}

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
