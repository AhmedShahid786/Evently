import HowItWorksList from "../How-It-Works-List/HowItWorksList";

const howItWorksData = [
  {
    heading: "Register and Get Started",
    description:
      "Create your account on Evently to unlock a world of opportunities. With a quick and seamless sign-up process, you’ll gain access to a vibrant community and events tailored to your preferences.",
  },
  {
    heading: "Discover Events",
    description:
      "Explore events happening around you. Filter by categories, interests, or locations to find events that match your vibe.",
  },
  {
    heading: "Create Your Own Events",
    description:
      "Host your own events in just a few clicks. Add all the details, set a location, choose categories, and invite the community to join.",
  },
  {
    heading: "Join and Engage",
    description:
      "Meet new people, make friends, and grow your network through shared interests and experiences. Evently is all about meaningful connections!",
  },
];

export default function HowItWorks() {
  return (
    <section className="min-w-full">
      <div className="w-full text-center my-12">
        <p className="text-primary text-5xl font-lilita mb-4">How it works?</p>
        <p className="text-white text-xl font-poppins">
          Creating, discovering, and engaging with events has never been this
          easier.
        </p>
      </div>

      <div className="min-w-full">
        {howItWorksData.map((data, ind) => (
          <HowItWorksList data={data} ind={++ind} key={ind} />
        ))}
      </div>
    </section>
  );
}
