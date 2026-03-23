import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { User, Package, LogOut, Clock, CheckCircle, Truck } from "lucide-react";

export default function Profile() {
  const { user, orders, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl font-bold">Sign In Required</h1>
          <p className="text-muted-foreground text-sm">Sign in to view your profile and order history.</p>
          <Link
            to="/auth"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "processing": return <Clock className="w-3.5 h-3.5 text-accent" />;
      case "shipped": return <Truck className="w-3.5 h-3.5 text-accent" />;
      case "delivered": return <CheckCircle className="w-3.5 h-3.5 text-accent" />;
      default: return null;
    }
  };

  return (
    <main className="pt-16 min-h-screen">
      <div className="container py-12 max-w-3xl">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-secondary border border-border flex items-center justify-center">
              <User className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Orders */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Package className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-display text-lg font-semibold tracking-wider uppercase">Order History</h2>
          </div>

          {orders.length === 0 ? (
            <div className="bg-card border border-border p-8 text-center space-y-3">
              <p className="text-muted-foreground text-sm">No orders yet.</p>
              <Link
                to="/shop"
                className="inline-block text-sm font-display tracking-wider uppercase text-foreground hover:text-accent transition-colors"
              >
                Start Shopping →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-card border border-border p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-sm font-semibold">{order.id}</span>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        {statusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-center gap-3">
                        {item.product.image && (
                          <img src={item.product.image} alt={item.product.name} className="w-10 h-12 object-cover shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">{item.size} / {item.color} × {item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium shrink-0">${item.product.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-display text-sm font-semibold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
