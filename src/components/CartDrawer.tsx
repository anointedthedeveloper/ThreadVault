import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-background/60 z-50" onClick={() => setIsCartOpen(false)} />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-border z-50 animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-display text-lg font-semibold tracking-wider uppercase">
            Cart ({items.length})
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center mt-12">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4">
                <img src={item.product.image} alt={item.product.name} className="w-20 h-24 object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-sm font-medium">{item.product.name}</h3>
                    <p className="text-muted-foreground text-xs mt-0.5">{item.size} / {item.color}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">${item.product.price * item.quantity}</span>
                      <button
                        onClick={() => removeItem(item.product.id, item.size, item.color)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-border space-y-4">
            <div className="flex justify-between font-display text-sm font-semibold tracking-wider uppercase">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
            <button
              onClick={() => { setIsCartOpen(false); navigate("/checkout"); }}
              className="w-full bg-primary text-primary-foreground py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
