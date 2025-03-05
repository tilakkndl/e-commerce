"use client";

import React, { useState, FormEvent } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import ColorPicker from "./colorPicker";
import axios from "axios";
import Cookies from "js-cookie"; // Added for authentication token

// Define interfaces for form data
interface VariantFormData {
  color: string;
  hexColor: string;
  stock: string; // Stored as string from input, converted if needed
  size: string[];
  gallery: FileList | null;
}

const AddVariant = ({ product }: { product: string }) => {
  // State with proper typing
  const [formData, setFormData] = useState<VariantFormData>({
    color: "",
    hexColor: "",
    stock: "",
    size: [],
    gallery: null,
  });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const sizes = ["XS", "SM", "MD", "LG", "XL", "2XL", "3XL"] as const;
  type SizeType = (typeof sizes)[number];

  // Handle size selection
  const handleSizeChange = (size: SizeType) => {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(updatedSizes);
    setFormData((prev) => ({
      ...prev,
      size: updatedSizes,
    }));
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        gallery: e.target.files,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { color, hexColor, stock, size, gallery } = formData;

    // Basic validation
    if (!color || !hexColor || !stock || size.length === 0) {
      alert("Please fill all fields and select at least one size.");
      return;
    }
    if (gallery && gallery.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("color", color);
    formDataToSend.append("hexColor", hexColor);
    formDataToSend.append("stock", stock);
    formDataToSend.append("size", JSON.stringify(size));

    if (gallery) {
      Array.from(gallery).forEach((file) => {
        formDataToSend.append("gallery", file);
      });
    }

    try {
      const token = Cookies.get("authToken");
      const response = await axios.post<{ message: string; success: boolean }>(
        `${process.env.NEXT_PUBLIC_ROOT_API}/product/${product}/variants`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to add variant");
      }

      alert(response.data.message || "Variant added successfully!");

      setFormData({
        color: "",
        hexColor: "",
        stock: "",
        size: [],
        gallery: null,
      });
      setSelectedSizes([]);
    } catch (error) {
      console.error("Error uploading variant:", error);
      alert(
        error instanceof Error
          ? error.message
          : "An error occurred while adding the variant"
      );
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Add Variant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Color"
          value={formData.color}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, color: e.target.value }))
          }
          className="w-full border p-2 rounded"
          required
        />
        <ColorPicker
          setColor={(hexColor) =>
            setFormData((prev) => ({ ...prev, hexColor }))
          }
        />
        <input
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, stock: e.target.value }))
          }
          className="w-full border p-2 rounded"
          required
          min="0"
        />
        <div className="flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex-grow-0 justify-between font-normal w-60 h-10"
              >
                {selectedSizes.length > 0
                  ? selectedSizes.join(", ")
                  : "Select Sizes"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2">
              <div className="flex flex-col gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={cn(
                      "flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-100",
                      selectedSizes.includes(size) && "bg-gray-200"
                    )}
                    onClick={() => handleSizeChange(size)}
                  >
                    <span>{size}</span>
                    {selectedSizes.includes(size) && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <label htmlFor="images">Select Images</label>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddVariant;
