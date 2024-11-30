import { getCategories } from "@/actions/categories";
import { getEvents } from "@/actions/events";
import AddEventForm from "@/components/Add-Event-Form/AddEventForm";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { auth } from "../../../../../auth";
import CategoryDropdown from "@/components/Category-Dropdown/Category-Dropdown";

export default async function Events({ searchParams }) {
  const events = (await getEvents(searchParams.category)).events;
  const categories = (await getCategories()).categories;
  const session = await auth();

  return (
    <div className="min-h-screen mx-10 px-1">
      <div className="flex justify-between items-center my-4">
        <h1 className="font-bold text-xl">Events</h1>
        <CategoryDropdown categories={categories} />
        <AddEventForm session={session} categories={categories} />
      </div>
      <Table>
        <TableCaption>A list of recent events.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Thumbnail</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Location</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event._id}>
              <TableCell>
                <Image
                  src={event.thumbnail}
                  style={{ objectFit: "cover" }}
                  height={40}
                  width={40}
                />
              </TableCell>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>{event.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
