import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts, productStore, type Product } from "@/lib/products";
import { Package, Tag, Clock, Trash2, Edit2, Plus, LogOut, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const products = useProducts();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Check admin session
  if (sessionStorage.getItem("tv_admin") !== "1") {
    navigate("/admin");
    return null;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("tv_admin");
    navigate("/admin");
  };

  const toggleLimitedDrop = (product: Product) => {
    productStore.updateProduct(product.id, {
      isLimitedDrop: !product.isLimitedDrop,
      dropEndsAt: !product.isLimitedDrop
        ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
        : undefined,
    });
    toast.success(`${product.name} ${!product.isLimitedDrop ? "marked as" : "removed from"} limited drop`);
  };

  const toggleSoldOut = (product: Product) => {
    productStore.updateProduct(product.id, { isSoldOut: !product.isSoldOut });
    toast.success(`${product.name} marked as ${!product.isSoldOut ? "sold out" : "available"}`);
  };

  const deleteProduct = (product: Product) => {
    productStore.deleteProduct(product.id);
    toast.success(`${product.name} deleted`);
  };

  const stats = {
    total: products.length,
    drops: products.filter((p) => p.isLimitedDrop).length,
    soldOut: products.filter((p) => p.isSoldOut).length,
  };

  return (
    <main className="pt-16 min-h-screen">
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-display mb-2">Management</p>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Admin Dashboard</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-card border border-border p-5">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-display tracking-wider uppercase text-muted-foreground">Products</span>
            </div>
            <span className="text-3xl font-display font-bold">{stats.total}</span>
          </div>
          <div className="bg-card border border-border p-5">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-4 h-4 text-limited-drop" />
              <span className="text-xs font-display tracking-wider uppercase text-muted-foreground">Active Drops</span>
            </div>
            <span className="text-3xl font-display font-bold">{stats.drops}</span>
          </div>
          <div className="bg-card border border-border p-5">
            <div className="flex items-center gap-3 mb-2">
              <Tag className="w-4 h-4 text-sold-out" />
              <span className="text-xs font-display tracking-wider uppercase text-muted-foreground">Sold Out</span>
            </div>
            <span className="text-3xl font-display font-bold">{stats.soldOut}</span>
          </div>
        </div>

        {/* Add Product Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-lg font-semibold tracking-wider uppercase">All Products</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 font-display text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            <Plus className="w-3.5 h-3.5" /> Add Product
          </button>
        </div>

        {/* Add Product Form */}
        {showAddForm && <AddProductForm onClose={() => setShowAddForm(false)} />}

        {/* Product Table */}
        <div className="border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="text-left text-xs font-display font-medium tracking-wider uppercase text-muted-foreground p-4">Product</th>
                  <th className="text-left text-xs font-display font-medium tracking-wider uppercase text-muted-foreground p-4">Category</th>
                  <th className="text-left text-xs font-display font-medium tracking-wider uppercase text-muted-foreground p-4">Price</th>
                  <th className="text-left text-xs font-display font-medium tracking-wider uppercase text-muted-foreground p-4">Drop</th>
                  <th className="text-left text-xs font-display font-medium tracking-wider uppercase text-muted-foreground p-4">Status</th>
                  <th className="text-right text-xs font-display font-medium tracking-wider uppercase text-muted-foreground p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border last:border-0 hover:bg-card/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-10 h-12 object-cover" />
                        <span className="font-display text-sm font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-display tracking-wider uppercase text-muted-foreground">{product.category}</span>
                    </td>
                    <td className="p-4">
                      {editingId === product.id ? (
                        <PriceEditor product={product} onDone={() => setEditingId(null)} />
                      ) : (
                        <span className="text-sm font-medium">${product.price}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <button onClick={() => toggleLimitedDrop(product)} className="flex items-center gap-1.5 text-xs transition-colors">
                        {product.isLimitedDrop ? (
                          <><ToggleRight className="w-4 h-4 text-limited-drop" /><span className="text-limited-drop">Active</span></>
                        ) : (
                          <><ToggleLeft className="w-4 h-4 text-muted-foreground" /><span className="text-muted-foreground">Off</span></>
                        )}
                      </button>
                    </td>
                    <td className="p-4">
                      <button onClick={() => toggleSoldOut(product)} className={`text-xs font-display tracking-wider uppercase px-2 py-1 border ${product.isSoldOut ? "border-sold-out text-sold-out" : "border-accent text-accent"}`}>
                        {product.isSoldOut ? "Sold Out" : "In Stock"}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setEditingId(product.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteProduct(product)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

function PriceEditor({ product, onDone }: { product: Product; onDone: () => void }) {
  const [price, setPrice] = useState(String(product.price));
  const handleSave = () => {
    const num = parseFloat(price);
    if (!isNaN(num) && num > 0) {
      productStore.updateProduct(product.id, { price: num });
      toast.success("Price updated");
    }
    onDone();
  };
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm">$</span>
      <input
        autoFocus
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => e.key === "Enter" && handleSave()}
        className="w-16 bg-secondary text-foreground text-sm px-2 py-1 border border-border focus:outline-none focus:border-foreground"
      />
    </div>
  );
}

function AddProductForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<Product["category"]>("tops");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    const newProduct: Product = {
      id: String(Date.now()),
      name,
      price: parseFloat(price),
      image: "", // Placeholder - no image upload in demo
      category,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White"],
      isLimitedDrop: false,
      isSoldOut: false,
      description,
    };
    productStore.addProduct(newProduct);
    toast.success(`${name} added`);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border p-6 mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-display tracking-wider uppercase text-muted-foreground mb-1 block">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-secondary text-foreground px-3 py-2 text-sm border border-border focus:outline-none focus:border-foreground" />
        </div>
        <div>
          <label className="text-xs font-display tracking-wider uppercase text-muted-foreground mb-1 block">Price ($)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full bg-secondary text-foreground px-3 py-2 text-sm border border-border focus:outline-none focus:border-foreground" />
        </div>
        <div>
          <label className="text-xs font-display tracking-wider uppercase text-muted-foreground mb-1 block">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as Product["category"])} className="w-full bg-secondary text-foreground px-3 py-2 text-sm border border-border focus:outline-none focus:border-foreground">
            <option value="tops">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="outerwear">Outerwear</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs font-display tracking-wider uppercase text-muted-foreground mb-1 block">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full bg-secondary text-foreground px-3 py-2 text-sm border border-border focus:outline-none focus:border-foreground resize-none" />
      </div>
      <div className="flex gap-3">
        <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 font-display text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity">
          Add Product
        </button>
        <button type="button" onClick={onClose} className="border border-border text-muted-foreground px-6 py-2 font-display text-xs font-semibold tracking-wider uppercase hover:text-foreground hover:border-foreground transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
