"use client";
import React, { useState, useEffect } from "react";
import { Trash, Edit, Loader2 } from "lucide-react";
import Link from "next/link";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import Product from "@/types/product.types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import {
  deleteProductById,
  fetchAllProducts,
} from "@/lib/features/admin/adminSlice";
import { integralCF } from "@/styles/fonts";
import { openModal, closeModal } from "@/lib/features/modal/modalSlice";
import { withAdminAuth } from "@/lib/hooks/withAdminAuth";

function AdminProductsPage() {
  const [ellipsisToggle, setEllipsisToggle] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null
  );
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.admin.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleDeleteConfirm = async (productId: string) => {
    setDeletingProductId(productId);
    try {
      await dispatch(deleteProductById(productId)).unwrap();
      dispatch(closeModal());
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product. Please try again.");
    } finally {
      setDeletingProductId(null);
    }
  };

  const handleDeleteClick = (product: Product) => {
    dispatch(
      openModal(
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
          <p className="mb-6 text-gray-600">
            Are you sure you want to delete this product?
            <br />
            <span className="font-semibold">Product: {product.name}</span>
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => dispatch(closeModal())}
              className="px-6 py-2 rounded-full border border-black hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!!deletingProductId}
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteConfirm(product._id)}
              disabled={!!deletingProductId}
              className="px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
            >
              {deletingProductId === product._id ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                "Delete Product"
              )}
            </button>
          </div>
        </div>
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h1 className={`text-4xl font-semibold ${integralCF.className}`}>
          Products
        </h1>
        <div className="relative md:hidden">
          <IoEllipsisVerticalSharp
            size={24}
            onClick={() => setEllipsisToggle(!ellipsisToggle)}
          />
          {ellipsisToggle && (
            <div className="absolute top-full right-0 bg-white border p-2 rounded-lg">
              <Link href="./products/addProduct" className="block p-2">
                Add Products
              </Link>
            </div>
          )}
        </div>
        <div className="hidden md:flex space-x-3">
          <Link
            href="./products/addProduct"
            className="border p-2 hover:bg-black hover:text-white"
          >
            Add Products
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-center">Discount</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50 ">
                <td className="py-3 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={product.status === "active"}
                    readOnly
                  />
                </td>
                <td className="py-3 px-4 text-left">
                  {product.variants[0]?.gallery[0]?.url ? (
                    <img
                      src={product.variants[0].gallery[0].url}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </td>
                <td className="py-3 px-4 text-left">{product.name}</td>
                <td className="py-3 px-4 text-center">
                  {product.discount ? `${product.discount}%` : "No Discount"}
                </td>
                <td className="py-3 px-4 text-center">Rs. {product.price}</td>
                <td className="py-3 px-4 text-center">
                  {product.variants[0]?.stock || 0}
                </td>
                <td className="py-3 px-4 flex items-center h-20  justify-center space-x-2">
                  <Link
                    href={`/admin/products/editProduct/${product._id}`}
                    className="text-blue-500"
                  >
                    <Edit size={20} />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="text-red-500 disabled:opacity-50"
                    disabled={!!deletingProductId}
                  >
                    {deletingProductId === product._id ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Trash size={20} />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withAdminAuth(AdminProductsPage);
