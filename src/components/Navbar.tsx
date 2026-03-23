import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/shop?category=tops", label: "Tops" },
  { to: "/shop?category=bottoms", label: "Bottoms" },
  { to: "/shop?category=outerwear", label: "Outerwear" },
  { to: "/drops", label: "Drops" },
];

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl font-bold tracking-[0.2em] text-foreground uppercase">
          ThreadVault
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to={user ? "/profile" : "/auth"}
            className="text-foreground hover:text-muted-foreground transition-colors"
          >
            <User className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-foreground hover:text-muted-foreground transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={user ? "/profile" : "/auth"}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {user ? "Profile" : "Sign In"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
