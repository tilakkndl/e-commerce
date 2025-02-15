"use client";
import Link from "next/link";
import React from "react";

import { Product } from "@/types/product.types";

interface UpdateProductProps {
  editingProduct: Product | null;
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({
  editingProduct,
  setEditingProduct,
  setProducts,
}) => {
  if (!editingProduct) return null;

  const handleUpdateProduct = () => {
    if (
      !editingProduct.name ||
      editingProduct.price <= 0 ||
      !editingProduct.description
    ) {
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod.id === editingProduct.product_id ? editingProduct : prod
      )
    );
    setEditingProduct(null);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-medium mb-4">Edit Product</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={editingProduct.name}
          onChange={(e) =>
            setEditingProduct(
              (prev) => prev && { ...prev, name: e.target.value }
            )
          }
          className="w-full p-2 border rounded-md"
        />
        <input
          type="number"
          value={editingProduct.price}
          onChange={(e) =>
            setEditingProduct(
              (prev) => prev && { ...prev, price: parseFloat(e.target.value) }
            )
          }
          className="w-full p-2 border rounded-md"
        />
        <textarea
          value={editingProduct.description}
          onChange={(e) =>
            setEditingProduct(
              (prev) => prev && { ...prev, description: e.target.value }
            )
          }
          className="w-full p-2 border rounded-md"
        />
        <Link
          href="./products/updateProduct"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Update Product
        </Link>
        <button
          onClick={() => setEditingProduct(null)}
          className="w-full bg-gray-500 text-white p-2 rounded-md mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
