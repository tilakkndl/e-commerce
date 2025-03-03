
// import Order from '../models/orderSchema.js';
import Order from '../models/orderSchema.js'
import Product from '../models/productSchema.js';
import User from '../models/userSchema.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

// Create a new order
export const createOrder = catchAsync(async (req, res, next) => {
    const { user, orders } = req.body;

    if (!orders || orders.length === 0) {
        return res.status(400).json({ message: "At least one order item is required." });
    }

    let totalPrice = 0;

    const currentUser = await User.findById(user);

    if (!currentUser) {
        return next(new AppError("The user is not found", 400));
    }

    // Validate each order item
    await Promise.all(orders.map(async (order) => {
        const product = await Product.findById(order.product);

        if (!product) {
            return next(AppError(`Product not found for ID: ${order.product}`, 404));
        }


        const variant = product.variants.find(
            (variant) => variant._id.toString() === order.variant.toString()
        );

        if (!variant) {
            return next(new AppError(`Variant not found for product ID: ${order.product}`, 404));
        }

        if(variant.stock < order.quantity){
            return next(new AppError("The quantity you are ordering is not available now", 400));
        }

        if(!variant.size.includes(order.size)){
            return next(new AppError("The size you are ordering is not available now.", 404))
        }


        // Accumulate total price
        totalPrice += product.price * (100 - product.discount) / 100 * order.quantity;
    }));

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
        "processing",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned",
        "refunded",
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

//get all orders
export const getAllOrder = catchAsync(async(req, res, next)=>{
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: orders,
    });
})

//Get single Order
export const getOrder = catchAsync(async(req, res, next)=>{
    const orders = await Order.findById(req.params.id).populate("orders.product");
    
    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: orders,
    });
})

