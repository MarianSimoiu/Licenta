import express from "express"
import {CreateBuilding, getBuildingDesks, getBuildings} from '../controllers/buildingController.js'
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/addBuilding").post(CreateBuilding);
router.route("/").get(getBuildings);
router.route("/:address").get(getBuildingDesks);
export default router;