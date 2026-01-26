export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  description?: string;
  icon?: string;
  permissions: PluginPermission[];
  entryPoint: string; // URL to index.html of the plugin
}

export type PluginPermission = 
  | 'map.read'      // Read map state (center, zoom)
  | 'map.write'     // Modify map (add markers, layers)
  | 'ui.toast'      // Show toast notifications
  | 'ui.modal'      // Open modals
  | 'storage.read'  // Read own storage
  | 'storage.write' // Write own storage
  | 'geo.location'; // Access user location

export interface PluginMessage<T = any> {
  source: string; // plugin-id
  type: string;   // e.g., 'MAP_ADD_MARKER'
  payload: T;
  requestId?: string;
}

export interface HostMessage<T = any> {
  target: string; // plugin-id or '*'
  type: string;
  payload: T;
  requestId?: string; // If response to a request
}

// Core API exposed to plugins via postMessage
export const PLUGIN_API = {
  // Map Operations
  MAP_GET_STATE: 'MAP_GET_STATE',
  MAP_SET_VIEW: 'MAP_SET_VIEW',
  MAP_ADD_MARKER: 'MAP_ADD_MARKER',
  MAP_REMOVE_MARKER: 'MAP_REMOVE_MARKER',
  
  // UI Operations
  UI_SHOW_TOAST: 'UI_SHOW_TOAST',
  
  // Lifecycle
  LIFECYCLE_READY: 'LIFECYCLE_READY',
  LIFECYCLE_INIT: 'LIFECYCLE_INIT',
} as const;
