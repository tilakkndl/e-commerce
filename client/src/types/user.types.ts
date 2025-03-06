export interface UserState {
  _id: number | null;
  name: string;
  username: string;
  role: "admin" | "customer" | null;
}
