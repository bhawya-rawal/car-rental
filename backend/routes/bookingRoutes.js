import express from "express";
import { protect } from "../middleware/auth.js";
import {
  changeBookingStatus,
  checkCarAvailability,
  createBooking,
  getOwnerBookings,
  getUserBooking,
} from "../controllers/BookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkCarAvailability);
bookingRouter.post("/create", protect, createBooking);
bookingRouter.get("/user", protect, getUserBooking);
bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.post("/change-status", protect, changeBookingStatus);

export default bookingRouter;
