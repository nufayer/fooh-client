"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { foodItems } from "@/data/mockData";
import { Eye, Trash2, Search, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ManageItemsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState(foodItems);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-bg-dark pt-20 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-bg-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Manage <span className="text-primary">Items</span>
            </h1>
            <p className="text-text-secondary">
              {items.length} items in your menu
            </p>
          </div>
          <Link href="/items/add">
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search items by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            className="max-w-md"
          />
        </div>

        <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary">
                    Item
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary hidden sm:table-cell">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary hidden md:table-cell">
                    Price
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary hidden lg:table-cell">
                    Rating
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-text-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-border last:border-0 hover:bg-bg-hover transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-text-primary truncate">
                            {item.title}
                          </p>
                          <p className="text-sm text-text-muted truncate sm:hidden">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="px-3 py-1 bg-bg-surface rounded-full text-xs text-text-secondary">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="font-medium text-text-primary">
                        ${item.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <span className="text-accent">★</span>
                        <span className="text-text-primary">{item.rating}</span>
                        <span className="text-text-muted">
                          ({item.reviews})
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/items/${item.id}`}>
                          <button className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>
                        {deleteConfirm === item.id ? (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                            >
                              Confirm
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteConfirm(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(item.id)}
                            className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-muted mb-4">No items found</p>
              <Link href="/items/add">
                <Button variant="primary">Add Your First Item</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
