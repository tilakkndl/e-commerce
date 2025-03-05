"use client";
import React, { useState, useEffect } from "react";
import { Trash, Edit } from "lucide-react";
import Link from "next/link";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import Product from "@/types/product.types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import {
  deleteProductById,
  fetchAllProducts,
} from "@/lib/features/admin/adminSlice";



const AdminProductsPage = () => {
  const [ellipsisToggle, setEllipsisToggle] = useState(false);
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.admin.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-4xl font-semibold">Products</h1>
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
              <th className="p-3 text-center">Brand</th>
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
                <td className="py-3 px-4 text-center">{product.brand.brand}</td>
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
                    onClick={() => dispatch(deleteProductById(product._id))}
                    className="text-red-500"
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductsPage;
