import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,
  getUsers,
  addPermission,
  sendEmail,
  updateStatus
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/").get(protect, getUsers);
router.route("/send-email").get(sendEmail);
router.route("/profile").post(protect, updateUserProfile);
router.route("/profile/addPermission").put(protect, addPermission);
router.route("/status/:id").put(updateStatus)

export default router;
