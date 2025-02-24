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

interface Variants {
  size: string[];
  color: string;
  hexColor: string;
  stock: number;
}

const AddProduct = () => {
  const [variants, setVariants] = useState<Variants>({
    color: "",
    size: [],
    hexColor: "",
    stock: 1,
  });
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [age, setAge] = useState<string>("adult");
  const [sex, setSex] = useState<string>("");
  const [style, setStyle] = useState<string>("");

  const handleCreateProduct = async () => {
    const token = Cookies.get("authToken");
    console.log(token);

    if (price === null || price <= 0) {
      alert("Price must be a positive number.");
      return;
    }

    if (!name || !description) {
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
    // if (variants.size.length > 0) {
    //   variants.size.forEach((size) => formData.append("size", size));
    // }
    // if (variants.color) formData.append("color", variants.color);
    // if (variants.hexColor) formData.append("hexColor", variants.hexColor);
    // if (variants.stock) formData.append("stock", variants.stock.toString());
    const variantsArray = [variants]; // Wrap variants in an array
    formData.append("variants", JSON.stringify(variantsArray));

    // Append images
    images.forEach((image, index) => {
      formData.append("gallery", image); // Use "gallery" for multiple images
    });

    try {
      console.log("formData", formData);
      // Send FormData to the API using axios
      const response = await axios.post(
        "http://localhost:5000/api/v1/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // axios will set this automatically
          },
        }
      );

      // Check if the request was successful
      if (response.status >= 200 && response.status < 300) {
        console.log("Product created successfully:", response.data);
        alert("Product created successfully!");
      } else {
        throw new Error("Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
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
          <div className="flex-1">
            <DragNDrop images={images} setImages={setImages} />
          </div>

          {/* Right Side: Form Elements */}
          <div className="flex-1 space-y-4">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md placeholder:text-black focus-visible:ring-transparent"
            />
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
              placeholder="Discount"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value))}
              className="w-full p-2 border rounded-md placeholder:text-black focus-visible:ring-transparent"
            />
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
                    <RadioGroupItem value="kids" id="kids" />
                    <Label htmlFor="kids">Kids</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex-1">
                <Select name="size" onValueChange={(value) => setSize(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sizes</SelectLabel>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md"
        />

        {/* Add Product Button */}
        <button
          onClick={handleCreateProduct}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
