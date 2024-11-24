//? This is a server action
"use server";

import { revalidatePath } from "next/cache";

//? This function receives subCategory obj from front-end and makes a POST request to add a new sub-category to db
export const addSubCategory = async (subCategoryObj) => {
  const url = `${process.env.BASE_URL}/api/sub-categories`;

  try {
    const addedSubCategory = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subCategoryObj),
    });

    if (addedSubCategory.ok) {
      //* If the request is successful, refresh the page
      console.log("Sub-category added successfully");
      revalidatePath("/admin/sub-categories");
    } else {
      //* If the request fails, log an error message to the console
      console.log("Error in adding sub-category to db", addSubCategory);
    }
  } catch (err) {
    console.log("Failed to add sub-category to db :", err.message);
  }
};

//? This function fetches all sub-categories from db and returns them
export const getSubCategories = async (category) => {
  let url
  if(category){
  url = `${process.env.BASE_URL}/api/sub-categories?category=${category}`;
  }else{
    url = `${process.env.BASE_URL}/api/sub-categories`;
  }

  try {
    let subCategories = await fetch(url);
    subCategories = await subCategories.json();
    console.log("Sub-categories fetched from db");
    return subCategories;
  } catch (err) {
    console.log("Failed to fetch sub-categories from db :", err.message);
  }
};
