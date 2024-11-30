import {
  MapPin,
  Tickets,
  FolderTreeIcon,
  MessageSquareDotIcon,
  CalendarFold,
  StarsIcon,
} from "lucide-react";

export default function KeyFeatureCard({ featureData }) {
  const { icon, title, description } = featureData;
  return (
    <div className="w-1/4 flex flex-col items-start justify-center gap-4 px-4 my-6 rounded-lg">
      <div
        className="text-primary text-3xl text-center rounded-lg p-2 mb-2"
        style={{
          boxShadow: "5px 6px 7px rgba(197, 255, 24, 0.4)",
        }}
      >
        {icon}
      </div>
      <p className="text-primary text-base font-poppins">{title}</p>
      <p className="text-white text-sm font-poppins">{description}</p>
    </div>
  );
}
