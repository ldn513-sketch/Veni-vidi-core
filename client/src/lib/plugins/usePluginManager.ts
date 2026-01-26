import { useState, useCallback } from 'react';
import { PluginManifest, PluginMessage, PLUGIN_API } from './types';
import { toast } from 'sonner';

interface PluginState {
  manifest: PluginManifest;
  active: boolean;
  loaded: boolean;
}

export function usePluginManager() {
  const [plugins, setPlugins] = useState<Record<string, PluginState>>({});

  const registerPlugin = useCallback((manifest: PluginManifest) => {
    setPlugins(prev => ({
      ...prev,
      [manifest.id]: { manifest, active: false, loaded: true }
    }));
  }, []);

  const togglePlugin = useCallback((id: string) => {
    setPlugins(prev => {
      const plugin = prev[id];
      if (!plugin) return prev;
      return {
        ...prev,
        [id]: { ...plugin, active: !plugin.active }
      };
    });
  }, []);

  const handlePluginMessage = useCallback((msg: PluginMessage) => {
    switch (msg.type) {
      case PLUGIN_API.UI_SHOW_TOAST:
        toast(msg.payload.message, {
          description: `From: ${msg.source}`,
        });
        break;
        
      case PLUGIN_API.MAP_ADD_MARKER:
        // This will be handled by the Map component via an event bus or context
        // For now, we just log it
        console.log('Map marker request:', msg.payload);
        break;

      default:
        console.warn('Unknown message type:', msg.type);
    }
  }, []);

  return {
    plugins,
    registerPlugin,
    togglePlugin,
    handlePluginMessage
  };
}
