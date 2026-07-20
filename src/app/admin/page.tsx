"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

const monthlySales = [
  { month: "Jan", revenue: 4200, orders: 85 },
  { month: "Feb", revenue: 5100, orders: 102 },
  { month: "Mar", revenue: 4800, orders: 96 },
  { month: "Apr", revenue: 6200, orders: 124 },
  { month: "May", revenue: 7500, orders: 150 },
  { month: "Jun", revenue: 6800, orders: 136 },
  { month: "Jul", revenue: 8200, orders: 164 },
];

const weeklyOrders = [
  { day: "Mon", orders: 12 },
  { day: "Tue", orders: 19 },
  { day: "Wed", orders: 15 },
  { day: "Thu", orders: 22 },
  { day: "Fri", orders: 30 },
  { day: "Sat", orders: 35 },
  { day: "Sun", orders: 28 },
];

const categorySales = [
  { name: "Pizza", value: 35 },
  { name: "Burgers", value: 25 },
  { name: "Sushi", value: 18 },
  { name: "Salads", value: 12 },
  { name: "Desserts", value: 10 },
];

const COLORS = ["#FF6B35", "#E63946", "#FFD700", "#4CAF50", "#9C27B0"];

const stats = [
  { label: "Total Revenue", value: "$42,800", icon: DollarSign, change: "+12.5%", color: "text-primary" },
  { label: "Total Orders", value: "857", icon: ShoppingBag, change: "+8.2%", color: "text-secondary" },
  { label: "Active Users", value: "1,243", icon: Users, change: "+15.3%", color: "text-accent" },
  { label: "Growth Rate", value: "23.5%", icon: TrendingUp, change: "+4.1%", color: "text-success" },
];

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-bg-dark pt-20 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-text-secondary">Overview of your restaurant performance</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-bg-surface flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-sm text-success font-medium">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-sm text-text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                <XAxis dataKey="month" stroke="#8888a0" fontSize={12} />
                <YAxis stroke="#8888a0" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #2a2a3e", borderRadius: "12px" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="revenue" fill="#FF6B35" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Weekly Orders</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyOrders}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                <XAxis dataKey="day" stroke="#8888a0" fontSize={12} />
                <YAxis stroke="#8888a0" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #2a2a3e", borderRadius: "12px" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Line type="monotone" dataKey="orders" stroke="#E63946" strokeWidth={3} dot={{ fill: "#E63946", r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categorySales}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categorySales.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #2a2a3e", borderRadius: "12px" }}
                />
                <Legend
                  formatter={(value) => <span className="text-text-secondary text-sm">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-2 bg-bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {[
                { id: "#ORD-7821", customer: "Sarah J.", items: "2x Burger, 1x Fries", total: "$24.99", status: "Accepted" },
                { id: "#ORD-7820", customer: "Mike C.", items: "1x Pizza, 2x Coke", total: "$18.50", status: "Pending" },
                { id: "#ORD-7819", customer: "Emily R.", items: "1x Sushi Set", total: "$32.00", status: "Accepted" },
                { id: "#ORD-7818", customer: "David P.", items: "3x Salad, 1x Soup", total: "$27.75", status: "Rejected" },
                { id: "#ORD-7817", customer: "Lisa M.", items: "2x Pasta, 1x Tiramisu", total: "$35.25", status: "Accepted" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-bg-surface rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {order.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{order.id}</p>
                      <p className="text-sm text-text-muted">{order.customer} · {order.items}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-text-primary">{order.total}</p>
                    <span className={`text-xs font-medium ${
                      order.status === "Accepted" ? "text-success" :
                      order.status === "Pending" ? "text-warning" : "text-error"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/orders" className="block mt-4 text-center text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              View All Orders →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
