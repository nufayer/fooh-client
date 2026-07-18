"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { FoodItem } from "@/types";

interface CartItem {
  itemId: string;
  quantity: number;
  item?: FoodItem;
}

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  addToCart: (itemId: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  itemCount: number;
  getTotalPrice: () => number;
  placeOrder: () => Promise<boolean>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user || user.role === "admin") return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/cart`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (itemId: string, quantity = 1) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    if (user.role === "admin") return;
    try {
      const res = await fetch(`${API_URL}/api/cart`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity }),
      });
      if (res.ok) {
        await fetchCart();
      }
    } catch {
      // ignore
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const res = await fetch(`${API_URL}/api/cart/${itemId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        await fetchCart();
      }
    } catch {
      // ignore
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }
    const updatedItems = items.map((i) =>
      i.itemId === itemId ? { ...i, quantity } : i
    );
    try {
      const res = await fetch(`${API_URL}/api/cart`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: updatedItems }),
      });
      if (res.ok) {
        setItems(updatedItems);
      }
    } catch {
      // ignore
    }
  };

  const clearCart = async () => {
    try {
      await fetch(`${API_URL}/api/cart`, {
        method: "DELETE",
        credentials: "include",
      });
      setItems([]);
    } catch {
      // ignore
    }
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => {
    const price = item.item?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const getTotalPrice = () => {
    return items.reduce((sum, item) => {
      const price = item.item?.price || 0;
      return sum + price * item.quantity;
    }, 0);
  };

  const placeOrder = async (): Promise<boolean> => {
    if (items.length === 0) return false;
    try {
      const orderItems = items.map((item) => ({
        itemId: item.itemId,
        title: item.item?.title || "Unknown",
        price: item.item?.price || 0,
        quantity: item.quantity,
      }));
      const totalAmount = getTotalPrice();
      const deliveryFee = totalAmount > 30 ? 0 : 4.99;
      const tax = totalAmount * 0.08;
      const total = totalAmount + deliveryFee + tax;

      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: orderItems, total }),
      });
      if (res.ok) {
        await clearCart();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        getTotalPrice,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
