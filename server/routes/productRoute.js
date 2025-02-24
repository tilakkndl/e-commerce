import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReview,
  deleteReview,
  addVariant,
  updateVariant,
  deleteVariant
} from "../controllers/productController.js";

import upload  from "../middleware/upload.js";  
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// ✅ CRUD for Products
router.route("/")
  .post(protect, restrictTo("admin"), upload.array("gallery", 5), createProduct)
  .get(getAllProducts);

router.route("/:id")
  .get(getProductById)
  .put(protect, restrictTo("admin"), updateProduct)
  .delete(protect, restrictTo("admin"), deleteProduct);

// ✅ Review Routes
router.route("/:id/reviews")
  .post(protect, addReview)
  .delete(protect, deleteReview);

// ✅ Variant Routes
router.route("/:id/variants")
  .post(protect, restrictTo("admin"), addVariant);

router.route("/:id/variants/:variantId")
  .put(protect, restrictTo("admin"), updateVariant)
  .delete(protect, restrictTo("admin"), deleteVariant);

export default router;
