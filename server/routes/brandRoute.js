import express from "express";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";

import {protect, restrictTo} from '../controllers/authController.js'

const router = express.Router();

router.route("/")
  .post( protect, restrictTo("admin"),createBrand)  
  .get( protect, restrictTo("admin"),getAllBrands); 

router.route("/:id")
  .get( protect, restrictTo("admin"),getBrandById)   
  .put( protect, restrictTo("admin"),updateBrand)  
  .delete( protect, restrictTo("admin"),deleteBrand); 

export default router;
