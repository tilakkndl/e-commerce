"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Product, { Variant } from "@/types/product.types";
import VariantCard from "@/components/admin/Variant";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { findProductById, editProduct } from "@/lib/features/admin/adminSlice";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { openModal } from "@/lib/features/modal/modalSlice";
import AddVariant from "@/components/admin/AddVariant";
import { integralCF } from "@/styles/fonts";
import { withAdminAuth } from "@/lib/hooks/withAdminAuth";

function EditProduct() {
  const router = useRouter();
  const { product_id } = useParams();
  const dispatch = useAppDispatch();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { editableProduct, loading, error } = useAppSelector(
    (state) => state.admin
  );

  // Fetch product on mount or when product_id changes, and sync editingProduct with editableProduct
  useEffect(() => {
    if (product_id && !editableProduct && !loading) {
      dispatch(findProductById(product_id.toString()));
    }

    // Sync local editingProduct with Redux's editableProduct whenever it changes
    if (editableProduct && editableProduct._id === product_id) {
      setEditingProduct({ ...editableProduct }); // Deep copy to ensure re-render
    }
  }, [product_id, dispatch, editableProduct, loading]);

  // Handle loading and error states
  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!editingProduct) return <p>Product not found</p>;

  // Handle product update
  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      await dispatch(
        editProduct({
          id: product_id.toString(),
          updates: {
            name: editingProduct.name,
            price: editingProduct.price,
            description: editingProduct.description,
            status: editingProduct.status || "active",
            style: editingProduct.style || "casual",
            discount: editingProduct.discount || 0,
            sex: editingProduct.sex || "unisex",
            variants: editingProduct.variants,
          },
        })
      ).unwrap();

      console.log("Product updated successfully:", editingProduct);
      router.push("/admin/products");
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Failed to update product. Please try again.");
    }
  };
  console.log("dkfjak", editingProduct.discount);
  // Handle status toggle
  const handleStatusToggle = (status: "active" | "inactive") => {
    setEditingProduct((prev) => (prev ? { ...prev, status } : null));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-6">
      <h2 className={`text-4xl font-semibold mb-4 ${integralCF.className}`}>
        Edit Product
      </h2>
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

        {/* Product Discount */}
        <div>
          <label htmlFor="discount" className="font-semibold text-xl">
            Discount (%)
          </label>
          <input
            name="discount"
            type="number"
            min="0"
            max="100"
            value={editingProduct.discount}
            onChange={(e) =>
              setEditingProduct((prev) =>
                prev ? { ...prev, discount: parseFloat(e.target.value) } : null
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

        {/* Product Style */}
        <div>
          <label htmlFor="style" className="font-semibold text-xl">
            Style
          </label>
          <Select
            value={editingProduct.style || "casual"}
            onValueChange={(value) =>
              setEditingProduct((prev) =>
                prev
                  ? {
                      ...prev,
                      style: value as "casual" | "formal" | "gym" | "party",
                    }
                  : null
              )
            }
          >
            <SelectTrigger className="w-full p-2 border-2 border-black/20 rounded-md">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="gym">Gym</SelectItem>
              <SelectItem value="party">Party</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Sex */}
        <div>
          <label htmlFor="sex" className="font-semibold text-xl">
            Sex
          </label>
          <Select
            value={editingProduct.sex || "unisex"}
            onValueChange={(value) =>
              setEditingProduct((prev) =>
                prev
                  ? { ...prev, sex: value as "male" | "female" | "unisex" }
                  : null
              )
            }
          >
            <SelectTrigger className="w-full p-2 border-2 border-black/20 rounded-md">
              <SelectValue placeholder="Select sex" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="unisex">Unisex</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Status */}
        <div>
          <label className="font-semibold text-xl">Status</label>
          <div className="flex gap-2 mt-2">
            <Toggle
              pressed={editingProduct.status === "active"}
              onPressedChange={() => handleStatusToggle("active")}
              className="bg-gray-200 data-[state=on]:bg-green-500 data-[state=on]:text-white"
            >
              Active
            </Toggle>
            <Toggle
              pressed={editingProduct.status === "inactive"}
              onPressedChange={() => handleStatusToggle("inactive")}
              className="bg-gray-200 data-[state=on]:bg-red-500 data-[state=on]:text-white"
            >
              Inactive
            </Toggle>
          </div>
        </div>

        {/* Product Variants */}
        <section>
          <div className="flex justify-between items-center pb-2">
            <h2 className="font-semibold text-xl">Variants</h2>
            <Button
              className="rounded-none bg-black/90"
              onClick={() =>
                dispatch(
                  openModal(<AddVariant product={product_id.toString()} />)
                )
              }
            >
              Add Variant
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row lg:flex-wrap gap-2 lg:justify-start lg:items-center items-center justify-start">
            {editingProduct.variants?.map((variant: Variant) => (
              <VariantCard
                key={variant._id}
                variant={variant}
                productId={product_id.toString()}
              />
            ))}
          </div>
        </section>

        {/* Buttons */}
        <Button
          onClick={handleUpdateProduct}
          className="w-full bg-black/80 text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </Button>
        <Button
          onClick={() => router.push("/admin/products")}
          className="w-full bg-red-500 text-white p-2 rounded-md mt-2"
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default withAdminAuth(EditProduct);
