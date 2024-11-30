//? This is a server function
"use server";

//? This function fetches all users from db and returns them
export const getUsers = async () => {
  const url = `${process.env.BASE_URL}/api/users`;

  try {
    let users = await fetch(url);
    users = await users.json();
    console.log("Users fetched from db");
    return users;
  } catch (err) {
    console.log("Failed to fetch users from db :", err.message);
  }
};
