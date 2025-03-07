import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      orders: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          variant: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
          size: {
            type: String,
            required: true,
            enum: ["XS", "SM", "MD", "LG", "XL", "2XL", "3XL"],
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],
      status: {
        type: String,
        enum: [
          "pending",
          "confirmed",
          "verified",
          "shipped",
          // "out_for_delivery",
          "delivered",
          "cancelled",
          // "returned",
          // "refunded",
        ],
        default: "pending",
      },
      totalPrice: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    { timestamps: true }
  );
  const Order = mongoose.model("Order", orderSchema);
export default Order;
