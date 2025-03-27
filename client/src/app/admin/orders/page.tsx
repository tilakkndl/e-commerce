"use client";

import { fetchAllOrders } from "@/lib/features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import React, { useEffect } from "react";
import { integralCF } from "@/styles/fonts";
import OrderCard from "@/components/admin/OrderCard";
import { Loader2 } from "lucide-react";

const AdminOrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.admin.orders);
  const loading = useAppSelector((state) => state.admin.loading);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8">
      <h1
        className={`text-3xl font-bold mb-8 text-gray-900 ${integralCF.className} sm:text-4xl`}
      >
        Admin Orders
      </h1>
      <div className="space-y-6 w-fit mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-black" />
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        ) : orders?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg text-gray-600">No orders found</p>
          </div>
        ) : (
          orders?.map((order) => <OrderCard order={order} key={order._id} />)
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
