"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ImagePlus, X, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [itemCount, setItemCount] = useState("0");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`${API_URL}/api/categories`, {
          credentials: "include",
        });
        if (res.ok) {
          const categories = await res.json();
          const cat = categories.find((c: any) => c._id === id);
          if (cat) {
            setName(cat.name);
            setImageUrl(cat.image);
            setItemCount(String(cat.itemCount || 0));
          } else {
            setNotFound(true);
          }
        }
      } catch {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchCategory();
  }, [id]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-bg-dark pt-20 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  if (notFound) {
    return (
      <div className="min-h-screen bg-bg-dark pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            Category not found
          </h1>
          <Link href="/categories/manage">
            <Button variant="primary">Back to Categories</Button>
          </Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Category name is required";
    if (!imageUrl.trim()) newErrors.imageUrl = "Image URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          image: imageUrl,
          itemCount: parseInt(itemCount) || 0,
        }),
      });
      if (res.ok) {
        router.push("/categories/manage");
      }
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/categories/manage"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Edit <span className="text-primary">Category</span>
          </h1>
          <p className="text-text-secondary">
            Update the category details
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-bg-card border border-border rounded-2xl p-6 space-y-6">
            <Input
              label="Category Name"
              placeholder="e.g., Pizza, Burgers, Sushi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />

            <Input
              label="Image URL"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              error={errors.imageUrl}
              icon={<ImagePlus className="w-4 h-4" />}
            />

            {imageUrl && (
              <div className="relative h-40 rounded-xl overflow-hidden border border-border">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 p-1 bg-bg-dark/80 rounded-full text-text-muted hover:text-error"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <Input
              label="Item Count"
              type="number"
              min="0"
              placeholder="0"
              value={itemCount}
              onChange={(e) => setItemCount(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
