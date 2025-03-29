"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { Loader2, Trash2 } from "lucide-react";
import { integralCF } from "@/styles/fonts";
import axios from "axios";
import Cookies from "js-cookie";
import { showToast } from "@/lib/features/toast/toastSlice";
import { openModal, closeModal } from "@/lib/features/modal/modalSlice";
import { withAdminAuth } from "@/lib/hooks/withAdminAuth";

interface Subscriber {
  _id: string;
  email: string;
  subscribedAt: string;
}

function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingEmail, setDeletingEmail] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const fetchSubscribers = async () => {
    const token = Cookies.get("authToken");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ROOT_API}/subscriber`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubscribers(response.data.data);
    } catch (error: any) {
      dispatch(
        showToast({
          message:
            error.response?.data?.message || "Failed to fetch subscribers",
          type: "error",
          duration: 3000,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDeleteConfirm = async (subscriberEmail: string) => {
    setDeletingEmail(subscriberEmail);
    const token = Cookies.get("authToken");
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_ROOT_API}/subscriber/${subscriberEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        showToast({
          message: "Subscriber deleted successfully",
          type: "success",
          duration: 3000,
        })
      );
      dispatch(closeModal());
      fetchSubscribers(); // Refresh the list
    } catch (error: any) {
      dispatch(
        showToast({
          message:
            error.response?.data?.message || "Failed to delete subscriber",
          type: "error",
          duration: 3000,
        })
      );
    } finally {
      setDeletingEmail(null);
    }
  };

  const handleDeleteClick = (subscriber: Subscriber) => {
    dispatch(
      openModal(
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Delete Subscriber</h2>
          <p className="mb-6 text-gray-600">
            Are you sure you want to delete this subscriber?
            <br />
            <span className="font-semibold">Email: {subscriber.email}</span>
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => dispatch(closeModal())}
              className="px-6 py-2 rounded-full border border-black hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!!deletingEmail}
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteConfirm(subscriber.email)}
              disabled={!!deletingEmail}
              className="px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
            >
              {deletingEmail === subscriber.email ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                "Delete Subscriber"
              )}
            </button>
          </div>
        </div>
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-black" />
          <p className="mt-4 text-gray-600">Loading subscribers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8">
      <h1 className={`text-3xl font-bold mb-8 ${integralCF.className}`}>
        Newsletter Subscribers
      </h1>

      {subscribers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No subscribers found</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Subscribed Date</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr key={subscriber._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{subscriber.email}</td>
                  <td className="px-6 py-4">
                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteClick(subscriber)}
                      className="text-red-500 hover:text-red-700 disabled:opacity-50"
                      disabled={!!deletingEmail}
                    >
                      {deletingEmail === subscriber.email ? (
                        <Loader2 className="w-5 h-5 animate-spin inline" />
                      ) : (
                        <Trash2 className="w-5 h-5 inline" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default withAdminAuth(SubscribersPage);
