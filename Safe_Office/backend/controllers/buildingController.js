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
    const building = await Building.find();
    res.json(building);
  });

  const getBuildingDesks = asyncHandler(async (req, res) => {

    const buildingDesks = await Building.findOne({address: req.params.address});

    if (buildingDesks) {
      res.json(buildingDesks);
    } else {
      res.status(404).json({ message: "Building not found" });
    }


  })
export {CreateBuilding, getBuildings, getBuildingDesks}