import express from "express";
import {
  getBookingById,
  getBookings,
  CreateBooking,
  DeleteBooking,
  UpdateBooking,
} from "../controllers/bookingController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getBookings);
router
  .route("/:id")
  .get(getBookingById)
  .delete(protect, DeleteBooking)
  .put(protect, UpdateBooking);
router.route("/create").post(protect, CreateBooking);

export default router;
