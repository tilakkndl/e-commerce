export interface OrderItem {
    product: string;
    variant?: string;
    quantity: number;
    size?: string;
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