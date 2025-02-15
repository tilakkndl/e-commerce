"use client";
import React, { useState } from "react";
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    description: "",
  });
  const handleCreateProduct = async () => {
    if (!newProduct.name || newProduct.price <= 0 || !newProduct.description) {
      return;
    }
  };
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-medium mb-4">Add New Product</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full p-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              price: parseFloat(e.target.value),
            })
          }
          className="w-full p-2 border rounded-md"
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleCreateProduct}
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
