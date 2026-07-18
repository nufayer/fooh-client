"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCategories } from "@/hooks/useData";
import { ImagePlus, Plus, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Select";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AddItemPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { categories } = useCategories();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

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
    if (!title.trim()) newErrors.title = "Title is required";
    if (!shortDescription.trim())
      newErrors.shortDescription = "Short description is required";
    if (!fullDescription.trim())
      newErrors.fullDescription = "Full description is required";
    if (!price || parseFloat(price) <= 0)
      newErrors.price = "Valid price is required";
    if (!category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError(null);

    try {
      const res = await fetch(`${API_URL}/api/items`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          shortDescription: shortDescription.trim(),
          fullDescription: fullDescription.trim(),
          price: parseFloat(price),
          category,
          image: imageUrl || undefined,
          tags,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to add item");
      }

      setSubmitted(true);
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
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
            Item Added Successfully!
          </h2>
          <p className="text-text-secondary mb-6">
            Your item has been added to the menu.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setTitle("");
                setShortDescription("");
                setFullDescription("");
                setPrice("");
                setCategory("");
                setImageUrl("");
                setTags([]);
                setSubmitted(false);
              }}
            >
              Add Another
            </Button>
            <Button variant="primary" onClick={() => router.push("/items/manage")}>
              Manage Items
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
            Add New <span className="text-primary">Item</span>
          </h1>
          <p className="text-text-secondary">
            Fill in the details to add a new item to the menu
          </p>
        </div>

        {apiError && (
          <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-xl text-error text-sm">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-bg-card border border-border rounded-2xl p-6 space-y-6">
            <Input
              label="Item Title"
              placeholder="e.g., Margherita Pizza"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
            />

            <Input
              label="Short Description"
              placeholder="Brief description of the item"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              error={errors.shortDescription}
            />

            <Textarea
              label="Full Description"
              placeholder="Detailed description including ingredients, preparation method, etc."
              value={fullDescription}
              onChange={setFullDescription}
              rows={5}
              error={errors.fullDescription}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Price ($)"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                error={errors.price}
              />

              <Select
                label="Category"
                value={category}
                onChange={setCategory}
                options={categories.map((cat) => ({
                  value: cat.name,
                  label: cat.name,
                }))}
                placeholder="Select category"
              />
            </div>

            <Input
              label="Image URL (optional)"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
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

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Tags (optional)
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add a tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addTag}
                  className="flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-primary-dark"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              Add Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
