"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Product, { Variant } from "@/types/product.types";
import VariantCard from "@/components/admin/Variant";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { findProductById } from "@/lib/features/admin/adminSlice";

const EditProduct = () => {
  const router = useRouter();
  const { product_id } = useParams(); // Corrected type for params
  const dispatch = useAppDispatch();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const editableProduct = useAppSelector(
    (state) => state.admin.editableProduct
  );

  useEffect(() => {
    if (product_id) {
      dispatch(findProductById(product_id.toString())); // Dispatch action to fetch product
    }

    // Update local state when editableProduct is set
    if (editableProduct && editableProduct._id === product_id) {
      setEditingProduct(editableProduct);
    }
  }, [editableProduct?._id, product_id, dispatch]); // Depend on both editableProduct and product_id

  // If the product is still loading
  if (!editingProduct) return <p>Loading product...</p>;

  const handleUpdateProduct = () => {
    console.log("Updated Product:", editingProduct);
    router.push("/admin/products"); // Redirect back after update (you can replace this with an actual API call)
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-4xl font-semibold mb-4">Edit Product</h2>
      <div className="space-y-4">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="font-semibold text-xl">
            Product Name
          </label>
          <input
            name="name"
            type="text"
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct((prev) =>
                prev ? { ...prev, name: e.target.value } : null
              )
            }
            className="w-full p-2 border-2 border-black/20 rounded-md"
          />
        </div>

        {/* Product Price */}
        <div>
          <label htmlFor="price" className="font-semibold text-xl">
            Price
          </label>
          <input
            name="price"
            type="number"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct((prev) =>
                prev ? { ...prev, price: parseFloat(e.target.value) } : null
              )
            }
            className="w-full p-2 border-2 border-black/20 rounded-md"
          />
        </div>

        {/* Product Description */}
        <div>
          <label htmlFor="description" className="font-semibold text-xl">
            Description
          </label>
          <textarea
            name="description"
            value={editingProduct.description}
            onChange={(e) =>
              setEditingProduct((prev) =>
                prev ? { ...prev, description: e.target.value } : null
              )
            }
            className="w-full p-2 border-2 border-black/20 rounded-md"
          />
        </div>

        {/* Product Variants */}
        <section>
          <h2 className="font-semibold text-xl">Variants</h2>
          <div className="flex flex-col lg:flex-row lg:flex-wrap gap-2 lg:justify-center lg:items-center items-center justify-start">
            {editingProduct.variants?.map((variant: Variant, index: number) => (
              <VariantCard key={index} variant={variant} />
            ))}
          </div>
        </section>

        {/* Buttons */}
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

export default EditProduct;
