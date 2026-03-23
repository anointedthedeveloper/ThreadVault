import { useSearchParams } from "react-router-dom";
import { useProducts, type Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

const categories = ["all", "tops", "bottoms", "outerwear"] as const;

export default function Shop() {
  const products = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const matchesCategory = categoryParam === "all" || p.category === categoryParam;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="pt-16">
      <div className="container py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-display mb-2">Collection</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Shop All</h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (cat === "all") {
                    searchParams.delete("category");
                  } else {
                    searchParams.set("category", cat);
                  }
                  setSearchParams(searchParams);
                }}
                className={`px-4 py-2 text-xs font-display font-medium tracking-wider uppercase border transition-colors ${
                  (cat === "all" && categoryParam === "all") || cat === categoryParam
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-secondary text-foreground px-4 py-2.5 text-sm border border-border focus:outline-none focus:border-foreground transition-colors w-full md:w-64"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
