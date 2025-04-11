"use client";

import { integralCF } from "@/styles/fonts";
import React, { useEffect, useState } from "react";
import { OrderItem } from "@/types/order.types";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks/redux";
import Cookies from "js-cookie";
import OrderCard from "@/components/common/orderCard";
import Link from "next/link";

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

        if (response.status === 200 && response.data.success) {
          setOrders(response.data.data);
        } else {
          setError("Failed to fetch orders.");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setError("No orders found");
        } else {
          setError("Error fetching your orders. Please try again later.");
        }
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
      {error && (
        <div className="text-center text-red-500">
          {error === "No orders found" ? (
            <div>
              <p>No orders found.</p>
              <Link href="/shop">
                <div className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300">
                  Go to Shop
                </div>
              </Link>
            </div>
          ) : (
            error
          )}
        </div>
      )}
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