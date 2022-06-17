import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    floorSeat: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
