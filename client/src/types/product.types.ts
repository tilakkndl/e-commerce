export type Discount = {
  amount: number;
  percentage: number;
};

export type Stock = {
  size: string;
  quantity: string;
};

export type Product = {
  product_id: number;
  name: string;
  description: string;
  gallery: string[];
  price: number;
  status: "active" | "inactive";
  discount: Discount;
  rating: number;
  brand: string;
  sex: string;
  age: string;
  stock: Stock[];
  category: string;
  available_colors: string[];
  style: string;
  created_at: string;
};

export type ProductList = {
  products: Product[];
};
