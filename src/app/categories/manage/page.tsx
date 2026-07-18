"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useCategories } from "@/hooks/useData";
import { Pencil, Trash2, Search, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ManageCategoriesPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-bg-dark pt-20 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch {
      // ignore
    } finally {
      setDeleting(false);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Manage <span className="text-primary">Categories</span>
            </h1>
            <p className="text-text-secondary">
              {categories.length} categories in your menu
            </p>
          </div>
          <Link href="/categories/add">
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Add New Category
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search categories..."
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
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary hidden sm:table-cell">
                    Items
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-text-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((cat) => (
                  <tr
                    key={cat._id}
                    className="border-b border-border last:border-0 hover:bg-bg-hover transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-bg-surface">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-text-primary truncate">
                            {cat.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="px-3 py-1 bg-bg-surface rounded-full text-xs text-text-secondary">
                        {cat.itemCount} items
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/categories/edit/${cat._id}`}>
                          <button className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                            <Pencil className="w-4 h-4" />
                          </button>
                        </Link>
                        {deleteConfirm === cat._id ? (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(cat._id)}
                              isLoading={deleting}
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
                            onClick={() => setDeleteConfirm(cat._id)}
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

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-muted mb-4">No categories found</p>
              <Link href="/categories/add">
                <Button variant="primary">Add Your First Category</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
