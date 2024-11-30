export default function HowItWorksList({ data, ind }) {
  const { heading, description } = data;

  return (
    <div className={`flex ${ind % 2 == 0 ? "flex-row-reverse" : ""} mt-24`}>
      <div className={`w-1/2 min-h-full flex items-center justify-center`}>
        <div className="py-3 px-6 rounded-full border-2 border-primary">
          <p className="text-primary text-5xl font-lilita">{ind}</p>
        </div>
      </div>
      <div className="w-1/2">
        <p className="text-primary text-3xl font-lilita mb-4">{heading}</p>
        <p className="text-white text-base font-poppins">{description}</p>
      </div>
    </div>
  );
}
