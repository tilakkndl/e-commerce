"use client";
import React, { useState, useEffect } from "react";
import { Trash, Edit } from "lucide-react";
import Link from "next/link";
import { FaMicrosoft } from "react-icons/fa";
import { Product } from "@/types/product.types";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

// Mock API functions
const fetchProducts = async (): Promise<Product[]> => {
  return [
    {
      product_id: 2,
      name: "Eco-friendly Canvas Tote",
      description:
        "A durable and stylish tote bag made from recycled materials.",
      gallery: ["/images/tote1.png", "/images/tote2.png"],
      price: 19.99,
      status: "inactive",
      discount: {
        amount: 2,
        percentage: 10,
      },
      rating: 4.7,
      brand: "EcoStyle",
      sex: "female",
      age: "adult",
      stock: [{ size: "one-size", quantity: "150" }],
      category: "bag",
      available_colors: ["beige", "black"],
      style: "casual",
      created_at: "2024-02-01;12:15:20",
    },
    {
      product_id: 3,
      name: "Classic Leather Wallet",
      description: "Premium leather wallet with multiple compartments.",
      gallery: ["/images/wallet1.png", "/images/wallet2.png"],
      price: 39.99,
      status: "active",
      discount: {
        amount: 5,
        percentage: 12,
      },
      rating: 4.8,
      brand: "LeatherCraft",
      sex: "male",
      age: "adult",
      stock: [{ size: "one-size", quantity: "250" }],
      category: "wallet",
      available_colors: ["brown", "black"],
      style: "formal",
      created_at: "2024-02-05;10:45:30",
    },
    {
      product_id: 4,
      name: "Sporty Running Shoes",
      description: "Comfortable and lightweight shoes for running.",
      gallery: ["/images/shoes1.png", "/images/shoes2.png"],
      price: 49.99,
      status: "active",
      discount: {
        amount: 10,
        percentage: 15,
      },
      rating: 4.6,
      brand: "RunFast",
      sex: "unisex",
      age: "adult",
      stock: [
        { size: "40", quantity: "100" },
        { size: "42", quantity: "150" },
      ],
      category: "shoes",
      available_colors: ["red", "blue"],
      style: "sporty",
      created_at: "2024-01-25;08:30:45",
    },
    {
      product_id: 5,
      name: "Luxury Sunglasses",
      description: "Sleek, fashionable sunglasses for all-day comfort.",
      gallery: ["/images/sunglasses1.png", "/images/sunglasses2.png"],
      price: 99.99,
      status: "active",
      discount: {
        amount: 15,
        percentage: 10,
      },
      rating: 4.9,
      brand: "Visionary",
      sex: "female",
      age: "adult",
      stock: [{ size: "one-size", quantity: "120" }],
      category: "accessory",
      available_colors: ["black", "gold"],
      style: "luxury",
      created_at: "2024-01-30;11:10:25",
    },
    {
      product_id: 6,
      name: "Wooden Desk Organizer",
      description: "Elegant wooden organizer for your workspace.",
      gallery: ["/images/desk1.png", "/images/desk2.png"],
      price: 29.99,
      status: "inactive",
      discount: {
        amount: 5,
        percentage: 15,
      },
      rating: 4.5,
      brand: "CraftWorks",
      sex: "unisex",
      age: "adult",
      stock: [{ size: "one-size", quantity: "200" }],
      category: "office",
      available_colors: ["natural", "brown"],
      style: "modern",
      created_at: "2024-01-10;14:25:30",
    },
    {
      product_id: 7,
      name: "Vintage Leather Journal",
      description: "Handcrafted leather journal with a classic design.",
      gallery: ["/images/journal1.png", "/images/journal2.png"],
      price: 19.99,
      status: "active",
      discount: {
        amount: 3,
        percentage: 12,
      },
      rating: 4.7,
      brand: "LeatherCraft",
      sex: "unisex",
      age: "adult",
      stock: [{ size: "one-size", quantity: "300" }],
      category: "stationery",
      available_colors: ["brown", "black"],
      style: "vintage",
      created_at: "2024-01-20;09:10:15",
    },
    {
      product_id: 8,
      name: "Bluetooth Headphones",
      description: "Wireless headphones with superior sound quality.",
      gallery: ["/images/headphones1.png", "/images/headphones2.png"],
      price: 69.99,
      status: "active",
      discount: {
        amount: 10,
        percentage: 15,
      },
      rating: 4.8,
      brand: "SoundMax",
      sex: "unisex",
      age: "adult",
      stock: [{ size: "one-size", quantity: "150" }],
      category: "electronics",
      available_colors: ["black", "white"],
      style: "tech",
      created_at: "2024-02-01;10:20:30",
    },
    {
      product_id: 9,
      name: "Stainless Steel Water Bottle",
      description: "Durable, eco-friendly water bottle for daily hydration.",
      gallery: ["/images/bottle1.png", "/images/bottle2.png"],
      price: 24.99,
      status: "active",
      discount: {
        amount: 3,
        percentage: 10,
      },
      rating: 4.6,
      brand: "HydratePro",
      sex: "unisex",
      age: "adult",
      stock: [{ size: "one-size", quantity: "200" }],
      category: "accessory",
      available_colors: ["blue", "green"],
      style: "outdoor",
      created_at: "2024-02-03;12:05:40",
    },
    {
      product_id: 10,
      name: "Eco-friendly Yoga Mat",
      description: "Non-slip yoga mat made from recycled materials.",
      gallery: ["/images/mat1.png", "/images/mat2.png"],
      price: 34.99,
      status: "inactive",
      discount: {
        amount: 5,
        percentage: 12,
      },
      rating: 4.7,
      brand: "GreenFit",
      sex: "unisex",
      age: "adult",
      stock: [{ size: "one-size", quantity: "100" }],
      category: "fitness",
      available_colors: ["purple", "green"],
      style: "fitness",
      created_at: "2024-02-06;09:50:15",
    },
  ];
};

const deleteProduct = async (productId: number): Promise<number> => {
  return productId; // Mock delete
};

const AdminProductsPage = () => {
  const [ellipsisToggle, setEllipsisToggle] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleDeleteProduct = async (productId: number) => {
    await deleteProduct(productId);
    setProducts((prevProducts) =>
      prevProducts.filter((prod) => prod.product_id !== productId)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-4xl font-semibold">Products</h1>
        <div
          className={`flex md:hidden space-y-2 relative
           
        `}
        >
          <IoEllipsisVerticalSharp
            size={24}
            onClick={() => setEllipsisToggle((prev) => !prev)}
          />
          <div
            className={`absolute top-full right-full bg-white border-2 border-black/80 w-fit h-fit flex flex-col space-y-2 p-2 rounded-lg  ${
              ellipsisToggle ? "" : "hidden"
            }`}
          >
            <Link
              href="./products/addProduct"
              className="border border-black/40 p-2 text-nowrap rounded-sm"
            >
              Add Categories
            </Link>
            <Link
              href="./products/addProduct"
              className="border border-black/40 p-2 text-nowrap rounded-sm"
            >
              Add Brands
            </Link>
            <Link
              href="./products/addProduct"
              className="border border-black/40 p-2 text-nowrap rounded-sm"
            >
              Add Products
            </Link>
          </div>
        </div>
        <div className=" space-x-3 hidden md:flex">
          <Link
            href="./products/addProduct"
            className="border border-black/40 p-2 hover:text-white hover:bg-black"
          >
            Add Categories
          </Link>
          <Link
            href="./products/addProduct"
            className="border border-black/40 p-2 hover:text-white hover:bg-black"
          >
            Add Brands
          </Link>
          <Link
            href="./products/addProduct"
            className="border border-black/40 p-2 hover:text-white hover:bg-black"
          >
            Add Products
          </Link>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white shadow-md">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-2 border-black/80 grid grid-cols-12 space-x-1">
              <th className="p-2 text-left col-span-1">Status</th>
              <th className="p-2 text-left col-span-1">Image</th>
              <th className="p-2 text-left col-span-2">Product</th>
              <th className="p-2 text-left col-span-1">Price</th>
              <th className="p-2 text-left col-span-3">Description</th>
              <th className="p-2 text-left col-span-2">Stock</th>
              <th className="p-2 text-left col-span-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.product_id}
                className="border border-black/40 grid grid-cols-12 space-x-1"
              >
                <td className="py-2 px-6 col-span-1">
                  <input
                    type="checkbox"
                    checked={product.status === "active"}
                  />
                </td>
                <td className="py-2 px-6 col-span-1">
                  <FaMicrosoft />
                </td>
                <td className="p-2 col-span-2">{product.name}</td>
                <td className="p-2 col-span-1">Rs. {product.price}</td>
                <td className="p-2 col-span-3">{product.description}</td>
                <td className="p-2 col-span-2">
                  {product.stock[0].size}/{product.stock[0].quantity}
                </td>
                <td className="p-2 flex items-center space-x-2 col-span-2 it">
                  <Link
                    href={`/admin/products/editProduct/${product.product_id}`}
                    className="text-blue-500 hover:underline"
                  >
                    <Edit size={20} />
                  </Link>

                  <button
                    onClick={() => handleDeleteProduct(product.product_id)}
                    className="text-red-500 hover:underline"
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
