import express from "express";
import {
  getBookingById,
  getBookings,
  CreateBooking,
  DeleteBooking,
  UpdateBooking,
} from "../controllers/bookingController.js";
import { getBuildingDesks } from "../controllers/buildingController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getBookings);
router.route("/:address").get(protect, getBuildingDesks)
router.route("/:id")
  .get(protect,getBookingById)
  .delete(protect, DeleteBooking)
  .put(protect, UpdateBooking);
router.route("/create").post(protect, CreateBooking)

export default router;
