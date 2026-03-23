import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { orders } = useAuth();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl font-bold">Order Not Found</h1>
          <Link to="/shop" className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors">
            Return to Shop →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center space-y-8 py-20">
        <div className="space-y-4">
          <CheckCircle className="w-16 h-16 text-accent mx-auto" />
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Order Confirmed</h1>
          <p className="text-muted-foreground">
            Your order <span className="font-display font-semibold text-foreground">{order.id}</span> has been placed successfully.
          </p>
        </div>

        <div className="bg-card border border-border p-6 text-left space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-display tracking-wider uppercase text-muted-foreground">Order Details</span>
          </div>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                <span>
                  {item.product.name}{" "}
                  <span className="text-muted-foreground">({item.size}/{item.color}) × {item.quantity}</span>
                </span>
                <span className="font-medium">${item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3 flex justify-between font-display font-semibold">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-card border border-border p-4 text-left text-sm space-y-1">
          <p className="text-xs font-display tracking-wider uppercase text-muted-foreground mb-2">Shipping To</p>
          <p className="font-medium">{order.shipping.firstName} {order.shipping.lastName}</p>
          <p className="text-muted-foreground">{order.shipping.address}</p>
          <p className="text-muted-foreground">{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/shop"
            className="bg-primary text-primary-foreground px-8 py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/profile"
            className="border border-border text-foreground px-8 py-3 font-display text-sm font-semibold tracking-wider uppercase hover:border-foreground transition-colors text-center"
          >
            View Orders
          </Link>
        </div>
      </div>
    </main>
  );
}
