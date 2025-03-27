const { v2: cloudinary } = require("cloudinary");
require("dotenv").config(); 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_CLOUD_KEY || !process.env.CLOUDINARY_CLOUD_SECRET) {
  throw new Error("Cloudinary configuration is missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_CLOUD_KEY, and CLOUDINARY_CLOUD_SECRET in your environment variables.");
}

const uploadImageToCloudinary = async (file, userId) => {
  try {
    if (!file) {
      throw new Error("File is required for upload");
    }
    if (!userId) {
      throw new Error("userId must be a non-empty string");
    }

    const response = await cloudinary.uploader.upload(file, {
      folder: `Blogs images`, // Store images in a user-specific subfolder
      resource_type: "image",
    });

    return response;
  } catch (error) {
    console.error(`Error uploading image to Cloudinary: ${error.message}`);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

const deleteImageFromCloudinary = async (name) => {
  try {
    if (!name || typeof name !== "string") {
      throw new Error("Image name must be a non-empty string");
    }

    const folder = `Blogs images`;

    const response = await cloudinary.api.delete_resources([`${folder}/${name}`], {
      resource_type: "image",
    });

  } catch (error) {
    console.error(`Error deleting resource from Cloudinary: ${error.message}`);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

module.exports = {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
};