import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-model.jpg";
import { useProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CountdownTimer from "@/components/CountdownTimer";

export default function Index() {
  const products = useProducts();
  const limitedDrops = products.filter((p) => p.isLimitedDrop && !p.isSoldOut);
  const featured = products.filter((p) => !p.isSoldOut).slice(0, 4);
  return (
    <main>
      {/* Hero */}
      <section className="relative h-screen flex items-end">
        <img
          src={heroImage}
          alt="ThreadVault campaign"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative container pb-20 space-y-6">
          <div className="space-y-3 max-w-xl" style={{ animationDelay: "0.2s" }}>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-display animate-fade-in-up">Season 01 — Now Live</p>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[0.95] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              The Vault<br />Is Open
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-sm animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Premium streetwear essentials. Limited drops. No restocks.
            </p>
          </div>
          <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/shop"
              className="bg-primary text-primary-foreground px-8 py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/drops"
              className="border border-foreground text-foreground px-8 py-3 font-display text-sm font-semibold tracking-wider uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              View Drops
            </Link>
          </div>
        </div>
      </section>

      {/* Limited Drops Banner */}
      {limitedDrops.length > 0 && (
        <section className="border-b border-border">
          <div className="container py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-limited-drop animate-pulse-dot" />
              <span className="font-display text-xs font-bold tracking-[0.3em] uppercase">
                Active Drops
              </span>
            </div>
            {limitedDrops[0].dropEndsAt && (
              <CountdownTimer endsAt={limitedDrops[0].dropEndsAt} />
            )}
          </div>
        </section>
      )}

      {/* Featured */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-display mb-2">Curated</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Featured</h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-display tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Statement */}
      <section className="border-t border-border">
        <div className="container py-20 md:py-32 text-center max-w-3xl mx-auto space-y-6">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-display">The Philosophy</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
            Built for those who move different.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            ThreadVault is not just clothing — it's a statement. Every piece is designed with intention, 
            crafted with premium materials, and released in limited quantities. No restocks. No compromises.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider uppercase mb-4">Shop</h3>
            <div className="space-y-2">
              <Link to="/shop?category=tops" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Tops</Link>
              <Link to="/shop?category=bottoms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Bottoms</Link>
              <Link to="/shop?category=outerwear" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Outerwear</Link>
              <Link to="/drops" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Drops</Link>
            </div>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider uppercase mb-4">Info</h3>
            <div className="space-y-2">
              <span className="block text-sm text-muted-foreground">About</span>
              <span className="block text-sm text-muted-foreground">Size Guide</span>
              <span className="block text-sm text-muted-foreground">Shipping</span>
              <span className="block text-sm text-muted-foreground">Returns</span>
            </div>
          </div>
          <div className="col-span-2 md:col-span-2 md:text-right">
            <h3 className="font-display text-sm font-semibold tracking-wider uppercase mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-3">Get early access to drops and exclusives.</p>
            <div className="flex max-w-sm md:ml-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-secondary text-foreground px-4 py-2.5 text-sm border border-border focus:outline-none focus:border-foreground transition-colors"
              />
              <button className="bg-primary text-primary-foreground px-6 py-2.5 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="container py-6 flex items-center justify-between">
            <span className="font-display text-xs tracking-[0.2em] uppercase text-muted-foreground">
              © 2026 ThreadVault
            </span>
            <span className="text-xs text-muted-foreground">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
