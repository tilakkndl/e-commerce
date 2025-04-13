import mongoose from "mongoose";
import Order from "../models/orderSchema.js";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";

export const formatOrders = async (orders) => {
  return Promise.all(
    orders.map(async (order) => {
      const orderObject =
        order instanceof mongoose.Document ? order.toObject() : order;

      // Filter out orders where the product is deleted
      const filteredOrders = await Promise.all(
        orderObject.orders.map(async (orderItem) => {
          const product = await Product.findById(orderItem.product).lean();

          // If the product is deleted or doesn't exist, exclude this orderItem
          if (!product) {
            return null;
          }

          let selectedVariant;
          if (product) {
            selectedVariant = product.variants.find(
              (variant) =>
                variant._id.toString() === orderItem.variant.toString()
            );
          }

          return {
            ...orderItem,
            product: {
              name: product.name,
            },
            variant: selectedVariant,
          };
        })
      );

      // Remove any null values from the filtered orders
      const validOrders = filteredOrders.filter(
        (orderItem) => orderItem !== null
      );
      if (validOrders.length === 0) {
        return null;
      }

      return {
        ...orderObject,
        orders: validOrders,
      };
    })
  ).then((formattedOrders) =>
    formattedOrders.filter((order) => order !== null)
  );
};
// Create a new order
export const createOrder = catchAsync(async (req, res, next) => {
  const { user, orders } = req.body;

  if (!orders || orders.length === 0) {
    // return res.status(400).json({ message: "At least one order item is required." });
    return next(new AppError("At least one order item is required.", 400));
  }

  let totalPrice = 0;

  if (req.user._id.toString() !== user) {
    return next(
      new AppError("You are not allowed to place order for another user", 403)
    );
  }

  const currentUser = await User.findById(user);

  if (!currentUser) {
    return next(new AppError("The user is not found", 400));
  }

  // Validate each order item
  await Promise.all(
    orders.map(async (order) => {
      const product = await Product.findById(order.product);

      if (!product) {
        return next(
          AppError(`Product not found for ID: ${order.product}`, 404)
        );
      }

      const variant = product.variants.find(
        (variant) => variant._id.toString() === order.variant.toString()
      );

      if (!variant) {
        return next(
          new AppError(
            `Variant not found for product ID: ${order.product}`,
            404
          )
        );
      }

      if (variant.stock < order.quantity) {
        return next(
          new AppError(
            "The quantity you are ordering is not available now",
            400
          )
        );
      }

      if (!variant.size.includes(order.size)) {
        return next(
          new AppError("The size you are ordering is not available now.", 404)
        );
      }

      // Accumulate total price
      totalPrice +=
        ((product.price * (100 - product.discount)) / 100) * order.quantity;
    })
  );

  // Round the total price to 2 decimal places
  totalPrice = parseFloat(totalPrice.toFixed(2));

  const newOrder = await Order.create({
    user,
    orders,
    totalPrice,
  });

  res.status(201).json({
    success: true,
    message: "Order placed successfully.",
    data: newOrder,
  });
});

// Update Order Status
export const updateOrderStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = [
    "pending",
    "confirmed",
    "verified",
    "shipped",
    // "out_for_delivery",
    "delivered",
    "cancelled",
    // "returned",
    // "refunded",
  ];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid order status." });
  }

  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }

  order.status = status;
  await order.save();

  res.status(200).json({
    success: true,
    message: `Order status updated to ${status}.`,
    data: order,
  });
});

export const getAllOrder = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Order.find().populate("user", "name username address phoneNumber").lean(),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const orders = await features.query;

  const formattedOrders = await formatOrders(orders);

  res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
    data: formattedOrders,
  });
});

export const getOrder = catchAsync(async (req, res, next) => {
  let order = await Order.findById(req.params.id)
    .populate("user", "name username address phoneNumber")
    .select("-__v")
    .lean();

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  const formattedOrder = await formatOrders([order]);

  res.status(200).json({
    success: true,
    message: "Order retrieved successfully",
    data: formattedOrder[0],
  });
});

export const getUserOrder = catchAsync(async (req, res, next) => {
    if(req.user.id.toString() !== req.params.id){
        return next(new AppError("You are not allowed to view orders of another user", 403));
    }
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 }) 
      .populate("user", "name username address phoneNumber")
      .lean();
  
    if (orders.length === 0) {
    return next(new AppError("No orders found", 404));
  }

  const formattedOrders = await formatOrders(orders);

  res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
    data: formattedOrders,
  });
});

// Get order summary
export const orderSummary = catchAsync(async (req, res, next) => {
  // Fetch and process orders
  const features = new APIFeatures(
    Order.find().populate("user", "name username address phoneNumber").lean(),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const orders = await features.query;
  console.log(orders);
  orders.forEach((order) => {
    console.log(order.orders);
  });

  if (orders.length === 0) {
    return next(new AppError("No orders found", 404));
  }

  const formattedOrders = await formatOrders(orders);

  // Calculate total orders and total amount
  const totalOrders = formattedOrders.length;
  const totalAmount = formattedOrders.reduce(
    (acc, order) => acc + order.totalPrice,
    0
  );

  // Calculate total product orders
  const productOrders = formattedOrders.reduce((acc, order) => {
    order.orders.forEach((orderItem) => {
      const productName = orderItem.product.name; // Get product name as key
      if (!acc[productName]) {
        acc[productName] = 0;
      }
      acc[productName] += orderItem.quantity;
    });
    return acc;
  }, {});

  res.status(200).json({
    success: true,
    message: "Order summary retrieved successfully",
    data: {
      totalOrders,
      totalAmount,
      productOrders,
    },
  });
});
