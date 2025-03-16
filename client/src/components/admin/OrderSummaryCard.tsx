import { Summary } from "@/lib/features/admin/adminSlice";
import React from "react";

const OrderSummaryCard = ({ summary }: { summary: Summary }) => {
  return (
    <div className="max-w-md border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Total Orders:</span>
          <span className="text-lg">{summary.totalOrders}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Total Amount:</span>
          <span className="text-lg">${summary.totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
