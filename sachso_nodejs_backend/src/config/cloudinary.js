require('dotenv').config()
const cloudinary = require('cloudinary').v2;


const cloudState = [
  { value: 0, label: "Disconnected" },
  { value: 1, label: "Connected" }
];

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });
  //   console.log("Cloudinary ENV:", {
  //   name: process.env.CLOUDINARY_NAME,
  //   key: process.env.CLOUDINARY_KEY,
  //   secret: process.env.CLOUDINARY_SECRET ? "loaded" : "MISSING"
  // });


  try {
    await cloudinary.api.resources({ max_results: 1 });
    console.log(cloudState[1].label, "to Cloudinary");
  } catch (err) {
    console.error(cloudState[0].label, "Cloudinary error:", err.message);
  }
};


module.exports = { 
  cloudinary, 
  connectCloudinary,

 };
