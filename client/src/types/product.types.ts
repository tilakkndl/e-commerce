// Type definition for a single gallery image
interface GalleryImage {
  public_id: string;
  url: string;
  _id: string;
}

// Type definition for a product variant
export interface Variant {
  color: string;
  hexColor: string;
  size: string[];
  gallery: GalleryImage[];
  stock: number;
  _id: string;
}

// Type definition for brand
interface Brand {
  _id: string;
  brand: string;
  __v: number;
}

// Type definition for category
interface Category {
  _id: string;
  category: string;
  __v: number;
}
export interface Discount {
  amount: number;
  percentage: number;
}

// Type definition for the entire product
interface Product {
  _id: string;
  name: string;
  brand: Brand;
  category: Category;
  price: number;
  style: string;
  age: string;
  sex: string;
  status: string;
  discount: number;
  description: string;
  avgRating: number;
  reviews: any[]; // Adjust type if needed (e.g., `Review[]` if there's a review structure)
  variants: Variant[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export default Product;
