"use client";
import React, { useState, useEffect } from "react";
import { Trash, Edit } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Make sure to adjust the path

// Type definition for a product
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// Mock API functions
const fetchProducts = async (): Promise<Product[]> => {
  // Mocking an API call (replace with your actual API)
  return [
    { id: 1, name: "Product 1", price: 50, description: "Description 1" },
    { id: 2, name: "Product 2", price: 100, description: "Description 2" },
  ];
};

const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  // Replace this with an API call
  return { ...product, id: Date.now() }; // Mock product creation
};

const updateProduct = async (product: Product): Promise<Product> => {
  // Replace this with an API call
  return product; // Mock update
};

const deleteProduct = async (productId: number): Promise<number> => {
  // Replace this with an API call
  return productId; // Mock delete
};

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]); // Type state with Product[]
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // Nullable product for editing
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleCreateProduct = async () => {
    if (!newProduct.name || newProduct.price <= 0 || !newProduct.description) {
      return;
    }

    const createdProduct = await addProduct(newProduct);
    setProducts((prevProducts) => [...prevProducts, createdProduct]);
    setNewProduct({ name: "", price: 0, description: "" }); // Reset form to an object
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async () => {
    if (
      !editingProduct?.name ||
      editingProduct.price <= 0 ||
      !editingProduct?.description
    ) {
      return;
    }

    const updatedProduct = await updateProduct(editingProduct);
    setProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod.id === updatedProduct.id ? updatedProduct : prod
      )
    );
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (productId: number) => {
    await deleteProduct(productId);
    setProducts((prevProducts) =>
      prevProducts.filter((prod) => prod.id !== productId)
    );
  };

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Product Name</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-semibold mb-6">Products</h1>

      {/* Add Product Form */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-medium mb-4">Add New Product</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              })
            }
            className="w-full p-2 border rounded-md"
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleCreateProduct}
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-medium mb-4 p-4">Product List</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.price}</td>
                <td className="p-2">{product.description}</td>
                <td className="p-2 flex space-x-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-500 hover:underline"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
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

      {/* Edit Product Form */}
      {editingProduct && (
        <div className="p-4 bg-white shadow-md rounded-lg mt-6">
          <h2 className="text-xl font-medium mb-4">Edit Product</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: parseFloat(e.target.value),
                })
              }
              className="w-full p-2 border rounded-md"
            />
            <textarea
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
              className="w-full p-2 border rounded-md"
            />
            <button
              onClick={handleUpdateProduct}
              className="w-full bg-blue-500 text-white p-2 rounded-md"
            >
              Update Product
            </button>
            <button
              onClick={() => setEditingProduct(null)}
              className="w-full bg-gray-500 text-white p-2 rounded-md mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
