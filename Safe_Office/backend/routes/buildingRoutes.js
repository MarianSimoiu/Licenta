import express from "express"
import {CreateBuilding} from '../controllers/buildingController.js'

const router = express.Router();

router.route("/addBuilding").post(CreateBuilding);

export default router;