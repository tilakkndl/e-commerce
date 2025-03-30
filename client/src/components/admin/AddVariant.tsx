import React, { useState, FormEvent } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import ColorPicker from "./colorPicker";
import axios from "axios";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/lib/hooks/redux";
import { findProductById } from "@/lib/features/admin/adminSlice";
import { integralCF } from "@/styles/fonts";
import { showToast } from "@/lib/features/toast/toastSlice";
import { closeModal } from "@/lib/features/modal/modalSlice";

interface VariantFormData {
  color: string;
  hexColor: string;
  stock: string;
  size: string[];
  gallery: FileList | null;
}

const AddVariant = ({ product }: { product: string }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<VariantFormData>({
    color: "",
    hexColor: "",
    stock: "",
    size: [],
    gallery: null,
  });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const sizes = ["XS", "SM", "MD", "LG", "XL", "2XL", "3XL", "FREE"] as const;
  type SizeType = (typeof sizes)[number];

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        gallery: e.target.files,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { color, hexColor, stock, size, gallery } = formData;

    if (!color || !hexColor || !stock || size.length === 0) {
      setLoading(false);
      dispatch(
        showToast({
          message: "Please fill all fields and select at least one size.",
          type: "error",
          duration: 3000,
        })
      );
      return;
    }
    if (gallery && gallery.length === 0) {
      setLoading(false);
      dispatch(
        showToast({
          message: "Please upload at least one image.",
          type: "error",
          duration: 3000,
        })
      );
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

      dispatch(
        showToast({
          message: response.data.message || "Variant added successfully!",
          type: "success",
          duration: 3000,
        })
      );

      // Reset form
      setFormData({
        color: "",
        hexColor: "",
        stock: "",
        size: [],
        gallery: null,
      });
      setSelectedSizes([]);

      // Re-fetch the product to get the updated variants
      dispatch(findProductById(product));
    } catch (error) {
      console.error("Error uploading variant:", error);
      dispatch(
        showToast({
          message:
            error instanceof Error
              ? error.message
              : "An error occurred while adding the variant",
          type: "error",
          duration: 3000,
        })
      );
    } finally {
      setLoading(false);
      dispatch(closeModal());
    }
  };

  // Add this function to check if all fields are filled
  const isFormValid = () => {
    const { color, hexColor, stock, size, gallery } = formData;
    return (
      color.trim() !== "" &&
      hexColor !== "" &&
      stock !== "" &&
      size.length > 0 &&
      gallery !== null &&
      gallery.length > 0
    );
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2
        className={`text-xl font-semibold mb-4 text-center ${integralCF.className} `}
      >
        Add Variant
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ColorPicker
          setColor={(hexColor) =>
            setFormData((prev) => ({ ...prev, hexColor }))
          }
        />
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
                className="flex-grow-0 justify-between font-normal w-full h-10"
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
        <div className="flex">
          <label htmlFor="images" className="text-nowrap flex items-center ">
            <div>Select Images :</div>
          </label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading || !isFormValid()}
            className="px-4 py-2 bg-black/80 text-white rounded hover:bg-black/70 text-center disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVariant;
