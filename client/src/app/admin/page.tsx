"use client";
import OrderSummaryCard from "@/components/admin/OrderSummaryCard";
import { fetchSummary } from "@/lib/features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { integralCF } from "@/styles/fonts";
import { useEffect } from "react";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { summary, loading, error } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchSummary());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className={`text-4xl font-bold mb-6 ${integralCF.className}`}>
        Dashboard
      </h1>

      {loading && <p>Loading summary...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && <OrderSummaryCard summary={summary} />}
    </div>
  );
};

export default AdminDashboard;
