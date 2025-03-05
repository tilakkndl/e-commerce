"use client";
import { fetchAllOrders } from "@/lib/features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import React, { useEffect, useState } from "react";

const AdminOrdersPage = () => {
  const initialOrders = [
    {
      order_id: 1,
      user_id: 3,
      product_id: 4,
      quantity: 25,
      color_id: 4,
      created_at: "2024/12/4;05:02:27",
      status: "new", // Added "new" status
    },
    {
      order_id: 2,
      user_id: 1,
      product_id: 3,
      quantity: 10,
      color_id: 2,
      created_at: "2024/12/5;08:15:10",
      status: "new", // Added "new" status
    },
    {
      order_id: 3,
      user_id: 2,
      product_id: 5,
      quantity: 5,
      color_id: 1,
      created_at: "2024/12/6;10:22:33",
      status: "new", // Added "new" status
    },
    {
      order_id: 4,
      user_id: 4,
      product_id: 1,
      quantity: 15,
      color_id: 3,
      created_at: "2024/12/7;12:30:45",
      status: "new", // Added "new" status
    },
    {
      order_id: 5,
      user_id: 6,
      product_id: 2,
      quantity: 8,
      color_id: 2,
      created_at: "2024/12/8;14:05:12",
      status: "new", // Added "new" status
    },
    {
      order_id: 6,
      user_id: 5,
      product_id: 6,
      quantity: 20,
      color_id: 1,
      created_at: "2024/12/9;16:40:59",
      status: "new", // Added "new" status
    },
    {
      order_id: 7,
      user_id: 7,
      product_id: 1,
      quantity: 12,
      color_id: 3,
      created_at: "2024/12/10;09:15:24",
      status: "new", // Added "new" status
    },
    {
      order_id: 8,
      user_id: 8,
      product_id: 4,
      quantity: 18,
      color_id: 4,
      created_at: "2024/12/11;11:50:11",
      status: "new", // Added "new" status
    },
    {
      order_id: 9,
      user_id: 3,
      product_id: 5,
      quantity: 7,
      color_id: 1,
      created_at: "2024/12/12;13:25:30",
      status: "new", // Added "new" status
    },
    {
      order_id: 10,
      user_id: 9,
      product_id: 6,
      quantity: 30,
      color_id: 2,
      created_at: "2024/12/13;15:00:43",
      status: "new", // Added "new" status
    },
    {
      order_id: 11,
      user_id: 10,
      product_id: 2,
      quantity: 22,
      color_id: 1,
      created_at: "2024/12/14;16:45:07",
      status: "new", // Added "new" status
    },
    {
      order_id: 12,
      user_id: 11,
      product_id: 3,
      quantity: 14,
      color_id: 4,
      created_at: "2024/12/15;17:30:28",
      status: "new", // Added "new" status
    },
    {
      order_id: 13,
      user_id: 12,
      product_id: 6,
      quantity: 5,
      color_id: 2,
      created_at: "2024/12/16;19:10:56",
      status: "new", // Added "new" status
    },
    {
      order_id: 14,
      user_id: 13,
      product_id: 1,
      quantity: 10,
      color_id: 3,
      created_at: "2024/12/17;20:20:17",
      status: "new", // Added "new" status
    },
    {
      order_id: 15,
      user_id: 14,
      product_id: 4,
      quantity: 16,
      color_id: 4,
      created_at: "2024/12/18;21:05:45",
      status: "new", // Added "new" status
    },
    {
      order_id: 16,
      user_id: 15,
      product_id: 5,
      quantity: 8,
      color_id: 1,
      created_at: "2024/12/19;22:45:59",
      status: "new", // Added "new" status
    },
    {
      order_id: 17,
      user_id: 16,
      product_id: 2,
      quantity: 25,
      color_id: 2,
      created_at: "2024/12/20;23:30:35",
      status: "new", // Added "new" status
    },
    {
      order_id: 18,
      user_id: 17,
      product_id: 3,
      quantity: 4,
      color_id: 4,
      created_at: "2024/12/21;05:00:19",
      status: "new", // Added "new" status
    },
    {
      order_id: 19,
      user_id: 18,
      product_id: 6,
      quantity: 13,
      color_id: 1,
      created_at: "2024/12/22;06:40:05",
      status: "new", // Added "new" status
    },
    {
      order_id: 20,
      user_id: 19,
      product_id: 4,
      quantity: 9,
      color_id: 3,
      created_at: "2024/12/23;07:50:39",
      status: "new", // Added "new" status
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const dispatch = useAppDispatch();
  const newOrders = useAppSelector((state) => state.admin.orders);

  console.log("newOrderss", newOrders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  const handleStatusChange = (orderId: number, status: string) => {
    const updatedOrders = orders.map((order) =>
      order.order_id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-xl font-semibold mb-4">Admin Orders</h1>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2 text-left">Order ID</th>
            <th className="border-b p-2 text-left">User ID</th>
            <th className="border-b p-2 text-left">Product ID</th>
            <th className="border-b p-2 text-left">Quantity</th>
            <th className="border-b p-2 text-left">Color ID</th>
            <th className="border-b p-2 text-left">Created At</th>
            <th className="border-b p-2 text-left">Status</th>
            <th className="border-b p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td className="border-b p-2">{order.order_id}</td>
              <td className="border-b p-2">{order.user_id}</td>
              <td className="border-b p-2">{order.product_id}</td>
              <td className="border-b p-2">{order.quantity}</td>
              <td className="border-b p-2">{order.color_id}</td>
              <td className="border-b p-2">{order.created_at}</td>
              <td className="border-b p-2">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.order_id, e.target.value)
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="new">New</option>
                  <option value="viewed">Viewed</option>
                  <option value="processed">Processed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="canceled">Canceled</option>
                </select>
              </td>
              <td className="border-b p-2">
                <button
                  onClick={() =>
                    handleStatusChange(order.order_id, "processed")
                  }
                  className="bg-blue-500 text-white rounded px-4 py-2"
                >
                  Mark as Processed
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrdersPage;
