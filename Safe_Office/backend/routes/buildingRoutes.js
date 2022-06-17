import express from "express"
import {CreateBuilding, getBuildingById, getBuildings} from '../controllers/buildingController.js'
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/addBuilding").post(CreateBuilding);
router.route("/").get(getBuildings);
router.route("/:id").get(getBuildingById);
export default router;