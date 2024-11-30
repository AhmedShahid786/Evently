import {
  MapPin,
  Tickets,
  FolderTreeIcon,
  MessageSquareDotIcon,
  CalendarFold,
  StarsIcon,
} from "lucide-react";
import KeyFeatureCard from "../Key-Feature-Card/KeyFeatureCard";

const keyFeaturesData = [
  {
    icon: <MapPin />,
    title: "Discover Events Nearby",
    description:
      "Effortlessly browse events happening in your city. Find the perfect event that suits your interests, anytime, anywhere.",
  },
  {
    icon: <Tickets />,
    title: "Create & Share Events",
    description:
      "Host your own events with ease. Choose categories, and share them with a community eager to engage and participate.",
  },
  {
    icon: <FolderTreeIcon />,
    title: "Categorized Event Listings",
    description:
      "Explore events by well-defined categories and subcategories, making it easy to find exactly what you're looking for.",
  },
  {
    icon: <MessageSquareDotIcon />,
    title: "Interactive Community",
    description:
      "Ask questions, share thoughts, and interact with other attendees in the community section dedicated to every event.",
  },
  {
    icon: <CalendarFold />,
    title: "Save & Manage Favorites",
    description:
      "Add events to your favorites list and manage them with a personalized dashboard. Never miss an event you care about!",
  },
  {
    icon: <StarsIcon />,
    title: "Seamless User Experience",
    description:
      "Enjoy a user-friendly, visually stunning interface designed to make event planning and discovery enjoyable and stress-free.",
  },
];

export default function KeyFeatures() {
  return (
    <section className="min-w-full">
      <div className="w-full text-center my-12">
        <p className="text-primary text-5xl font-lilita mb-4">
          Plan, Explore, and Engage – All in One Place
        </p>
        <p className="text-white text-xl font-poppins">
          Your ultimate destination for productive events. Meet people, interact
          with the community and build meaningful connections.
        </p>
      </div>

      <div className="w-full flex flex-wrap items-center justify-between gap-1">
        {keyFeaturesData.map((featureData, ind) => (
          <KeyFeatureCard key={ind} featureData={featureData} />
        ))}
      </div>
    </section>
  );
}
