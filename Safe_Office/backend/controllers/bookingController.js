import Booking from "../models/BookingModel.js";
import asyncHandler from "express-async-handler";
import Building from "../models/BuildingModel.js";

// @desc    Get logged in user notes
// @route   GET /api/notes
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

//@description     Create single Note
//@route           GET /api/notes/create
//@access          Private
const CreateBooking = asyncHandler(async (req, res) => {
  const {address, floor, date, floorSeat} = req.body;

  if (!city || !address || !floor || !date || !floorSeat) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const booking = new Booking({ user: req.user._id, address, floor, date, floorSeat });

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
  const {address, floor, date } = req.body;

  const booking = await Booking.findById(req.params.id);

  if (booking.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (booking) {
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

const trigger = asyncHandler (async(req, res)  => {
})
 /*
  Booking.find({date:{"$lte":new Date()}}).then((booking) => {
       booking.forEach((booking) => {
         res.json(booking);
       })
  })
});
  */
 // for await (let item of Bookings)



  //res.json(expired_bookings)

  //const building = await Building.findOne({address: booking.address, floors: { floorNo: booking.floor, desks:{ deskNo: booking.desk} }});
  //res.json(building);
  //})


export { getBookingById, getBookings, CreateBooking, DeleteBooking, UpdateBooking, getActiveBookingByUser, getHistoryBookingByUser, trigger};
