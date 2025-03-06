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

// Create a review
router.post("/", protect, createReview);

// Update a review
router.put("/:id",protect, updateReview);

// Delete a review
router.delete("/:id",protect, deleteReview);

// Get a single review
router.get("/:id", getReview);

// Get all reviews for a product
router.get("/product/:productId", getReviewsByProduct);

export default router;
