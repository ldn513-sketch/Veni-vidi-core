import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronLeft, Layers, Package, Settings, X } from "lucide-react";
import { useEffect, useState } from "react";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  action: string;
}

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  title?: string;
  onMenuItemClick?: (itemId: string, action: string) => void;
}

const iconMap: Record<string, any> = {
  Package,
  Layers,
  Settings,
};

export default function Drawer({ 
  isOpen, 
  onClose, 
  menuItems, 
  title = "SYSTEM MENU",
  onMenuItemClick 
}: DrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleItemClick = (item: MenuItem) => {
    console.log(`Action: ${item.action}`);
    
    // Call parent callback if provided
    if (onMenuItemClick) {
      onMenuItemClick(item.id, item.action);
    }
    
    // Close drawer after action
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div 
        className={cn(
          "fixed top-0 left-0 h-full w-[85%] max-w-[320px] z-50 transition-transform duration-300 ease-out transform",
          "bg-sidebar border-r border-primary/30 shadow-[0_0_30px_rgba(0,0,0,0.8)]",
          "flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-primary/20 bg-sidebar-accent/10">
          <h2 className="text-primary font-bold tracking-widest text-lg flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"/>
            {title}
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-none"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 py-4">
          <div className="px-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = iconMap[item.icon] || Package;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start gap-3 h-12 text-base font-mono tracking-tight hover:bg-primary/10 hover:text-primary rounded-none border-l-2 border-transparent hover:border-primary transition-all"
                  onClick={() => handleItemClick(item)}
                >
                  <Icon className="h-5 w-5 opacity-70" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </ScrollArea>

        {/* Footer / Status */}
        <div className="p-4 border-t border-primary/20 bg-black/20 text-xs font-mono text-muted-foreground">
          <div className="flex justify-between items-center">
            <span>STATUS: ONLINE</span>
            <span className="text-primary">V 2.0.0</span>
          </div>
          <div className="mt-2 h-1 w-full bg-muted/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary/50 w-[60%] animate-pulse" />
          </div>
        </div>
      </div>
    </>
  );
}
