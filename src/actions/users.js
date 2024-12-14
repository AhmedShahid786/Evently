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
    let userRes = await fetch(url);

    const { user, err } = await userRes.json();

    if (user) {
      return { success: true, user: user };
    } else if (err) {
      console.log("Error in fetching single user in users.js");
      return { success: false, err: err };
    }
  } catch (err) {
    console.log("Failed to fetch single user from db =>", err.message);
    return { success: false, err: "Oops, something went wrong" };
  }
};

//? This function receives an email and password then regitsers user in db and returns it
export const registerUser = async (userObj) => {
  const url = `${process.env.BASE_URL}/api/users`;

  try {
    let newUser = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userObj),
    });

    const { user, err } = await newUser.json();

    if (user) {
      return { success: true, user: user };
    } else if (err) {
      console.log("Error in registering user in users.js");
      return { success: false, err: err };
    }
  } catch (err) {
    console.log("Failed to register user to db =>", err.message);
    return { success: false, err: "Oops, something went wrong" };
  }
};

//? This function receives userId and OTP entered by user then verifies it and returns success or error response
export const verifyUserOtp = async (verificationObj) => {
  let url = `${process.env.BASE_URL}/api/users/verify`;

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(verificationObj),
    });

    const { user, err } = await response.json();

    if (user) {
      return { success: true, user: user };
    } else if (err) {
      console.log("Error in verifying otp in users.js");
      return { success: false, err: err };
    }
  } catch (err) {
    console.error("Failed to verify user OTP =>", err);
    return { success: false, err: "Oops, something went wrong" };
  }
};

//? This function receives user data and adds/updates that info in db
export const updateUserInfo = async (userObj) => {
  let url = `${process.env.BASE_URL}/api/users/info`;
  try {
    let updatedInfoUser = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        id: userObj.id,
        fullname: userObj.fullname,
        bio: userObj.bio,
        profileImg: userObj.profileImg,
      }),
    });

    const { user, err } = await updatedInfoUser.json();
    if (user) {
      return { success: true, user: user };
    } else if (err) {
      console.log("Error in updating user info in users.js");
      return { success: false, err: err };
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, err: "Oops, something went wrong" };
  }
};
