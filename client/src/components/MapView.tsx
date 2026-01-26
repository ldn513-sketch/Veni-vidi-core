import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapConfig {
  center: [number, number];
  zoom: number;
  minZoom: number;
  maxZoom: number;
  tileLayer: string;
  attribution: string;
}

interface MapViewProps {
  config: MapConfig;
  className?: string;
}

// Component to handle map updates when config changes
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function MapView({ config, className }: MapViewProps) {
  // Fix for Leaflet default icon issues in React
  useEffect(() => {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    // @ts-ignore
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <MapContainer
        center={config.center}
        zoom={config.zoom}
        minZoom={config.minZoom}
        maxZoom={config.maxZoom}
        zoomControl={false} // We'll add custom control or position it differently
        className="w-full h-full z-0 bg-[#0a0a10]" // Dark background before tiles load
      >
        <TileLayer
          attribution={config.attribution}
          url={config.tileLayer}
          className="map-tiles-filter" // Will use CSS to invert/darken tiles
        />
        <ZoomControl position="bottomright" />
        <MapUpdater center={config.center} zoom={config.zoom} />
      </MapContainer>
      
      {/* CSS filter for dark mode map */}
      <style>{`
        .map-tiles-filter {
          filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
        }
        /* Fix for attribution text visibility on dark map */
        .leaflet-control-attribution {
          background: rgba(0, 0, 0, 0.7) !important;
          color: #aaa !important;
        }
        .leaflet-control-attribution a {
          color: #0f0 !important;
        }
      `}</style>
    </div>
  );
}
