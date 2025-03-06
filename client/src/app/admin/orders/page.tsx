"use client";

import { fetchAllOrders } from "@/lib/features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import React, { useEffect } from "react";

import { integralCF } from "@/styles/fonts";
import OrderCard from "@/components/admin/OrderCard";

const AdminOrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.admin.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);
  console.log(orders);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8">
      <h1
        className={`text-3xl font-bold mb-8 text-gray-900 ${integralCF.className} sm:text-4xl`}
      >
        Admin Orders
      </h1>
      <div className="space-y-6 w-fit mx-auto">
        {orders.map((order) => (
          <OrderCard order={order} key={order._id} />
        ))}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
