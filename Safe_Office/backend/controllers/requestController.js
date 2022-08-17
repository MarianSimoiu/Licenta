import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Request from "../models/requestModel.js";


const getRequest = asyncHandler(async (req, res) => { 
    const request = await Request.find();
    res.json(request);
})

const createRequest = asyncHandler(async (req, res) => {
    const { user, dcc} = req.body;

    if (!user || !dcc) {
      res.status(400);
      throw new Error("Please Fill all the feilds");
      return;
    } else {
      const request = new Request({ user, dcc});
  
      const createdRequest = await request.save();
  
      res.status(201).json(createdRequest);
    }
})

export { getRequest, createRequest}