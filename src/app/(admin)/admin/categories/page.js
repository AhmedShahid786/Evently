import { getCategories } from "@/actions/categories";
import { AddCategory } from "@/components/Add-Category/Add-Category";
import CategoryCard from "@/components/Category-Card/CategoryCard";

export default async function Events() {
  const categories = (await getCategories()).categories;

  return (
    <div className="w-full h-screen">
      <div className="w-full h-1/5 flex justify-between items-center">
        <h1 className="font-lilita text-3xl text-primary">Categories</h1>
        <AddCategory />
      </div>

      <section className="w-full h-4/5 overflow-y-scroll py-6 flex flex-wrap justify-between gap-3">
        {categories?.map((category, ind) => (
          <CategoryCard category={category} key={ind} />
        ))}
      </section>
    </div>
  );
}
