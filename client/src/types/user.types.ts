export interface UserState {
  id: number | null;
  name: string;
  username: string;
  role: "admin" | "customer" | null;
}

