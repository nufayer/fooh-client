"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Utensils,
  ShoppingCart,
  ClipboardList,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/explore?view=categories", label: "Categories" },
];

const customerLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/explore?view=categories", label: "Categories" },
  { href: "/orders", label: "My Orders" },
];

const adminLinks = [
  { href: "/", label: "Home" },
  { href: "/admin", label: "Dashboard" },
  { href: "/orders", label: "Orders" },
  { href: "/items/add", label: "Add Item" },
  { href: "/items/manage", label: "Manage Items" },
  { href: "/categories/add", label: "Add Category" },
  { href: "/categories/manage", label: "Manage Categories" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const links = !user ? publicLinks : user.role === "admin" ? adminLinks : customerLinks;

  const isActive = (href: string) => {
    const [hrefPath, hrefQuery] = href.split("?");
    const hrefParams = new URLSearchParams(hrefQuery);
    const hrefView = hrefParams.get("view");
    const currentView = searchParams.get("view");

    if (hrefView) {
      return pathname === hrefPath && currentView === hrefView;
    }
    if (pathname === hrefPath && !currentView) {
      return true;
    }
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">FOOH</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {user.role === "customer" && (
                  <Link
                    href="/cart"
                    className="relative p-2 rounded-xl hover:bg-bg-hover transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5 text-text-secondary" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {itemCount > 99 ? "99+" : itemCount}
                      </span>
                    )}
                  </Link>
                )}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-bg-hover transition-colors"
                  >
                    <Avatar name={user.name} size="sm" />
                    <span className="text-sm font-medium text-text-primary">
                      {user.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-bg-card border border-border rounded-xl shadow-xl py-2 animate-fade-in">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium text-text-primary">{user.name}</p>
                        <p className="text-xs text-text-muted">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full capitalize">
                          {user.role}
                        </span>
                      </div>
                      {user.role === "customer" && (
                        <>
                          <Link
                            href="/cart"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Cart ({itemCount})
                          </Link>
                          <Link
                            href="/orders"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <ClipboardList className="w-4 h-4" />
                            My Orders
                          </Link>
                        </>
                      )}
                      <Link
                        href="/items/manage"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-error hover:bg-bg-hover"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-bg-hover text-text-primary"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-bg-card border-t border-border animate-fade-in">
          <div className="px-4 py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user && user.role === "customer" && (
              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover"
              >
                <ShoppingCart className="w-4 h-4" />
                Cart {itemCount > 0 && `(${itemCount})`}
              </Link>
            )}
            {user && (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium text-error hover:bg-bg-hover"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
