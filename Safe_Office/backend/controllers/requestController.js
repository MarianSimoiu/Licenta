import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Request from "../models/requestModel.js";


const getRequest = asyncHandler(async (req, res) => { 
    const request = await Request.find();
    res.json(request);
    
})

const getColleague = asyncHandler(async (req, res) =>{
    const {name} = req.params
    const request = await User.find({permission: name})

    if(request)
      res.json(request)
    else {
      res.status(404);
      throw new Error("Request not Found");
    }
})
const DeleteRequest = asyncHandler(async (req, res) => {

  const request = await Request.findById(req.params.id);

  if (request) {
    await request.remove();
    res.json({ message: "Request Removed" });
  } else {
    res.status(404);
    throw new Error("Request not Found");
  }
})

const createRequest = asyncHandler(async (req, res) => {
    const { user, dcc, date} = req.body;

    if (!user || !dcc) {
      res.status(400);
      throw new Error("Please Fill all the feilds");
      return;
    } else {
      const request = new Request({ user, dcc, date});
  
      const createdRequest = await request.save();
  
      res.status(201).json(createdRequest);
    }
})

export { getRequest, createRequest, DeleteRequest, getColleague}