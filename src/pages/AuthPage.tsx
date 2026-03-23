import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/profile");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (mode === "login") {
      const success = login(email.trim(), password);
      if (success) {
        toast.success("Welcome back!");
        navigate("/profile");
      } else {
        setError("Invalid email or password.");
      }
    } else {
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }
      const success = signup(name.trim(), email.trim(), password);
      if (success) {
        toast.success("Account created!");
        navigate("/profile");
      } else {
        setError("An account with this email already exists.");
      }
    }
  };

  return (
    <main className="pt-16 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-3">
          <h1 className="font-display text-3xl font-bold tracking-tight">
            {mode === "login" ? "Welcome Back" : "Join ThreadVault"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {mode === "login"
              ? "Sign in to track orders and manage your account."
              : "Create an account for faster checkout and order tracking."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full bg-secondary text-foreground pl-10 pr-4 py-3 text-sm border border-border focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-secondary text-foreground pl-10 pr-4 py-3 text-sm border border-border focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-secondary text-foreground pl-10 pr-4 py-3 text-sm border border-border focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          {error && <p className="text-limited-drop text-xs">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
          >
            {mode === "login" ? "Sign In" : "Create Account"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

        {mode === "login" && (
          <p className="text-center text-[10px] text-muted-foreground tracking-wider uppercase">
            Demo: demo@threadvault.com / demo123
          </p>
        )}
      </div>
    </main>
  );
}
