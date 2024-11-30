import Image from "next/image";
import { logo } from "@/assets";
import FooterLinkList from "../Footer-Link-List/FooterLinkList";

const footerData = [
  {
    heading: "Quick Links",
    links: [
      "About Us",
      "Contact",
      "Privacy Policy",
      "Terms of Service",
      "FAQs",
    ],
  },
  {
    heading: "Explore",
    links: [
      "Events",
      "Categories",
      "Sub Categories",
      "Create an Event",
      "Saved Events",
    ],
  },
];

export default function Footer() {
  return (
    <section className="min-w-full flex">
      <div className="w-1/2 min-h-full flex flex-col items-start justify-start">
        <div className="w-2/6 h-2/4 relative cursor-pointer">
          <Image src={logo} fill />
        </div>
        <p className="text-white text-base font-poppins pr-16">
          Your go-to platform for discovering exciting events, meeting
          like-minded people, and creating unforgettable experiences.
        </p>
      </div>
      <div className="w-1/2 min-h-full flex">
        {footerData.map((data, ind) => (
          <FooterLinkList key={ind} linksData={data} />
        ))}
      </div>
    </section>
  );
}
