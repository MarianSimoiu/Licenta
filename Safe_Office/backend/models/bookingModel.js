import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    building: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Building",
    },
    address:[{
      city: {
          type: String,
          required: true,
          },
      street: {
          type: String,
          required: true,
      }
  }],
    floor: {
      type: Number,
      required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    codSpace: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
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
