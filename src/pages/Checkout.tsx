import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { useAuth, type ShippingInfo } from "@/lib/auth";
import { ArrowLeft, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { toast } from "sonner";

const initialShipping: ShippingInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "US",
};

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, placeOrder } = useAuth();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState<ShippingInfo>(() => ({
    ...initialShipping,
    email: user?.email || "",
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingInfo, string>>>({});
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [processing, setProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl font-bold">Cart is Empty</h1>
          <p className="text-muted-foreground text-sm">Add items to your cart before checking out.</p>
          <Link
            to="/shop"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  const shippingCost = totalPrice >= 150 ? 0 : 12;
  const tax = Math.round(totalPrice * 0.08 * 100) / 100;
  const orderTotal = totalPrice + shippingCost + tax;

  const update = (field: keyof ShippingInfo, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateShipping = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingInfo, string>> = {};
    if (!shipping.firstName.trim()) newErrors.firstName = "Required";
    if (!shipping.lastName.trim()) newErrors.lastName = "Required";
    if (!shipping.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) newErrors.email = "Valid email required";
    if (!shipping.address.trim()) newErrors.address = "Required";
    if (!shipping.city.trim()) newErrors.city = "Required";
    if (!shipping.state.trim()) newErrors.state = "Required";
    if (!shipping.zip.trim() || shipping.zip.trim().length < 4) newErrors.zip = "Valid ZIP required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateShipping()) setStep("payment");
  };

  const handlePlaceOrder = async () => {
    setProcessing(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));
    const order = placeOrder(items, orderTotal, shipping);
    clearCart();
    toast.success("Order placed successfully!");
    navigate(`/order/${order.id}`);
  };

  return (
    <main className="pt-16 min-h-screen">
      <div className="container py-8 max-w-5xl">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-10">
          <StepIndicator icon={<Truck className="w-4 h-4" />} label="Shipping" active={step === "shipping"} done={step === "payment"} />
          <div className="flex-1 h-px bg-border" />
          <StepIndicator icon={<CreditCard className="w-4 h-4" />} label="Payment" active={step === "payment"} done={false} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {step === "shipping" ? (
              <div className="space-y-6">
                <h2 className="font-display text-lg font-semibold tracking-wider uppercase">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="First Name" value={shipping.firstName} onChange={(v) => update("firstName", v)} error={errors.firstName} />
                  <FormField label="Last Name" value={shipping.lastName} onChange={(v) => update("lastName", v)} error={errors.lastName} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Email" type="email" value={shipping.email} onChange={(v) => update("email", v)} error={errors.email} />
                  <FormField label="Phone (optional)" type="tel" value={shipping.phone} onChange={(v) => update("phone", v)} />
                </div>
                <FormField label="Address" value={shipping.address} onChange={(v) => update("address", v)} error={errors.address} />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <FormField label="City" value={shipping.city} onChange={(v) => update("city", v)} error={errors.city} />
                  <FormField label="State" value={shipping.state} onChange={(v) => update("state", v)} error={errors.state} />
                  <FormField label="ZIP Code" value={shipping.zip} onChange={(v) => update("zip", v)} error={errors.zip} />
                </div>

                <button
                  onClick={handleContinueToPayment}
                  className="w-full bg-primary text-primary-foreground py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
                >
                  Continue to Payment
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold tracking-wider uppercase">Payment</h2>
                  <button onClick={() => setStep("shipping")} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Edit Shipping
                  </button>
                </div>

                {/* Shipping Summary */}
                <div className="bg-card border border-border p-4 text-sm space-y-1">
                  <p className="font-medium">{shipping.firstName} {shipping.lastName}</p>
                  <p className="text-muted-foreground">{shipping.address}</p>
                  <p className="text-muted-foreground">{shipping.city}, {shipping.state} {shipping.zip}</p>
                  <p className="text-muted-foreground">{shipping.email}</p>
                </div>

                {/* Mock Card */}
                <div className="space-y-4">
                  <FormField label="Card Number" value="4242 4242 4242 4242" onChange={() => {}} disabled />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Expiry" value="12/28" onChange={() => {}} disabled />
                    <FormField label="CVC" value="123" onChange={() => {}} disabled />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>This is a demo — no real payment is processed.</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className="w-full bg-primary text-primary-foreground py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {processing ? "Processing..." : `Place Order — $${orderTotal.toFixed(2)}`}
                </button>
              </div>
            )}

            {!user && (
              <div className="mt-6 bg-card border border-border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Sign in to save your info and track orders.</p>
                <Link
                  to="/auth"
                  className="text-xs font-display font-semibold tracking-wider uppercase text-foreground hover:text-accent transition-colors"
                >
                  Sign In →
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border p-6 space-y-6 lg:sticky lg:top-24">
              <h2 className="font-display text-sm font-semibold tracking-wider uppercase">Order Summary</h2>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-14 h-18 object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">{item.size} / {item.color} × {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium shrink-0">${item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-display font-semibold text-base pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
              {totalPrice < 150 && (
                <p className="text-[10px] text-muted-foreground tracking-wider uppercase text-center">
                  Free shipping on orders over $150
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function FormField({
  label, value, onChange, error, type = "text", disabled = false,
}: {
  label: string; value: string; onChange: (v: string) => void; error?: string; type?: string; disabled?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-display tracking-wider uppercase text-muted-foreground mb-1.5 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full bg-secondary text-foreground px-3 py-2.5 text-sm border transition-colors focus:outline-none ${
          error ? "border-limited-drop" : "border-border focus:border-foreground"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      />
      {error && <p className="text-limited-drop text-[10px] mt-1">{error}</p>}
    </div>
  );
}

function StepIndicator({ icon, label, active, done }: { icon: React.ReactNode; label: string; active: boolean; done: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${active ? "text-foreground" : done ? "text-accent" : "text-muted-foreground"}`}>
      {icon}
      <span className="text-xs font-display font-medium tracking-wider uppercase hidden sm:inline">{label}</span>
    </div>
  );
}
