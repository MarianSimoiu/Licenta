import express from "express"
import {CreateBuilding, getBuildings} from '../controllers/buildingController.js'
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/addBuilding").post(protect,CreateBuilding);
router.route("/").get(protect,getBuildings);
export default router;