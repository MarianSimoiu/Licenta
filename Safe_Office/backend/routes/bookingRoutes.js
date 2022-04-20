import express from "express";
import {
  getBookingById,
  getBookings,
  CreateBooking,
  DeleteBooking,
  UpdateBooking,
  getBookingByUser,
} from "../controllers/bookingController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/create").post(protect, CreateBooking)
router.route("/").get(protect, getBookings);
router.route("/:user").get(protect,getBookingByUser)
router.route("/:id").get(getBookingById)
  .delete(protect, DeleteBooking)
  .put(protect, UpdateBooking);


export default router;
