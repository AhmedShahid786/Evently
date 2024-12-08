"use client";
import { logo } from "@/assets";
import {
  LayoutDashboard,
  AlignEndVerticalIcon,
  Filter,
  Users,
  Menu,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

//? Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Events",
    url: "/admin/events",
    icon: AlignEndVerticalIcon,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Filter,
  },
  {
    title: "SubCat",
    url: "/admin/sub-categories",
    icon: Filter,
  },
];

export function Sidebar() {
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <div className="h-full w-full flex flex-col items-center justify-start gap-6">
      <div className="h-1/5 flex items-center justify-center text-primary ">
        <Menu size={28} />
      </div>
      <div className="flex flex-col items-center gap-6 w-full">
        {items.map((item, ind) => (
          <Link
            key={ind}
            href={item.url}
            onClick={() => setSelectedItem(item.url)}
            className={`
              ${item.url == selectedItem ? "text-primary" : " text-white"}
              `}
          >
            <span>
              <item.icon size={20} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
