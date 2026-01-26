import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded password for demo purposes as agreed
    if (password === "admin123") {
      sessionStorage.setItem("admin_session", "true");
      toast.success("ACCESS GRANTED");
      setLocation("/admin/dashboard");
    } else {
      toast.error("ACCESS DENIED", {
        description: "Invalid security credentials"
      });
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter text-primary animate-pulse">
            SYSTEM ADMIN
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            RESTRICTED ACCESS AREA
          </p>
        </div>

        <div className="bg-card border border-primary/30 p-8 shadow-[0_0_30px_rgba(0,255,0,0.05)] relative overflow-hidden">
          {/* Decorative corner markers */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-primary/70 uppercase">Security Code</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/50 border-primary/30 text-center font-mono tracking-widest text-lg focus:border-primary focus:ring-primary/50"
                placeholder="••••••••"
                autoFocus
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 font-mono tracking-wider h-12"
            >
              AUTHENTICATE
            </Button>
          </form>
        </div>
        
        <div className="text-center text-xs font-mono text-muted-foreground/50">
          IP LOGGED :: SECURE CONNECTION
        </div>
      </div>
    </div>
  );
}
