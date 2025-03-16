import React, { useState, useEffect } from "react";
import { Variant } from "@/types/product.types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil, Loader2 } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks/redux";
import { deleteVariant, editVariant } from "@/lib/features/admin/adminSlice";
import { openModal, closeModal } from "@/lib/features/modal/modalSlice";

type VariantCardProps = {
  variant: Variant;
  productId: string;
};

const VariantCard: React.FC<VariantCardProps> = ({ variant, productId }) => {
  const dispatch = useAppDispatch();
  const [selectedSizes, setSelectedSizes] = useState<string[]>(variant.size);
  const [stock, setStock] = useState<number>(variant.stock);
  const [isModified, setIsModified] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Sync local state with variant prop when it changes
  useEffect(() => {
    setSelectedSizes(variant.size || []);
    setStock(variant.stock || 0);
  }, [variant]);

  // Check if stock or sizes have changed compared to the initial variant
  useEffect(() => {
    const selectedSizesCopy = selectedSizes ? [...selectedSizes] : [];
    const variantSizesCopy = variant.size ? [...variant.size] : [];
    const sizesChanged =
      JSON.stringify(selectedSizesCopy.sort()) !==
      JSON.stringify(variantSizesCopy.sort());
    const stockChanged = stock !== variant.stock;
    setIsModified(sizesChanged || stockChanged);
  }, [selectedSizes, stock, variant.size, variant.stock]);

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setStock(parseInt(value) || 0);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await dispatch(
        deleteVariant({
          productId,
          variantId: variant._id,
        })
      ).unwrap();
      dispatch(closeModal());
    } catch (error) {
      console.error("Failed to delete variant:", error);
      alert("Failed to delete variant. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteClick = () => {
    dispatch(
      openModal(
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Delete Variant</h2>
          <p className="mb-6 text-gray-600">
            Are you sure you want to delete this variant?
            <br />
            <span className="font-semibold">
              Color: {variant.color.toUpperCase()}
            </span>
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => dispatch(closeModal())}
              className="px-6 py-2 rounded-full border border-black hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                "Delete Variant"
              )}
            </button>
          </div>
        </div>
      )
    );
  };

  const handleEditVariant = async () => {
    try {
      await dispatch(
        editVariant({
          productId,
          variantId: variant._id,
          updates: {
            size: selectedSizes,
            stock,
          },
        })
      ).unwrap();
      alert("Variant updated successfully");
      setIsModified(false);
    } catch (error) {
      console.error("Failed to update variant:", error);
      alert("Failed to update variant. Please try again.");
    }
  };

  return (
    <div className="p-4 rounded-lg border-2 border-black w-fit relative">
      <div className="absolute top-2 right-2 flex gap-2">
        {isModified && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleEditVariant}
            className="border-blue-500 text-blue-500 hover:bg-blue-100"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="destructive"
          size="icon"
          onClick={handleDeleteClick}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex space-x-2">
        <Carousel className="w-40 max-w-xs h-40">
          <CarouselContent>
            {variant.gallery.map((image, index) => (
              <CarouselItem key={index}>
                <img
                  src={image.url}
                  alt={`Variant Image ${index + 1}`}
                  className="w-40 h-40 object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {variant.gallery.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full w-fit h-fit p-2">
                <FaArrowLeft size={14} />
              </CarouselPrevious>
              <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full w-fit h-fit p-2">
                <FaArrowRight size={14} />
              </CarouselNext>
            </>
          )}
        </Carousel>
        <div className="w-fit">
          <div className="text-lg font-bold flex items-center space-x-2 w-fit">
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: variant.hexColor }}
            ></div>
            <div>{variant.color.toUpperCase()}</div>
          </div>

          <div className="flex items-center w-fit mt-2 space-x-2">
            <div className="h-fit font-semibold">Stock:</div>
            <input
              value={stock}
              onChange={handleStockChange}
              placeholder="Enter Available Stock"
              className="border rounded-md px-2 overflow-hidden w-20 h-15"
            />
          </div>
          <div className="w-auto flex max-w-[300px]">
            <div className="font-semibold mr-3">Sizes:</div>

            <div className="flex items-center justify-start space-x-3 max-h-[100px] flex-wrap">
              {["XS", "SM", "MD", "LG", "XL", "2XL", "3XL"].map((size) => (
                <div key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    id={size}
                    value={size}
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="mr-2"
                  />
                  <label htmlFor={size}>{size}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center mt-2 w-fit">
            <div className="h-fit font-semibold mr-3">Selected Sizes:</div>
            <div>{selectedSizes.join(", ").toUpperCase()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantCard;
