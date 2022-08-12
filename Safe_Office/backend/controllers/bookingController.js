import Booking from "../models/BookingModel.js";
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler";
import Building from "../models/BuildingModel.js";
import moment from 'moment'

// @desc    Get logged in user notes
// @route   GET /api/bookings
// @access  Private
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

//@description     Fetch single Booking
//@route           GET /api/bookings/:id
//@access          Public
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
 
});

/*
const getActiveBookingByUser = asyncHandler(async (req, res) => {
  const booking = await Booking.find({user : req.params.user, date:{"$gte":new Date()}})
  if(booking)
    res.json(booking)
  else 
    res.status(404).json({ message: "Bookings not found"})
})

const getHistoryBookingByUser = asyncHandler(async (req, res) => {
  const booking = await Booking.find({user : req.params.user, date:{"$lte":new Date()}})
  if(booking)
    res.json(booking)
  else 
    res.status(404).json({ message: "Bookings not found"})
})
*/

const UserBookings = asyncHandler(async (req, res) => {
  const booking = await Booking.find({user: req.params.user});
  if(booking)
    res.json(booking)
  else
    res.status(404).json({message: "Bookings not found"});
});

const getFilteredBookings = asyncHandler(async (req, res) => {
   const tomorrow = new Date()
   const today = new Date(req.params.date)
   tomorrow.setDate(today.getDate() + 1);
   var tomorrowFixed = moment(tomorrow).format('YYYY-MM-DD[T00:00:00.000Z]');

  const booking = await Booking.find({ building: req.params.buildingId, floor: req.params.floor, date: {"$lte": new Date(today),
                                             "$gte": new Date(today)}})
  if(booking)
    res.json(booking)
  else
    res.status(404).json({ message: "Bookings not found"})
})



//@description     Create single Note
//@route           GET /api/notes/create
//@access          Private

const CreateBooking = asyncHandler(async (req, res) => {
  const {building, address, floor, startDate, endDate, codSpace, userName} = req.body;

  if (!building|| !floor || !startDate || !endDate || !codSpace || !userName) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const booking = new Booking({ user: req.user._id, building, address, floor, startDate, endDate, codSpace, userName});

    const createdBooking = await booking.save();

    res.status(201).json(createdBooking);
  }
});

const ColleagueBooking = asyncHandler(async (req, res) => {
  const {building, address, floor, startDate, endDate, codSpace, userName} = req.body;

  if (!building|| !floor || !startDate || !endDate || !codSpace ||!userName) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const user = await User.findOne({userName})
    const userId = user._id
    const booking = new Booking({ user: userId, building, address, floor, startDate, endDate, codSpace, userName});

    const createdBooking = await booking.save();

    res.status(201).json(createdBooking);
  }})

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
  const {address, floor, date } = req.body;
  
  const booking = await Booking.findById(req.params.id);

  if (booking.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (booking) {
    booking.address = address;
    booking.floor = floor;
    booking.starDate = startDate;
    booking.endDate = endDate;
    booking.desk = desk;
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});


export { getBookingById, getBookings, CreateBooking, DeleteBooking, UpdateBooking, UserBookings, getFilteredBookings, ColleagueBooking};
