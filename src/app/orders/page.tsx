"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface OrderItem {
  itemId: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  userId: string;
  userName?: string;
  items: OrderItem[];
  total: number;
  status: "Pending" | "Accepted" | "Rejected";
  createdAt: string;
}

const statusConfig = {
  Pending: { icon: Clock, color: "text-warning", bg: "bg-warning/10", border: "border-warning/30" },
  Accepted: { icon: CheckCircle, color: "text-success", bg: "bg-success/10", border: "border-success/30" },
  Rejected: { icon: XCircle, color: "text-error", bg: "bg-error/10", border: "border-error/30" },
};

export default function OrdersPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/orders`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (orderId: string, status: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        await fetchOrders();
      }
    } catch {
      // ignore
    } finally {
      setUpdatingId(null);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-bg-dark pt-20 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-bg-dark pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/explore"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-text-primary mb-2">
          {user.role === "admin" ? "All " : "My "}
          <span className="text-primary">Orders</span>
        </h1>
        <p className="text-text-secondary mb-8">
          {orders.length} {orders.length === 1 ? "order" : "orders"} found
        </p>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              No orders yet
            </h2>
            <p className="text-text-secondary mb-6">
              Place your first order to see it here!
            </p>
            <Link href="/explore">
              <Button variant="primary">Browse Menu</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;
              return (
                <div
                  key={order._id}
                  className="bg-bg-card border border-border rounded-2xl p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm text-text-muted">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </p>
                      {user.role === "admin" && order.userName && (
                        <p className="text-sm text-text-secondary">
                          by {order.userName}
                        </p>
                      )}
                      <p className="text-xs text-text-muted mt-1">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${status.bg} ${status.color} ${status.border} border`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-4">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-text-secondary">
                            {item.quantity}x
                          </span>
                          <span className="text-text-primary">{item.title}</span>
                        </div>
                        <span className="text-text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <span className="font-bold text-text-primary">
                      Total: <span className="text-primary">${order.total.toFixed(2)}</span>
                    </span>
                    {user.role === "admin" && order.status === "Pending" && (
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => updateStatus(order._id, "Accepted")}
                          isLoading={updatingId === order._id}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => updateStatus(order._id, "Rejected")}
                          isLoading={updatingId === order._id}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    {user.role === "admin" && order.status !== "Pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(order._id, "Pending")}
                        isLoading={updatingId === order._id}
                      >
                        Reset to Pending
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
