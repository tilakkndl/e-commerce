// const express = require('express');
import express from 'express';
import { createOrder, getAllOrder, getOrder, getUserOrder, updateOrderStatus, orderSummary } from '../controllers/orderController.js';
import {protect, restrictTo} from '../controllers/authController.js'

const router = express.Router();

// router.get("/product-order",protect, restrictTo("admin"), totalProductOrder);
// router.get("/summary",protect, restrictTo("admin"), orderSummary);
// router.post('/',protect, createOrder);
// router.patch('/status/:id',protect, updateOrderStatus);
// router.get("/",protect, restrictTo("admin"), getAllOrder)
// router.get("/:id", getOrder);
// router.route("/user/:id").get(protect, restrictTo("admin"), getUserOrder);

// router.route("/product-order")
//   .get(protect, restrictTo("admin"), totalProductOrder);

router.route("/summary")
  .get(protect, restrictTo("admin"), orderSummary);

router.route("/")
  .post(protect, createOrder)
  .get(protect, restrictTo("admin"), getAllOrder);

router.route("/user/:id")
  .get(protect, restrictTo("admin"), getUserOrder);

router.route("/:id")
  .get(getOrder)
  .patch(protect, updateOrderStatus);


export default router;
