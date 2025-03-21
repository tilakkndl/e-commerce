import { OrderItem } from "@/types/order.types";
import React from "react";

import Image from "next/image";

const OrderCard = ({ order }: { order: OrderItem }) => {
  return (
    <div
      key={order._id}
      className="bg-white shadow-lg rounded-2xl p-5 border-2 border-black/30 hover:shadow-xl transition-all duration-300 w-full max-w-4xl mx-auto"
    >
      {/* Order Header */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Order: {order._id}
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === "confirmed"
                ? "bg-green-100 text-green-800"
                : order.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : order.status === "cancelled"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-6 w-full md:w-auto">
        {order.orders.map((item) => (
          <div
            key={item._id}
            className="flex items-center mb-3 sm:mb-4 last:mb-0"
          >
            {item.variant?.gallery.length > 0 && (
              <Image
                src={item.variant.gallery[0].url}
                alt={`${item.product.name} variant`}
                width={60}
                height={60}
                className="rounded-lg object-cover mr-4 sm:mr-6 aspect-square"
              />
            )}
            <div className="flex-1">
              <p className="text-sm sm:text-base font-medium text-gray-900">
                {item.product.name}
              </p>
              <div className="text-xs sm:text-sm text-gray-600 flex items-center space-x-2">
                <span
                  className="w-4 h-4 rounded-full inline-block"
                  style={{ backgroundColor: item.variant?.hexColor }}
                ></span>
                <span>
                  Color: {item.variant?.color} (Size: {item.size}, Qty:{" "}
                  {item.quantity})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm sm:text-base text-gray-700 space-y-1">
        <p>
          <strong className="font-bold text-black/90">Total Price:</strong> $
          {order.totalPrice.toFixed(2)}
        </p>
        <div className="text-sm text-gray-600 space-y-1">
          <p className="text-gray-500 text-xs sm:text-sm">
            Created: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
