// const express = require('express');
import express from "express";
import {
  createOrder,
  getAllOrder,
  getOrder,
  getUserOrder,
  updateOrderStatus,
  orderSummary,
} from "../controllers/orderController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.route("/summary").get(protect, orderSummary);

router
  .route("/")
  .post(protect, createOrder)
  .get(protect, restrictTo("admin"), getAllOrder);

router.route("/user/:id").get(protect, getUserOrder);

router.route("/:id").get(protect, restrictTo("admin"), getOrder);

router
  .route("/status/:id")
  .patch(protect, updateOrderStatus);

export default router;
