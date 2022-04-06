import Building from "../models/BuildingModel.js";
import asyncHandler from "express-async-handler";

const CreateBuilding = asyncHandler(async (req, res) => {
    const { address,noFloors, floors} = req.body;
  
    if ( !address || !noFloors|| !floors) {
      res.status(400);
      throw new Error("Please Fill all the feilds");
      return;
    } else {
      const building = new Building({ address,noFloors, floors});
  
      const createdBuilding = await building.save();
  
      res.status(201).json(createdBuilding);
    }
  });

  const getBuildings = asyncHandler(async (req, res) => {
    const filter = {};
    const building = await Building.find(filter);
  
    if (building) {
      res.json(building);
    } else {
      res.status(404).json({ message: "Buildings not found" });
    }
  
    res.json(building);
  });
export {CreateBuilding, getBuildings}