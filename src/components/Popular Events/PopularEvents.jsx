import { getCategories } from "@/actions/categories";
import CategoryDropdown from "../Category-Dropdown/Category-Dropdown";
import { BorderBeam } from "../ui/border-beam";

export default async function PopularEvents() {
  const categories = (await getCategories()).categories;

  return (
    <section className="min-w-full h-[50dvh] relative rounded-lg px-6 overflow-hidden border-2">
      <BorderBeam duration={15} />

      <div className="w-full flex items-center justify-between py-3">
        <h3 className="text-secondary font-lilita text-4xl tracking-wider">
          Popular Events
        </h3>
        <CategoryDropdown categories={categories} />
      </div>

      <div></div>
    </section>
  );
}
