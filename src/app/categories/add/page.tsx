"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ImagePlus, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AddCategoryPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [itemCount, setItemCount] = useState("0");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
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

  if (!user || user.role !== "admin") return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Category name is required";
    if (!imageUrl.trim()) newErrors.imageUrl = "Image URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const res = await fetch(`${API_URL}/api/categories`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            image: imageUrl,
            itemCount: parseInt(itemCount) || 0,
          }),
        });
        if (res.ok) {
          setSubmitted(true);
        }
      } catch {
        // ignore
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-bg-dark pt-20 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Category Added Successfully!
          </h2>
          <p className="text-text-secondary mb-6">
            Your new category is now live.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setName("");
                setImageUrl("");
                setItemCount("0");
                setSubmitted(false);
              }}
            >
              Add Another
            </Button>
            <Button variant="primary" onClick={() => router.push("/explore?view=categories")}>
              View Categories
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Add New <span className="text-primary">Category</span>
          </h1>
          <p className="text-text-secondary">
            Create a new food category for the menu
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
              label="Initial Item Count"
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
              Add Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
