import express from "express";
import {
  createReview,
  updateReview,
  deleteReview,
  getReview,
  getReviewsByProduct,
} from "../controllers/reviewController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.route("/")
.post(protect, createReview)
// .get(protect, getReview);

router.route("/:id")
.put(protect, updateReview)
.delete(protect, deleteReview)
.get(protect, getReview);


// Get all reviews for a product
router.get("/product/:productId", getReviewsByProduct);

export default router;
