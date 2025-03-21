"use client";
import { fetchSummary } from "@/lib/features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { integralCF } from "@/styles/fonts";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { FaBoxOpen } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { BsBox } from "react-icons/bs";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { summary, loading, error } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchSummary());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-red-500 text-center">
          Error: {error}
          <br />
          <button
            onClick={() => dispatch(fetchSummary())}
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80"
          >
            Try Again
          </button>
        </p>
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className={`text-4xl font-bold ${integralCF.className}`}>
        Dashboard Overview
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Orders Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-black/60 font-medium mb-1">Total Orders</p>
              <h3 className="text-3xl font-bold">{summary.totalOrders}</h3>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl">
              <FaBoxOpen className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Total Amount Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-black/60 font-medium mb-1">Total Revenue</p>
              <h3 className="text-3xl font-bold">
                $
                {summary.totalAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h3>
            </div>
            <div className="bg-green-50 p-3 rounded-xl">
              <MdAttachMoney className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* Total Products Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-black/60 font-medium mb-1">Total Products</p>
              <h3 className="text-3xl font-bold">
                {Object.keys(summary.productOrders).length}
              </h3>
            </div>
            <div className="bg-purple-50 p-3 rounded-xl">
              <BsBox className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Orders Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
        <h2 className="text-xl font-bold mb-4">Product Orders Breakdown</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(summary.productOrders).map(([product, count]) => (
            <div
              key={product}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex-1">
                <p className="font-medium text-black/80">{product}</p>
                <p className="text-sm text-black/60">Orders: {count}</p>
              </div>
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <BsBox className="h-5 w-5 text-black/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
