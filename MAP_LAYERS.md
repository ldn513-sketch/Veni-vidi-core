# 🗺️ Map Layers Documentation

## Layers de base (Base Layers)

### 🗺️ OpenStreetMap Standard
- **URL**: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
- **Description**: Carte standard OpenStreetMap avec filtre dark mode
- **Zoom max**: 19
- **Par défaut**: ✅

### 🌙 OpenStreetMap Dark
- **URL**: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`
- **Description**: Style sombre natif CartoDB
- **Zoom max**: 20

### 🛰️ Satellite
- **URL**: `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`
- **Description**: Imagerie satellite Esri World Imagery
- **Zoom max**: 19

### ⛰️ Terrain
- **URL**: `https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png`
- **Description**: Carte topographique avec relief
- **Zoom max**: 17

### 🏥 Humanitarian
- **URL**: `https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`
- **Description**: Style HOT (Humanitarian OpenStreetMap Team)
- **Zoom max**: 20

---

## Overlays (Couches superposables)

### ⚓ OpenSeaMap
- **URL**: `https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png`
- **Description**: Données maritimes (ports, bouées, routes maritimes)
- **Zoom max**: 18

### 🚂 OpenRailwayMap
- **URL**: `https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png`
- **Description**: Réseau ferroviaire mondial
- **Zoom max**: 19

### 🏃 Strava Heatmap
- **URL**: `https://heatmap-external-{s}.strava.com/tiles-auth/all/hot/{z}/{x}/{y}.png`
- **Description**: Heatmap des activités sportives (vélo, course)
- **Zoom max**: 15
- **Note**: Peut nécessiter une authentification Strava pour un usage intensif

### 🌧️ Précipitations
- **URL**: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png`
- **Description**: Précipitations en temps réel
- **Opacité**: 60%
- **Note**: Nécessite une clé API OpenWeatherMap (remplacer `YOUR_API_KEY`)

### ☁️ Nuages
- **URL**: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png`
- **Description**: Couverture nuageuse en temps réel
- **Opacité**: 50%
- **Note**: Nécessite une clé API OpenWeatherMap

### 🌡️ Température
- **URL**: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png`
- **Description**: Température en temps réel
- **Opacité**: 60%
- **Note**: Nécessite une clé API OpenWeatherMap

### 📚 Wikipedia
- **URL**: `https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png`
- **Description**: Points d'intérêt Wikipedia
- **Zoom max**: 18

### 🚴 CyclOSM
- **URL**: `https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png`
- **Description**: Infrastructure cycliste détaillée
- **Zoom max**: 20

### 🏷️ Labels Only
- **URL**: `https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.png`
- **Description**: Uniquement les labels/noms de lieux (transparent)
- **Zoom max**: 20

---

## 📍 Fonctionnalités additionnelles

### Bouton de géolocalisation
- **Position**: Bas-droite de la carte
- **Icône**: Crosshair (cible)
- **Fonction**: Recentre la carte sur la position GPS de l'utilisateur
- **Zoom**: 15 lors du recentrage
- **Précision**: High accuracy activée

---

## 🔧 Configuration OpenWeatherMap

Pour activer les layers météo, obtiens une clé API gratuite sur [OpenWeatherMap](https://openweathermap.org/api) et remplace `YOUR_API_KEY` dans le code.

**Étapes** :
1. Créer un compte sur https://openweathermap.org
2. Générer une clé API
3. Remplacer `YOUR_API_KEY` dans `MapView.tsx` lignes 164, 171, 178

---

## 🎨 Style dark mode

Le composant applique automatiquement un filtre CSS pour inverser les couleurs des layers compatibles :
```css
filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
```

Les layers avec la classe `map-tiles-filter` sont affectés par ce filtre.
