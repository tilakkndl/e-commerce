import express from "express";
import {
  addSubscriber,
  unsubscribe,
  getSubscribers,
} from "../controllers/subscriberController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.post("/",protect, addSubscriber);
router.delete("/:email", protect, unsubscribe);
router.get("/", protect, restrictTo("admin"), getSubscribers);

export default router;
