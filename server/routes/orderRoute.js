// const express = require('express');
import express from 'express';
import { createOrder, getAllOrder, getOrder, updateOrderStatus } from '../controllers/orderController.js';
import {protect} from '../controllers/authController.js'

const router = express.Router();

router.post('/',protect, createOrder);
router.patch('/status/:id',protect, updateOrderStatus);
router.get("/", getAllOrder)
router.get("/:id", getOrder);

export default router;
