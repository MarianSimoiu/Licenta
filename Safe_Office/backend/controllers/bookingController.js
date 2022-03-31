import Booking from "../models/BookingModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user notes
// @route   GET /api/notes
// @access  Private
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id });
  res.json(bookings);
});

//@description     Fetch single Note
//@route           GET /api/notes/:id
//@access          Public
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(booking);
});

//@description     Create single Note
//@route           GET /api/notes/create
//@access          Private
const CreateBooking = asyncHandler(async (req, res) => {
  const { city, address, floor, date, desk } = req.body;

  if (!city || !address || !floor || !date || !desk) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const booking = new Booking({ user: req.user._id, city, address, floor, date, desk });

    const createdBooking = await booking.save();

    res.status(201).json(createdBooking);
  }
});

//@description     Delete single Note
//@route           GET /api/notes/:id
//@access          Private
const DeleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (booking) {
    await booking.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const UpdateBooking = asyncHandler(async (req, res) => {
  const { city, address, floor, date } = req.body;

  const booking = await Booking.findById(req.params.id);

  if (booking.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (booking) {
    booking.city = city;
    booking.address = address;
    booking.floor = floor;
    booking.date = date;
    booking.desk = desk;
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

export { getBookingById, getBookings, CreateBooking, DeleteBooking, UpdateBooking };
