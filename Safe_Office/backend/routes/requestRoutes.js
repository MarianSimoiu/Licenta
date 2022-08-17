import express from "express";
import { createRequest, getRequest ,DeleteRequest} from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.route("/").get(protect, getRequest)
router.route("/:id").delete(DeleteRequest)
router.route("/create-requests").post(protect, createRequest);
export default router;