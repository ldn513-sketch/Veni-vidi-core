import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap, LayersControl } from 'react-leaflet';
import { Crosshair } from 'lucide-react';
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

// Geolocation button component
function GeolocationButton() {
  const map = useMap();
  const [loading, setLoading] = useState(false);

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      alert('La géolocalisation n\'est pas supportée par votre navigateur');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 15);
        setLoading(false);
      },
      (error) => {
        console.error('Erreur de géolocalisation:', error);
        alert('Impossible d\'obtenir votre position');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <button
      onClick={handleGeolocate}
      disabled={loading}
      className="leaflet-control leaflet-bar absolute bottom-24 right-2 z-[1000] bg-background/90 backdrop-blur-md border border-primary/50 hover:bg-primary/20 transition-colors rounded-sm shadow-lg p-2 disabled:opacity-50"
      title="Recentrer sur ma position"
    >
      <Crosshair 
        className={`h-5 w-5 text-primary ${loading ? 'animate-spin' : ''}`} 
      />
    </button>
  );
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
        zoomControl={false}
        className="w-full h-full z-0 bg-[#0a0a10]"
      >
        <LayersControl position="topright">
          {/* BASE LAYERS */}
          <LayersControl.BaseLayer checked name="🗺️ OpenStreetMap Standard">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="map-tiles-filter"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="🌙 OpenStreetMap Dark">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="🛰️ Satellite">
            <TileLayer
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={19}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="⛰️ Terrain">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              maxZoom={17}
              className="map-tiles-filter"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="🏥 Humanitarian">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              className="map-tiles-filter"
            />
          </LayersControl.BaseLayer>

          {/* OVERLAYS */}
          <LayersControl.Overlay name="⚓ OpenSeaMap">
            <TileLayer
              attribution='&copy; <a href="http://www.openseamap.org">OpenSeaMap</a>'
              url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
              maxZoom={18}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="🚂 OpenRailwayMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openrailwaymap.org/">OpenRailwayMap</a>'
              url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
              maxZoom={19}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="🏃 Strava Heatmap">
            <TileLayer
              attribution='&copy; <a href="https://www.strava.com/">Strava</a>'
              url="https://heatmap-external-{s}.strava.com/tiles-auth/all/hot/{z}/{x}/{y}.png?px=256"
              maxZoom={15}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="🌧️ Précipitations">
            <TileLayer
              attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
              url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY"
              opacity={0.6}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="☁️ Nuages">
            <TileLayer
              attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
              url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY"
              opacity={0.5}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="🌡️ Température">
            <TileLayer
              attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
              url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY"
              opacity={0.6}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="📚 Wikipedia">
            <TileLayer
              attribution='&copy; <a href="https://www.wikimedia.org/">Wikimedia</a>'
              url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
              maxZoom={18}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="🚴 CyclOSM">
            <TileLayer
              attribution='&copy; <a href="https://www.cyclosm.org/">CyclOSM</a>'
              url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
              maxZoom={20}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="🏷️ Labels Only">
            <TileLayer
              attribution='&copy; <a href="http://stamen.com">Stamen Design</a>'
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.png"
              maxZoom={20}
            />
          </LayersControl.Overlay>
        </LayersControl>

        <ZoomControl position="bottomright" />
        <MapUpdater center={config.center} zoom={config.zoom} />
        <GeolocationButton />
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
        
        /* Style for layers control */
        .leaflet-control-layers {
          background: rgba(0, 0, 0, 0.85) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 255, 0, 0.3) !important;
          border-radius: 2px;
          color: #0f0 !important;
        }
        
        .leaflet-control-layers-toggle {
          background-color: rgba(0, 0, 0, 0.85) !important;
          border: 1px solid rgba(0, 255, 0, 0.3) !important;
        }
        
        .leaflet-control-layers-expanded {
          color: #0f0 !important;
          font-family: monospace;
        }
        
        .leaflet-control-layers label {
          color: #0f0 !important;
        }
        
        .leaflet-control-layers-separator {
          border-top: 1px solid rgba(0, 255, 0, 0.3) !important;
        }
        
        /* Zoom control styling */
        .leaflet-control-zoom {
          border: 1px solid rgba(0, 255, 0, 0.3) !important;
          background: rgba(0, 0, 0, 0.85) !important;
          backdrop-filter: blur(10px);
        }
        
        .leaflet-control-zoom a {
          background: rgba(0, 0, 0, 0.85) !important;
          color: #0f0 !important;
          border-bottom: 1px solid rgba(0, 255, 0, 0.3) !important;
        }
        
        .leaflet-control-zoom a:hover {
          background: rgba(0, 255, 0, 0.2) !important;
        }
      `}</style>
    </div>
  );
}
