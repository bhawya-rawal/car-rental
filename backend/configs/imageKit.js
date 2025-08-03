import ImageKit from "imagekit";

// Create a mock imagekit if environment variables are not set
let imagekit;

try {
  if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
    console.log("ImageKit environment variables not set. Using mock configuration.");
    imagekit = {
      upload: async (file, options) => {
        console.log("Mock image upload:", file.name);
        return { url: "https://via.placeholder.com/300x200?text=Mock+Image" };
      }
    };
  } else {
    imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  }
} catch (error) {
  console.log("ImageKit initialization error:", error.message);
  // Create mock imagekit
  imagekit = {
    upload: async (file, options) => {
      console.log("Mock image upload:", file.name);
      return { url: "https://via.placeholder.com/300x200?text=Mock+Image" };
    }
  };
}

export default imagekit;
