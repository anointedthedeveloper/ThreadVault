import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import type { CartItem } from "./cart";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  shipping: ShippingInfo;
  status: "processing" | "shipped" | "delivered";
  date: string;
};

export type ShippingInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  orders: Order[];
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  placeOrder: (items: CartItem[], total: number, shipping: ShippingInfo) => Order;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user store
const mockUsers: { email: string; password: string; name: string; id: string }[] = [
  { id: "u1", email: "demo@threadvault.com", password: "demo123", name: "Demo User" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const login = useCallback((email: string, password: string): boolean => {
    const found = mockUsers.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser({ id: found.id, email: found.email, name: found.name });
      return true;
    }
    return false;
  }, []);

  const signup = useCallback((name: string, email: string, password: string): boolean => {
    if (mockUsers.find((u) => u.email === email)) return false;
    const newUser = { id: `u${Date.now()}`, email, password, name };
    mockUsers.push(newUser);
    setUser({ id: newUser.id, email: newUser.email, name: newUser.name });
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const placeOrder = useCallback((items: CartItem[], total: number, shipping: ShippingInfo): Order => {
    const order: Order = {
      id: `TV-${String(Date.now()).slice(-6)}`,
      items: [...items],
      total,
      shipping,
      status: "processing",
      date: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  return (
    <AuthContext.Provider value={{ user, orders, login, signup, logout, placeOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
