import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (localPaths) => {
  try {
    if (!localPaths) return { message: "No local file path provided" };

    const paths = Array.isArray(localPaths) ? localPaths : [localPaths];
    const uploadPromises = paths.map(async (localPath) => {
      const res = await cloudinary.uploader.upload(localPath, {
        resource_type: "raw",
      });

      // Unlink the file asynchronously and handle the callback properly
      fs.unlink(localPath, (err) => {
        if (err) {
          console.error("Error deleting local file:", err);
        } else {
          console.log("Local file deleted");
        }
      });

      return res.secure_url;
    });

    const urls = await Promise.all(uploadPromises);
    return Array.isArray(localPaths) ? urls : urls[0];
  } catch (error) {
    console.log("Error while uploading file to Cloudinary:", error);

    const paths = Array.isArray(localPaths) ? localPaths : [localPaths];
    paths.forEach((localPath) => {
      // Unlink the file asynchronously and handle the callback properly
      fs.unlink(localPath, (err) => {
        if (err) {
          console.error("Error deleting local file:", err);
        }
      });
    });

    return null;
  }
};
