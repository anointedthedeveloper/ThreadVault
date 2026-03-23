import { Link } from "react-router-dom";
import type { Product } from "@/lib/products";
import CountdownTimer from "./CountdownTimer";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-card aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isSoldOut && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="font-display text-sm font-bold tracking-[0.3em] uppercase text-sold-out">Sold Out</span>
          </div>
        )}
        {product.isLimitedDrop && !product.isSoldOut && (
          <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm px-3 py-1.5">
            <span className="text-[10px] font-display font-bold tracking-[0.2em] uppercase text-limited-drop">Limited Drop</span>
          </div>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-sm font-medium tracking-wide">{product.name}</h3>
          <span className="font-display text-sm font-semibold shrink-0">${product.price}</span>
        </div>
        {product.isLimitedDrop && product.dropEndsAt && !product.isSoldOut && (
          <CountdownTimer endsAt={product.dropEndsAt} />
        )}
      </div>
    </Link>
  );
}
