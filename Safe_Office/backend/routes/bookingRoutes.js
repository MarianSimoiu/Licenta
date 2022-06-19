import express from "express";
import {
  getBookingById,
  getBookings,
  CreateBooking,
  DeleteBooking,
  UpdateBooking,
  getActiveBookingByUser,
  getHistoryBookingByUser,
  trigger,
  getFilteredBookings
} from "../controllers/bookingController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/trigger").get(trigger)
router.route("/create").post(protect, CreateBooking)
router.route("/").get(protect, getBookings);
router.route("/:date").get(protect, getFilteredBookings);
router.route("/active/:user").get(protect,getActiveBookingByUser)
router.route("/expired/:user").get(protect,getHistoryBookingByUser)
router.route("/:id").get(getBookingById)
  .delete(protect, DeleteBooking)
  .put(protect, UpdateBooking);


export default router;
