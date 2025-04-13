import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import {protect, restrictTo} from '../controllers/authController.js'

const router = express.Router();

router.route("/")
  .post(protect, restrictTo("admin"),createCategory)  
  .get(protect,getAllCategories); 

router.route("/:id")
  .get(protect, restrictTo("admin"),getCategoryById)   
  .put(protect, restrictTo("admin"),updateCategory)  
  .delete(protect, restrictTo("admin"),deleteCategory); 

export default router;
