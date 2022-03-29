import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    date: {
        type: Date,
        required: true,
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
