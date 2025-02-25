"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import DragNDrop from "@/components/admin/DragNDrop";
import ColorPicker from "@/components/admin/colorPicker";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils"; // For Tailwind class merging

interface Variants {
  size: string[];
  color: string;
  hexColor: string;
  stock: number | null;
}

const AddProduct = () => {
  const [variants, setVariants] = useState<Variants>({
    color: "",
    size: [],
    hexColor: "#000000",
    stock: null,
  });
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [age, setAge] = useState<string>("adult");
  const [sex, setSex] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const sizes = ["XS", "SM", "MD", "LG", "XL", "2XL", "3XL"];
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    variants.size || []
  );

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) => {
      const newSizes = prev.includes(size)
        ? prev.filter((s) => s !== size) // Remove if already selected
        : [...prev, size]; // Add if not selected

      setVariants((prevVariants) => ({
        ...prevVariants,
        size: newSizes, // Update variants.size
      }));

      return newSizes;
    });
  };

  const handleCreateProduct = async () => {
    setLoading(true);
    const token = Cookies.get("authToken");

    if (price === null || price <= 0) {
      setLoading(false);
      alert("Price must be a positive number.");
      return;
    }
    if (variants.stock === null || variants.stock <= 0) {
      setLoading(false);
      alert("Stock must be a positive integer.");
      return;
    }
    if (discount === null || discount <= 0) {
      setLoading(false);
      setDiscount(0);
      return;
    }

    if (!name || !description) {
      setLoading(false);
      alert("Please fill out all required fields.");
      return;
    }

    // Create FormData object
    const formData = new FormData();

    // Append product details
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("discount", discount.toString());
    formData.append("description", description);

    // Append optional fields if they exist
    if (category) formData.append("category", category);
    if (brand) formData.append("brand", brand);
    if (age) formData.append("age", age);
    if (sex) formData.append("sex", sex);
    if (style) formData.append("style", style);

    formData.append("variants", JSON.stringify(variants));

    // Append images
    images.forEach((image, index) => {
      formData.append("gallery", image); // Use "gallery" for multiple images
    });

    try {
      console.log("formData", formData);

      const response = await axios.post(
        "http://localhost:5000/api/v1/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the request was successful
      if (response.status >= 200 && response.status < 300) {
        console.log("Product created successfully:", response.data);
        setLoading(false);
        router.back();
        alert("Product created successfully!");
      } else {
        setLoading(false);
        throw new Error("Failed to create product");
      }
    } catch (error) {
      setLoading(false);

      alert("Failed to create product. Please try again.");
    }
  };

  const setColor = (hexColor: string) => {
    setVariants((prev) => ({ ...prev, hexColor }));
  };

  const setSize = (size: string) => {
    setVariants((prev) => ({ ...prev, size: [...prev.size, size] }));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-semibold mb-6">Add New Products</h1>

      {/* Main Content Area */}
      <div className="flex flex-col space-y-6">
        {/* Top Section: DragNDrop and Form */}
        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
          {/* Left Side: DragNDrop */}
          <div className="flex-1 flex-col space-y-2">
            <DragNDrop images={images} setImages={setImages} />
          </div>

          {/* Right Side: Form Elements */}
          <div className="flex-1 space-y-4 border-2 border-black/20 rounded-lg p-2">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md placeholder:text-black focus-visible:ring-transparent"
            />
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Price"
                value={price ?? ""}
                onChange={(e) =>
                  setPrice(e.target.value ? parseFloat(e.target.value) : null)
                }
                className="w-full p-2 border rounded-md placeholder:text-black focus-visible:ring-transparent"
              />
              <input
                type="number"
                placeholder="Stock"
                value={variants.stock ?? ""}
                onChange={(e) =>
                  setVariants({
                    ...variants,
                    stock: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border rounded-md placeholder:text-black focus-visible:ring-transparent"
              />
            </div>
            <div className="flex space-x-3">
              <input
                type="number"
                placeholder="Discount"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value))}
                className="w-full p-2 h-10 border rounded-md placeholder:text-black focus-visible:ring-transparent"
              />
              {/* multiple select button */}
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-grow-0 justify-between font-normal w-60 h-10 "
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
            </div>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div className="flex-1">
                <Select
                  name="category"
                  onValueChange={(value) => setCategory(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="bag">Bag</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select name="brand" onValueChange={(value) => setBrand(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Brands</SelectLabel>
                      <SelectItem value="Nike">Nike</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div className="flex flex-1 items-center justify-left space-x-2">
                <label>Age</label>
                <RadioGroup
                  value={age}
                  onValueChange={(value) => setAge(value)}
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="adult" id="adult" />
                    <Label htmlFor="adult">Adult</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kid" id="kid" />
                    <Label htmlFor="kids">Kid</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex-1">
                <Select name="sex" onValueChange={(value) => setSex(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Your Sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sex</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="others">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex-1">
              <Select name="style" onValueChange={(value) => setStyle(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Styles</SelectLabel>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <input
              type="text"
              placeholder="Color Name"
              value={variants.color}
              onChange={(e) =>
                setVariants({ ...variants, color: e.target.value })
              }
              className="w-full p-2 border rounded-md placeholder:text-black focus-visible:ring-transparent"
            />
            <ColorPicker setColor={setColor} />
          </div>
        </div>

        {/* Bottom Section: Description */}
        <label htmlFor="description" className="font-semibold text-lg">
          Add Detailed Description
        </label>
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2  rounded-md min-h-[100px] border-2 border-black/20"
        />

        {/* Add Product Button */}
        <button
          onClick={handleCreateProduct}
          className="w-full bg-black/80 text-white p-2 rounded-md hover:bg-black transition-colors text-center"
        >
          {loading ? (
            <div className="flex justify-center w-full">
              <Loader2 className="animate-spin" />{" "}
            </div>
          ) : (
            "Add Product"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
