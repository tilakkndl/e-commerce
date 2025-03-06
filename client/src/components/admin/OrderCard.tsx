import { OrderItem, OrderResponse } from "@/types/order.types";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

const OrderCard = ({ order }: { order: OrderItem }) => {
  const [selectedStatus, setSelectedStatus] = useState("verified");
  const token = Cookies.get("authToken") as string | undefined;

  const [loading, setLoading] = useState<boolean>(false);
  const handleStatusChange = async (orderId: string, status: string) => {
    setLoading(true);
    console.log(selectedStatus);
    try {
      const response = await axios.patch<OrderResponse>(
        `${process.env.NEXT_PUBLIC_ROOT_API}/orders/status/${orderId}`,
        {
          status: selectedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success === true) {
        setLoading(false);
        alert(`Status changed to ${selectedStatus} successfully`);
      }
    } catch (error) {
      setLoading(false);
      alert("Failed to change the status");
    }
  };
  return (
    <div
      key={order._id}
      className="flex flex-col space-x-4 space-y-2 md:flex-row bg-white shadow-md rounded-xl p-4  border border-gray-200 hover:shadow-lg transition-all duration-300 w-full"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center  w-fit">
        {/* Order Header */}
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-semibold w-fit text-gray-800 mb-2">
            Order: <br />#{order._id}
          </h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Customer:</strong> {order.user.name} (
              {order.user.username})
            </p>
            <p>
              <strong>Address:</strong> {order.user.address}
            </p>
            <p>
              <strong>Phone:</strong> {order.user.phoneNumber}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              Created: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              Updated: {new Date(order.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-4 sm:mb-6 w-fit min-w-64 ">
        {order.orders.map((item) => (
          <div
            key={item._id}
            className="flex items-center mb-3 sm:mb-4 last:mb-0"
          >
            {item.variant.gallery.length > 0 && (
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
                  style={{ backgroundColor: item.variant.hexColor }}
                ></span>
                <span>
                  Color: {item.variant.color} (Size: {item.size}, Qty:{" "}
                  {item.quantity})
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="text-sm sm:text-base text-gray-700 space-y-1">
          <p>
            <strong className="font-bold text-black/90">Total Price:</strong> $
            {order.totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Order Details and Actions */}

      <div className="flex flex-col  gap-2 min-w-64 sm:w-auto">
        {/* Status Badge */}
        <div className="flex items-center space-x-2 px-2">
          <span>Status:</span>
          <span
            className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium w-fit ${
              order.status === "confirmed"
                ? "bg-green-500 text-white"
                : order.status === "pending"
                ? "bg-yellow-500 text-white"
                : order.status === "cancelled"
                ? "bg-red-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {order.status}
          </span>
        </div>
        <Select
          value={selectedStatus}
          onValueChange={(value) => setSelectedStatus(value)}
        >
          <SelectTrigger className="md:w-full sm:w-[180px] border-gray-300 rounded-lg focus:ring-2 focus:ring-black/90 focus:border-black/90">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem> */}
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => handleStatusChange(order._id, selectedStatus)}
          className="bg-black/80 text-white rounded-lg px-4 py-2 text-sm sm:text-base w-full sm:w-auto hover:bg-black/70 transition-colors"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <div>
              Mark as{" "}
              {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default OrderCard;
