import { getCategories } from "@/actions/categories";
import { getEvents } from "@/actions/events";
import AddEventForm from "@/components/Add-Event-Form/AddEventForm";
import { auth } from "../../../../../auth";
import EventCard from "@/components/Event-Card/EventCard";

export default async function Events({ searchParams }) {
  const events = (await getEvents(searchParams.category)).events;
  const categories = (await getCategories()).categories;
  const session = await auth();

  return (
    <div className="w-full h-screen">
      <div className="w-full h-1/5 flex justify-between items-center">
        <h1 className="font-lilita text-3xl text-primary">Events</h1>
        <AddEventForm session={session} categories={categories} />
      </div>

      <section className="w-full h-4/5 overflow-y-scroll py-6 flex flex-wrap justify-between gap-3">
        {events?.map((event, ind) => (
          <EventCard event={event} key={ind} />
        ))}
      </section>
    </div>
  );
}
