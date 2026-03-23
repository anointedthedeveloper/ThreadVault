import { useProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Drops() {
  const products = useProducts();
  const drops = products.filter((p) => p.isLimitedDrop);
  return (
    <main className="pt-16">
      <div className="container py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-display mb-2">Exclusive</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Limited Drops</h1>
          <p className="text-muted-foreground mt-3 max-w-lg">
            Time-limited releases. When they're gone, they're gone. No restocks.
          </p>
        </div>

        {drops.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">No active drops right now. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {drops.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
