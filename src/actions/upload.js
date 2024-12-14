//? This is a server action
"use server";

//? This fuction generates a sha-key for cloudinary upload verification
function generateSignature(timestamp, apiSecret) {
  const crypto = require("crypto");
  const signature = crypto
    .createHash("sha256")
    .update(`timestamp=${timestamp}${apiSecret}`)
    .digest("hex");
  return signature;
}

//? This is the main function which uploads the image on cloudinary and returns the url of the uploaded image
export async function uploadImage(categoryData) {
  //* Access necessary cloudinary credentials from .env file
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  //* Generate timestamp and signature (required)
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = generateSignature(timestamp, apiSecret);

  //* Create form data as per the cloudinary required upload structure
  const formData = new FormData();
  formData.append("file", categoryData.get("thumbnail"));
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  //* Upload url for fetch request
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const response = await fetch(url, { method: "POST", body: formData });
  const data = await response.json();

  if (response.ok) {
    //* If the request is successful, return url of the uploaded image
    console.log("image url =>", data.secure_url);
    return data.secure_url;
  } else {
    //* If the request fails, log the error message to the console
    console.log("error in uploading img to cloudinary =>", data.error.message);
  }
}
