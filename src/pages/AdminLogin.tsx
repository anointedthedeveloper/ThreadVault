import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const ADMIN_CODE = "threadvault2026";

export default function AdminLogin() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      sessionStorage.setItem("tv_admin", "1");
      navigate("/admin/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <main className="pt-16 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border border-border flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Admin Access</h1>
          <p className="text-muted-foreground text-sm">Enter the admin code to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(false); }}
            placeholder="Admin code"
            className="w-full bg-secondary text-foreground px-4 py-3 text-sm border border-border focus:outline-none focus:border-foreground transition-colors"
          />
          {error && <p className="text-limited-drop text-xs">Invalid code. Try again.</p>}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            Enter
          </button>
        </form>

        <p className="text-center text-[10px] text-muted-foreground tracking-wider uppercase">
          Demo code: threadvault2026
        </p>
      </div>
    </main>
  );
}
