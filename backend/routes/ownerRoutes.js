import express from "express";
import { protect } from "../middleware/auth.js";
import {
  addCard,
  changeRoletoOwner,
  deleteCar,
  getDashboardData,
  listOwnerCars,
  toggleCarAvailability,
  updateUserImage,
} from "../controllers/OwnerController.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoletoOwner);
ownerRouter.post("/add-car", upload.single("image"), protect, addCard);
ownerRouter.get("/cars", protect, listOwnerCars);
ownerRouter.post("/toggle-car", protect, toggleCarAvailability);
ownerRouter.post("/delete-car", protect, deleteCar);

ownerRouter.get("/dashboard", protect, getDashboardData);
ownerRouter.post("/update-image",upload.single("image"), protect, updateUserImage);

export default ownerRouter;
