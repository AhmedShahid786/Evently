//? This is a server action
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//? This function receives category obj from front-end and makes a POST request to add a new category to db
export const addCategory = async (categoryObj) => {
  const url = `${process.env.BASE_URL}/api/categories`;

  try {
    const addedCategory = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryObj),
    });

    if (addedCategory.ok) {
      //* If the request is successful, refresh the page
      console.log("Category added successfully");
      revalidatePath("/admin/categories");
    } else {
      //* If the request fails, log an error message to the console
      console.log("Error in adding category to db");
    }
  } catch (err) {
    console.log("Failed to add category to db :", err.message);
  }
};

//? This function fetches all categories from db and returns them
export const getCategories = async () => {
  const url = `${process.env.BASE_URL}/api/categories`;

  try {
    let categories = await fetch(url);
    categories = await categories.json();
    console.log("categories fetched from db");
    return categories;
  } catch (err) {
    console.log("Failed to fetch categories from db :", err.message);
  }
};

//? This function fetches a single category from db and returns it
export const getSingleCategory = async (categoryId) => {
  let url = `${process.env.BASE_URL}/api/categories/${categoryId}`;

  try {
    let category = await fetch(url);
    if (category.ok) {
      category = await category.json();
      console.log("Single category fetched from db");
      return category;
    } else {
      redirect("/not-found");
    }
  } catch (err) {
    console.log("Failed to fetch single category from db =>", err.message);
  }
};
