// const express = require('express');
import express from 'express';
import { createOrder, getAllOrder, getOrder, getUserOrder, updateOrderStatus } from '../controllers/orderController.js';
import {protect, restrictTo} from '../controllers/authController.js'

const router = express.Router();

router.post('/',protect, createOrder);
router.patch('/status/:id',protect, updateOrderStatus);
router.get("/",protect, restrictTo("admin"), getAllOrder)
router.get("/:id", getOrder);
router.route("/user/:id").get(protect, restrictTo("admin"), getUserOrder);

export default router;
