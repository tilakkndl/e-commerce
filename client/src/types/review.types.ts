export type Review = {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  product: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
};
