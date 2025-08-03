import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log("Database connected successfully"));
    
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      console.log("MONGODB_URI not set. Server will run without database connection.");
      console.log("To connect to MongoDB Atlas, set your MONGODB_URI environment variable.");
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas successfully!");
  } catch (error) {
    console.log("Database connection error:", error.message);
    console.log("Server will continue without database connection.");
  }
};

export default connectDB;
