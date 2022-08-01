import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,
  getUsers,
  addPermission
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/").get(protect, getUsers);
router.route("/profile").post(protect, updateUserProfile);
router.route("/profile/addPermission").put(protect, addPermission);

export default router;
