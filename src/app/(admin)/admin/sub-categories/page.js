import { getCategories } from "@/actions/categories";
import { getSubCategories } from "@/actions/sub-categories";
import AddSubCategoryForm from "@/components/Add-Sub-Category/Add-Sub-Category";
import SubCategoryCard from "@/components/Sub-Category-Card/SubCategoryCard";

export default async function Subcategories() {
  const subcategories = (await getSubCategories()).subCategories;
  const categories = (await getCategories()).categories;

  return (
    <div className="w-full h-screen">
      <div className="w-full h-1/5 flex justify-between items-center">
        <h1 className="font-lilita text-3xl text-primary">Subcategories</h1>
        <AddSubCategoryForm categories={categories} />
      </div>

      <section className="w-full h-4/5 overflow-y-scroll py-6 flex flex-wrap justify-between gap-3">
        {subcategories?.map((subcategory, ind) => (
          <SubCategoryCard subcategory={subcategory} key={ind} />
        ))}
      </section>
    </div>
  );
}
