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

//? This function fetches a single user from db and returns it
export const getSingleUser = async (userId) => {
  let url = `${process.env.BASE_URL}/api/users/${userId}`;
  try {
    let user = await fetch(url);
    if (user.ok) {
      user = await user.json();
      console.log("Single user fetched from db");
      return user;
    } else {
      console.log("user.js nhi mila");
    }
  } catch (err) {
    console.log("Failed to fetch single user from db =>", err.message);
  }
};

export const registerUser = async (userObj) => {
  const url = `${process.env.BASE_URL}/api/users`;

  try {
    let newUser = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userObj),
    });

    const { user } = await newUser.json();

    if (user) {
      return user;
    } else {
      console.log("Error in registering user in users.js");
    }
  } catch (err) {
    console.log("Failed to register user to db =>", err.message);
  }
};
