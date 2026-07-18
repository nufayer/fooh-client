"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useItems } from "@/hooks/useData";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { items: cart, updateQuantity, removeFromCart, clearCart, getTotalPrice, placeOrder } = useCart();
  const router = useRouter();
  const [isPlacing, setIsPlacing] = useState(false);

  const { items: allItems } = useItems();

  // Merge cart with fresh item data
  const cartItems = cart
    .map((cartItem) => {
      const item = allItems.find((i) => i._id === cartItem.itemId);
      if (!item) return null;
      return { ...item, quantity: cartItem.quantity };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-bg-dark pt-20 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal > 30 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    setIsPlacing(true);
    const success = await placeOrder();
    setIsPlacing(false);
    if (success) {
      router.push("/orders");
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Your <span className="text-primary">Cart</span>
            </h1>
            <p className="text-text-secondary mt-1">
              {cart.length} items in your cart
            </p>
          </div>
          {cart.length > 0 && (
            <Button variant="outline" onClick={clearCart}>
              Clear All
            </Button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Your cart is empty
            </h2>
            <p className="text-text-secondary mb-6">
              Add some delicious items from our menu
            </p>
            <Link href="/explore">
              <Button variant="primary">Browse Menu</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-bg-card border border-border rounded-2xl p-4 flex items-center gap-4"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-muted">{item.category}</p>
                    <p className="text-primary font-bold mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, item.quantity - 1))
                      }
                      className="w-8 h-8 rounded-lg bg-bg-surface border border-border flex items-center justify-center text-text-primary hover:bg-bg-hover transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-semibold text-text-primary">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-lg bg-bg-surface border border-border flex items-center justify-center text-text-primary hover:bg-bg-hover transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-error hover:text-error/80 transition-colors mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-bg-card border border-border rounded-2xl p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal</span>
                    <span className="text-text-primary">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Delivery Fee</span>
                    <span className="text-text-primary">
                      {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Tax</span>
                    <span className="text-text-primary">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-accent">
                      Free delivery on orders over $30
                    </p>
                  )}
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="text-text-primary font-semibold">
                        Total
                      </span>
                      <span className="text-xl font-bold text-primary">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  size="lg"
                  onClick={handlePlaceOrder}
                  isLoading={isPlacing}
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
