import React, { useState, DragEvent, ChangeEvent } from "react";

interface DragNDropProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const DragNDrop: React.FC<DragNDropProps> = ({ images, setImages }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      setImages((prev) => [...prev, ...files]);
    }
  };

  // Handle drag-and-drop
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length) {
      setImages((prev) => [...prev, ...files]);
    }
  };

  // Remove an image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className={`w-full max-w-2xl bg-white rounded-lg border-2 border-black/20 shadow-lg p-6 ${
        isDragging ? "border-2 border-dashed border-blue-500" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">
        Add Product Images
      </h1>
      <input
        type="file"
        id="file-input"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <label
        htmlFor="file-input"
        className={`block w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-center  hover:bg-gray-50 ${
          images.length >= 1 ? "h-28" : "h-60"
        }`}
      >
        <span className="text-gray-600">
          Drag & drop images here or click to upload
        </span>
      </label>

      {/* Image Previews */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group hover:animate-pulse">
            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              className="w-full h-32 object-contain rounded-lg"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragNDrop;
