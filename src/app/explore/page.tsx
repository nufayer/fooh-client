"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, X, ArrowRight } from "lucide-react";
import { foodItems, categories } from "@/data/mockData";
import FoodCard from "@/components/ui/FoodCard";
import { ListSkeleton } from "@/components/ui/Skeleton";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

const priceRanges = [
  { value: "", label: "All Prices" },
  { value: "0-10", label: "Under $10" },
  { value: "10-15", label: "$10 - $15" },
  { value: "15-20", label: "$15 - $20" },
  { value: "20+", label: "$20+" },
];

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
];

const ratingOptions = [
  { value: "", label: "All Ratings" },
  { value: "4.5", label: "4.5+ Stars" },
  { value: "4", label: "4+ Stars" },
  { value: "3.5", label: "3.5+ Stars" },
];

const ITEMS_PER_PAGE = 8;

function CategoriesView() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
          Food <span className="text-primary">Categories</span>
        </h1>
        <p className="text-text-secondary">
          Browse {categories.length} categories and discover your favorite cuisines
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/explore?category=${category.name.toLowerCase()}`}
            className="group relative h-56 rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-text-primary">
                    {category.icon} {category.name}
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    {category.itemCount} items available
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ExploreContent() {
  const searchParams = useSearchParams();
  const viewCategories = searchParams.get("view") === "categories";
  const initialCategory = searchParams.get("category") || "";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading] = useState(false);

  const filteredItems = useMemo(() => {
    let items = [...foodItems];

    if (search) {
      const query = search.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.shortDescription.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      items = items.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      if (max) {
        items = items.filter((item) => item.price >= min && item.price <= max);
      } else {
        items = items.filter((item) => item.price >= 20);
      }
    }

    if (minRating) {
      items = items.filter((item) => item.rating >= parseFloat(minRating));
    }

    switch (sortBy) {
      case "rating":
        items.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        items.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        items.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        items.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "popular":
      default:
        items.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return items;
  }, [search, selectedCategory, priceRange, minRating, sortBy]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setPriceRange("");
    setMinRating("");
    setSortBy("popular");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    search || selectedCategory || priceRange || minRating || sortBy !== "popular";

  if (viewCategories) {
    return (
      <div className="min-h-screen bg-bg-dark pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoriesView />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
            Explore <span className="text-primary">Menu</span>
          </h1>
          <p className="text-text-secondary">
            Discover {foodItems.length} delicious dishes from top restaurants
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 w-full px-4 py-3 bg-bg-card border border-border rounded-xl text-text-primary mb-4"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {hasActiveFilters && (
                <span className="ml-auto w-2 h-2 bg-primary rounded-full" />
              )}
            </button>

            <div
              className={`${
                showFilters ? "block" : "hidden"
              } lg:block space-y-6`}
            >
              <div className="bg-bg-card border border-border rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Filters
                </h3>

                <div className="space-y-5">
                  <Input
                    placeholder="Search dishes..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    icon={<Search className="w-4 h-4" />}
                  />

                  <Select
                    label="Category"
                    value={selectedCategory}
                    onChange={(val) => {
                      setSelectedCategory(val);
                      setCurrentPage(1);
                    }}
                    options={categories.map((cat) => ({
                      value: cat.name.toLowerCase(),
                      label: `${cat.icon} ${cat.name}`,
                    }))}
                    placeholder="All Categories"
                  />

                  <Select
                    label="Price Range"
                    value={priceRange}
                    onChange={(val) => {
                      setPriceRange(val);
                      setCurrentPage(1);
                    }}
                    options={priceRanges.slice(1)}
                  />

                  <Select
                    label="Minimum Rating"
                    value={minRating}
                    onChange={(val) => {
                      setMinRating(val);
                      setCurrentPage(1);
                    }}
                    options={ratingOptions.slice(1)}
                  />

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 text-sm text-error hover:text-error/80 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>

              <Link
                href="/explore?view=categories"
                className="flex items-center gap-2 w-full px-4 py-3 bg-bg-card border border-border rounded-xl text-text-secondary hover:text-primary hover:border-primary/50 transition-colors text-sm font-medium"
              >
                Browse All Categories
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-text-secondary">
                {filteredItems.length} items found
              </p>
              <Select
                value={sortBy}
                onChange={setSortBy}
                options={sortOptions}
                className="w-48"
              />
            </div>

            {isLoading ? (
              <ListSkeleton count={8} />
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-text-muted text-lg mb-4">
                  No items found matching your criteria
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedItems.map((item) => (
                    <FoodCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      description={item.shortDescription}
                      price={item.price}
                      image={item.image}
                      rating={item.rating}
                      reviews={item.reviews}
                      category={item.category}
                      preparationTime={item.preparationTime}
                      location={item.location}
                      tags={item.tags}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                          currentPage === i + 1
                            ? "bg-primary text-white"
                            : "bg-bg-card text-text-secondary hover:bg-bg-hover border border-border"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg-dark pt-20 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
