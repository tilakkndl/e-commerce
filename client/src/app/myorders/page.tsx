"use client";

import { integralCF } from "@/styles/fonts";
import React, { useEffect, useState } from "react";
import { OrderItem } from "@/types/order.types";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks/redux";
import Cookies from "js-cookie";
import OrderCard from "@/components/common/orderCard";

const Page = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = useAppSelector((state) => state.user._id);
  const token = Cookies.get("authToken");

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_ROOT_API}/orders/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          console.log("response", response.data);
          setOrders(response.data.data); // Assuming the orders are in response.data.data based on typical API structure
        } else {
          setError("Failed to fetch orders.");
        }
      } catch (error) {
        console.error("Error fetching user orders:", error);
        setError("Error fetching your orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchUserOrders();
    } else {
      setError("User not authenticated. Please log in.");
      setLoading(false);
    }
  }, [userId, token]); // Dependencies to re-fetch if userId or token changes

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-center">
        <h1
          className={`text-3xl font-bold mb-8 text-gray-900 ${integralCF.className} sm:text-4xl`}
        >
          Your Orders
        </h1>
      </div>

      {loading && (
        <div className="text-center text-gray-600">Loading your orders...</div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}
      {!loading && !error && orders.length === 0 && (
        <div className="text-center text-gray-600">No orders found.</div>
      )}
      {!loading && !error && orders.length > 0 && (
        <div className="space-y-6 w-fit mx-auto">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
