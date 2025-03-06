export interface OrderItem {
  _id: string;
  user: {
    _id: string;
    name: string;
    username: string;
    address: string;
    phoneNumber: string;
  };
  orders: {
    product: { name: string };
    variant: {
      color: string;
      hexColor: string;
      size: string[];
      gallery: { url: string }[];
      stock: number;
      _id: string;
    };
    size: string;
    quantity: number;
    _id: string;
  }[];
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderData {
  createdAt: string;
  orders: OrderItem[];
  status: string;
  totalPrice: number;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}

export interface OrderResponse {
  data: OrderData;
  message?: string;
  success: boolean;
}
export interface OrderRequest {
  user: string | number;
  orders: {
    product: string;
    variant: string;
    quantity: number;
    size: string;
  }[];
}
