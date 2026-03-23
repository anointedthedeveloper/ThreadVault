import { useParams, Link } from "react-router-dom";
import { useProducts } from "@/lib/products";
import { useCart } from "@/lib/cart";
import CountdownTimer from "@/components/CountdownTimer";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function ProductDetail() {
  const products = useProducts();
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  if (!product) {
    return (
      <main className="pt-16">
        <div className="container py-20 text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Link to="/shop" className="text-foreground underline mt-4 inline-block">Back to shop</Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addItem(product, selectedSize, selectedColor);
  };

  return (
    <main className="pt-16">
      <div className="container py-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          <div className="bg-card aspect-[3/4] overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            {product.isLimitedDrop && !product.isSoldOut && (
              <div className="flex items-center gap-3">
                <span className="bg-limited-drop/10 text-limited-drop px-3 py-1 text-[10px] font-display font-bold tracking-[0.2em] uppercase">
                  Limited Drop
                </span>
                {product.dropEndsAt && <CountdownTimer endsAt={product.dropEndsAt} />}
              </div>
            )}

            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{product.name}</h1>
              <p className="text-2xl font-display font-semibold mt-2">${product.price}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Size */}
            <div>
              <p className="text-xs font-display font-medium tracking-wider uppercase mb-3">Size</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border text-sm font-display font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <p className="text-xs font-display font-medium tracking-wider uppercase mb-3">Color</p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border text-sm font-display font-medium transition-colors ${
                      selectedColor === color
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.isSoldOut || !selectedSize || !selectedColor}
              className={`w-full py-4 font-display text-sm font-semibold tracking-wider uppercase transition-opacity ${
                product.isSoldOut
                  ? "bg-secondary text-sold-out cursor-not-allowed"
                  : !selectedSize || !selectedColor
                  ? "bg-secondary text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              }`}
            >
              {product.isSoldOut ? "Sold Out" : !selectedSize || !selectedColor ? "Select Size & Color" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
