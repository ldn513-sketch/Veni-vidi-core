import { useEffect, useRef } from 'react';
import { PluginManifest, PluginMessage, HostMessage, PLUGIN_API } from '@/lib/plugins/types';
import { toast } from 'sonner';

interface PluginSandboxProps {
  manifest: PluginManifest;
  isActive: boolean;
  onMessage: (msg: PluginMessage) => void;
}

export default function PluginSandbox({ manifest, isActive, onMessage }: PluginSandboxProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!iframeRef.current || event.source !== iframeRef.current.contentWindow) return;
      
      // Basic security check: ensure data structure is valid
      const data = event.data as PluginMessage;
      if (!data || !data.type) return;

      // Inject source ID for security
      const secureMessage = { ...data, source: manifest.id };
      
      console.log(`[Host] Received from ${manifest.id}:`, secureMessage);
      onMessage(secureMessage);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [manifest.id, onMessage]);

  // Send init message when iframe loads
  const handleLoad = () => {
    if (!iframeRef.current?.contentWindow) return;
    
    const initMsg: HostMessage = {
      target: manifest.id,
      type: PLUGIN_API.LIFECYCLE_INIT,
      payload: { config: { theme: 'dark' } }
    };
    
    iframeRef.current.contentWindow.postMessage(initMsg, '*');
  };

  return (
    <iframe
      ref={iframeRef}
      src={manifest.entryPoint}
      title={`Plugin: ${manifest.name}`}
      sandbox="allow-scripts allow-same-origin allow-forms"
      className={`border-0 w-full h-full absolute inset-0 transition-opacity duration-300 ${
        isActive ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
      }`}
      onLoad={handleLoad}
    />
  );
}
