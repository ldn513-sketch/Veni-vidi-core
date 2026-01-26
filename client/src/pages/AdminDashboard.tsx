import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Save, LogOut, RefreshCw } from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [configJson, setConfigJson] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth
    if (!sessionStorage.getItem("admin_session")) {
      setLocation("/admin");
      return;
    }

    loadConfig();
  }, [setLocation]);

  const loadConfig = () => {
    setLoading(true);
    fetch('/config.json')
      .then(res => res.text())
      .then(text => {
        setConfigJson(text);
        setLoading(false);
      })
      .catch(err => {
        toast.error("Failed to load config");
        setLoading(false);
      });
  };

  const handleSave = () => {
    try {
      // Validate JSON
      JSON.parse(configJson);
      
      // In a real backend app, we would POST this.
      // Since this is static, we'll just simulate a save and update local storage or download
      // For this demo, we'll show a success message but warn about static limitations
      
      toast.success("CONFIGURATION VALIDATED", {
        description: "In a static deployment, you would now download this file and commit it to the repo."
      });
      
      // Trigger download
      const blob = new Blob([configJson], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "config.json";
      a.click();
      
    } catch (e) {
      toast.error("INVALID JSON SYNTAX", {
        description: (e as Error).message
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session");
    setLocation("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-primary/20 bg-sidebar/50 backdrop-blur flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-primary tracking-tight">ADMIN CONSOLE</h1>
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-mono">V 1.0.0</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={loadConfig} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Reload
          </Button>
          <Button variant="destructive" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-6 h-full">
          <div className="flex flex-col gap-2 h-full">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-mono text-muted-foreground">SYSTEM CONFIGURATION (JSON)</h2>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Validate & Download
              </Button>
            </div>
            
            <div className="flex-1 relative border border-primary/30 rounded-md overflow-hidden bg-black/50">
              <Textarea
                value={configJson}
                onChange={(e) => setConfigJson(e.target.value)}
                className="w-full h-full font-mono text-sm p-4 bg-transparent border-0 resize-none focus-visible:ring-0 text-green-400"
                spellCheck={false}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              * Changes here are local. Download the file and replace 'public/config.json' to persist changes in production.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
