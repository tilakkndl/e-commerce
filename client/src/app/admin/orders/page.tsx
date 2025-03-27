"use client";

import { fetchAllOrders } from "@/lib/features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import React, { useEffect } from "react";
import { integralCF } from "@/styles/fonts";
import OrderCard from "@/components/admin/OrderCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";

const AdminOrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.admin.orders);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8">
      <h1
        className={`text-3xl font-bold mb-8 text-gray-900 ${integralCF.className} sm:text-4xl`}
      >
        Admin Orders
      </h1>
      <div className="space-y-6 w-fit mx-auto">
        {orders?.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <p className="text-lg text-gray-600">No orders found</p>
            <Button
              onClick={() => router.push("/shop")}
              className="flex items-center space-x-2 bg-black hover:bg-black/80"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Go to Shop</span>
            </Button>
          </div>
        ) : (
          orders?.map((order) => <OrderCard order={order} key={order._id} />)
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
