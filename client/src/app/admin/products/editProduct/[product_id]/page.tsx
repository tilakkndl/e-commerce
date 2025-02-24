"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Product, Variant } from "@/types/product.types";
import VariantCard from "@/components/admin/Variant";

const mockProducts: Product[] = [
  {
    product_id: 2,
    name: "Eco-friendly Canvas Tote",
    description: "A durable and stylish tote bag made from recycled materials.",
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
];

const variants: Variant[] = [
  {
    color: "red",
    size: ["sm", "lg", "xl"],
    gallery: ["red_image1.jpg", "red_image2.jpg"],
    hexColor: "#ff0000",
    stock: 10,
  },
  {
    color: "blue",
    size: ["sm", "md", "lg"],
    gallery: ["blue_image1.jpg", "blue_image2.jpg"],
    hexColor: "#0000ff",
    stock: 15,
  },
  {
    color: "green",
    size: ["md", "lg", "xl"],
    gallery: ["green_image1.jpg", "green_image2.jpg"],
    hexColor: "#008000",
    stock: 8,
  },
  {
    color: "black",
    size: ["xs", "sm", "md", "lg"],
    gallery: ["black_image1.jpg", "black_image2.jpg"],
    hexColor: "#000000",
    stock: 20,
  },
  {
    color: "yellow",
    size: ["sm", "md", "lg", "xl"],
    gallery: ["yellow_image1.jpg", "yellow_image2.jpg"],
    hexColor: "#ffff00",
    stock: 5,
  },
];

const editProduct = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.product_id;

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      const product = mockProducts.find(
        (p) => p.product_id === Number(productId)
      );
      if (product) setEditingProduct(product);
    }
  }, [productId]);

  if (!editingProduct) return <p>Loading product...</p>;

  const handleUpdateProduct = () => {
    console.log("Updated Product:", editingProduct);
    router.push("/admin/products"); // Redirect back after update
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-4xl font-semibold mb-4">Edit Product</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="font-semibold text-xl">
            Product Name
          </label>
          <input
            name="name"
            type="text"
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct(
                (prev) => prev && { ...prev, name: e.target.value }
              )
            }
            className="w-full p-2 border-2 border-black/20 rounded-md "
          />
        </div>
        <div>
          <label htmlFor="price" className="font-semibold text-xl">
            Price
          </label>
          <input
            name="price"
            type="number"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct(
                (prev) => prev && { ...prev, price: parseFloat(e.target.value) }
              )
            }
            className="w-full p-2 border-2 border-black/20  rounded-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="font-semibold text-xl">
            Description
          </label>
          <textarea
            name="description"
            value={editingProduct.description}
            onChange={(e) =>
              setEditingProduct(
                (prev) => prev && { ...prev, description: e.target.value }
              )
            }
            className="w-full p-2 border-2 border-black/20  rounded-md"
          />
        </div>

        <section>
          <h2 className="font-semibold text-xl">Variants</h2>
          <div className="flex flex-col space-y-3 items-center">
            {variants.map((variant, index) => {
              return <VariantCard variant={variant} />;
            })}
          </div>
        </section>
        <button
          onClick={handleUpdateProduct}
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Update Product
        </button>
        <button
          onClick={() => router.push("/admin/products")}
          className="w-full bg-gray-500 text-white p-2 rounded-md mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default editProduct;
