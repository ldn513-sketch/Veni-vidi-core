import Drawer from "@/components/Drawer";
import MapView from "@/components/MapView";
import PluginSandbox from "@/components/PluginSandbox";
import { Button } from "@/components/ui/button";
import { PluginManifest } from "@/lib/plugins/types";
import { usePluginManager } from "@/lib/plugins/usePluginManager";
import { Menu, Package } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface AppConfig {
  app: {
    name: string;
    version: string;
    theme: string;
  };
  map: {
    center: [number, number];
    zoom: number;
    minZoom: number;
    maxZoom: number;
    tileLayer: string;
    attribution: string;
  };
  menu: {
    items: Array<{
      id: string;
      label: string;
      icon: string;
      action: string;
    }>;
  };
  plugins: {
    registry: PluginManifest[];
  };
}

export default function Home() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<any>(null);
  
  const { plugins, registerPlugin, togglePlugin, handlePluginMessage } = usePluginManager();

  useEffect(() => {
    // Load configuration
    fetch('/config.json')
      .then(res => res.json())
      .then((data: AppConfig) => {
        setConfig(data);
        // Register plugins from config
        data.plugins.registry.forEach(p => registerPlugin(p));
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load config:", err);
        setLoading(false);
      });
  }, [registerPlugin]);

  const handleMenuItemClick = (itemId: string, action: string) => {
    console.log(`Menu item clicked: ${itemId}, action: ${action}`);
    
    if (itemId === 'layers') {
      // Trigger layers control to open
      setTimeout(() => {
        const layersControl = document.querySelector('.leaflet-control-layers-toggle') as HTMLElement;
        if (layersControl) {
          layersControl.click();
        }
      }, 400); // Wait for drawer to close
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background text-primary font-mono">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <div className="animate-pulse">INITIALIZING SYSTEM...</div>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background text-destructive font-mono">
        SYSTEM ERROR: CONFIGURATION LOAD FAILED
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Map Layer (Background) */}
      <div className="absolute inset-0 z-0">
        <MapView 
          config={config.map}
          onMapReady={(map) => {
            mapRef.current = map;
          }}
        />
      </div>

      {/* Plugin Layer (Overlays) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {Object.values(plugins).map(plugin => (
          plugin.active && (
            <div key={plugin.manifest.id} className="absolute top-20 right-4 w-80 h-96 pointer-events-auto shadow-2xl">
               {/* Simple Window Frame for Demo */}
               <div className="bg-sidebar border border-primary/50 p-1 flex justify-between items-center text-xs font-mono text-primary">
                  <span>{plugin.manifest.name}</span>
                  <button onClick={() => togglePlugin(plugin.manifest.id)} className="hover:text-destructive">X</button>
               </div>
               <div className="relative w-full h-[calc(100%-24px)] bg-black">
                  <PluginSandbox 
                    manifest={plugin.manifest} 
                    isActive={plugin.active} 
                    onMessage={handlePluginMessage} 
                  />
               </div>
            </div>
          )
        ))}
      </div>

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-auto">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-background/80 backdrop-blur-md border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-sm h-12 w-12"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <div className="hidden md:block px-4 py-2 bg-background/80 backdrop-blur-md border border-primary/30 rounded-sm text-primary font-mono text-sm shadow-lg">
            {config.app.name} <span className="opacity-50">::</span> ONLINE
          </div>
        </div>
        
        {/* Plugin Quick Access (Demo) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto flex gap-2">
           {config.plugins.registry.map(p => (
             <Button 
               key={p.id}
               variant={plugins[p.id]?.active ? "default" : "outline"}
               size="sm"
               className="font-mono text-xs border-primary/50"
               onClick={() => togglePlugin(p.id)}
             >
               <Package className="w-3 h-3 mr-2" />
               {p.name}
             </Button>
           ))}
        </div>
      </div>

      {/* Drawer */}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        menuItems={config.menu.items}
        title={config.app.name.toUpperCase()}
        onMenuItemClick={handleMenuItemClick}
      />
    </div>
  );
}
