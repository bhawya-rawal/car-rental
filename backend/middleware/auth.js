import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({
      success: false,
      message: "Access denied. Please log in to continue.",
    });
  }
  try {
    const userId = jwt.decode(token, process.env.JWT_SECRET);

    if (!userId) {
      return res.json({
        success: false,
        message: "You are not authorized",
      });
    }
    req.user = await User.findById(userId).select("-password"); // select -password to remove password from the user object
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "You are not authorized",
    });
  }
};
