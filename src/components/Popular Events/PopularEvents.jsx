import { getCategories } from "@/actions/categories";
import CategoryDropdown from "../Category-Dropdown/Category-Dropdown";
import { BorderBeam } from "../ui/border-beam";
import EventCard from "../Event-Card/EventCard";
import { getEvents } from "@/actions/events";

export default async function PopularEvents() {
  const categories = (await getCategories()).categories;
  const events = (await getEvents()).events;

  return (
    <section className="min-w-full relative rounded-lg px-6 py-3 border-[1px] border-neutral-700">
      <BorderBeam />

      <div className="w-full flex items-center justify-between">
        <h3 className="text-primary font-lilita text-4xl tracking-wider">
          Popular Events
        </h3>
        <CategoryDropdown categories={categories} />
      </div>

      <div className="w-full h-[80dvh] flex flex-wrap items-center justify-between gap-y-8 overflow-y-scroll mt-3">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </section>
  );
}
