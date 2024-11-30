export default function FooterLinkList({ linksData }) {
  const { heading, links } = linksData;

  return (
    <div className="w-1/2 px-12">
      <h1 className="text-primary text-xl font-lilita font-thin">{heading}</h1>
      {links.map((link, ind) => (
        <p
          key={ind}
          className="text-white text-sm opacity-70 font-poppins my-2 cursor-pointer"
        >
          {link}
        </p>
      ))}
    </div>
  );
}
