'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, Popup, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapLayerControl } from './MapLayerControl';
import { MapLegend } from './MapLegend';
import { CycloneMarker } from './CycloneMarker';
import { DistrictPopup } from './DistrictPopup';
import { createRegionRainfallIcon, DistrictRainfallData } from './RegionRainfallOverlay';
import { oceanSSTZones, oceanWaveBuoys, createWaveBuoyIcon } from './OceanViewOverlay';
import { Waves, CloudRain, Eye, Maximize2, Minimize2, Navigation, Compass, AlertOctagon, Droplets } from 'lucide-react';

// Fix for default Leaflet icon in React
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Coastal district polygons with real geographic orientation
const districtPolygons: any[] = [
  { id: 'd1', name: 'Puri', state: 'Odisha', alertLevel: 'red', coords: [[19.5, 85.5], [20.0, 85.5], [20.0, 86.2], [19.5, 86.2]] },
  { id: 'd2', name: 'Ganjam', state: 'Odisha', alertLevel: 'red', coords: [[19.0, 84.5], [19.5, 84.5], [19.5, 85.5], [19.0, 85.5]] },
  { id: 'd3', name: 'Balasore', state: 'Odisha', alertLevel: 'orange', coords: [[21.0, 86.5], [21.6, 86.5], [21.6, 87.5], [21.0, 87.5]] },
  { id: 'd4', name: 'Srikakulam', state: 'Andhra Pradesh', alertLevel: 'orange', coords: [[18.0, 83.5], [19.0, 83.5], [19.0, 84.5], [18.0, 84.5]] },
  { id: 'd5', name: 'Visakhapatnam', state: 'Andhra Pradesh', alertLevel: 'yellow', coords: [[17.4, 82.8], [18.0, 82.8], [18.0, 83.6], [17.4, 83.6]] },
  { id: 'd6', name: 'South 24 Parganas', state: 'West Bengal', alertLevel: 'orange', coords: [[21.5, 88.0], [22.4, 88.0], [22.4, 89.1], [21.5, 89.1]] },
];

// District rainfall impact data positioned directly over affected land regions
const affectedRegionRainfall: DistrictRainfallData[] = [
  { id: 'r-puri', name: 'Puri Coast', state: 'Odisha', center: [19.8, 85.85], intensityMmPerHour: 185, level: 'extreme' },
  { id: 'r-ganjam', name: 'Ganjam', state: 'Odisha', center: [19.25, 85.0], intensityMmPerHour: 135, level: 'extreme' },
  { id: 'r-balasore', name: 'Balasore', state: 'Odisha', center: [21.3, 87.0], intensityMmPerHour: 95, level: 'heavy' },
  { id: 'r-srikakulam', name: 'Srikakulam', state: 'Andhra Pradesh', center: [18.5, 84.0], intensityMmPerHour: 85, level: 'heavy' },
  { id: 'r-vizag', name: 'Visakhapatnam', state: 'Andhra Pradesh', center: [17.7, 83.2], intensityMmPerHour: 45, level: 'moderate' },
  { id: 'r-s24p', name: 'Sundarbans/24 Parganas', state: 'West Bengal', center: [22.0, 88.55], intensityMmPerHour: 110, level: 'extreme' },
];

// Track of Cyclone DANA
const cycloneTrack = [
  [14.2, 88.5], [16.0, 87.8], [18.1, 86.9], [19.8, 86.2], [20.5, 85.6]
];

const predictedTrack = [
  [20.5, 85.6], [21.8, 85.0], [23.1, 84.4]
];

const facilityMarkers = [
  { id: 'f1', type: 'hospital', name: 'Coastal District Hospital, Puri', pos: [19.82, 85.82] },
  { id: 'f2', type: 'shelter', name: 'Multi-Purpose Cyclone Shelter, Astaranga', pos: [19.98, 86.15] },
  { id: 'f3', type: 'shelter', name: 'Gopalpur Coastal Shelter', pos: [19.26, 84.91] }
];

const roadBlockages = [
  { id: 'r1', name: 'NH-16 Inundated near Puri Bypass', pos: [19.78, 85.75] },
  { id: 'r2', name: 'SH-60 Flooded near Balasore', pos: [21.45, 86.9] }
];

// Controller for map view
function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

interface CycloneMapInnerProps {
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export default function CycloneMapInner({ isFullscreen = false, onToggleFullscreen }: CycloneMapInnerProps) {
  const [mapStyle, setMapStyle] = useState<'ocean' | 'geographic' | 'satellite'>('ocean');
  const [center, setCenter] = useState<[number, number]>([19.2, 85.8]);
  const [zoom, setZoom] = useState(6);

  const [layers, setLayers] = useState({
    cyclone: true,
    alertZones: true,
    rainfall: true, // Enabled by default to show rainfall effects immediately!
    oceanView: true, // Ocean view enabled
    predictedTrack: true,
    historicalTrack: true,
    sstThermal: true,
    waveBuoys: true,
    roadBlockages: true,
    emergencyFacilities: true,
    coastalDistricts: true
  });

  const getTileUrl = () => {
    switch (mapStyle) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'geographic':
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      case 'ocean':
      default:
        // True Esri World Ocean Basemap showing continental shelves, deep oceanic bathymetry & marine topography
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}';
    }
  };

  const getAlertColor = (level: string) => {
    switch(level) {
      case 'red': return '#EF4444';
      case 'orange': return '#F97316';
      case 'yellow': return '#EAB308';
      case 'green': return '#22C55E';
      default: return '#0EA5E9';
    }
  };

  const facilityIcon = L.divIcon({
    className: 'bg-transparent',
    html: `<div class="w-6 h-6 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center text-xs font-bold text-blue-700 shadow-md shadow-blue-500/50">H</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  const shelterIcon = L.divIcon({
    className: 'bg-transparent',
    html: `<div class="w-6 h-6 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center text-xs font-bold text-emerald-700 shadow-md shadow-emerald-500/50">S</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  const blockIcon = L.divIcon({
    className: 'bg-transparent',
    html: `<div class="w-6 h-6 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-md shadow-red-500/50 animate-pulse">!</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  const handleRecenter = () => {
    setCenter([20.5, 85.6]);
    setZoom(7);
  };

  return (
    <div className="w-full h-full relative font-sans select-none">
      
      {/* Prominent Quick Mode Selector Toolbar (Top Left) */}
      <div className="absolute top-4 left-4 z-[400] flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-slate-200">
        <button
          onClick={() => {
            setMapStyle('ocean');
            setLayers(prev => ({ ...prev, oceanView: true, sstThermal: true, waveBuoys: true }));
          }}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            mapStyle === 'ocean'
              ? 'bg-emerald-600 text-white shadow-md ring-1 ring-emerald-400'
              : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
          }`}
        >
          <Waves size={16} />
          <span>Ocean View</span>
          {mapStyle === 'ocean' && <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse"></span>}
        </button>

        <button
          onClick={() => {
            setLayers(prev => ({ ...prev, rainfall: !prev.rainfall }));
          }}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            layers.rainfall
              ? 'bg-blue-600 text-white shadow-md ring-1 ring-blue-400'
              : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          <CloudRain size={16} />
          <span>Rainfall Radar</span>
          <span className={`w-2 h-2 rounded-full ${layers.rainfall ? 'bg-emerald-300 animate-ping' : 'bg-slate-300'}`}></span>
        </button>

        <button
          onClick={() => {
            setMapStyle(mapStyle === 'satellite' ? 'geographic' : 'satellite');
          }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
            mapStyle === 'satellite'
              ? 'bg-slate-800 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
          }`}
        >
          <Eye size={16} />
          <span>{mapStyle === 'satellite' ? 'Satellite Active' : 'Satellite View'}</span>
        </button>

        <div className="w-px h-6 bg-slate-200 mx-1"></div>

        {/* Recenter on Cyclone Eye */}
        <button
          onClick={handleRecenter}
          title="Recenter view on Cyclone DANA"
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors"
        >
          <Compass size={18} />
        </button>

        {/* Fullscreen Toggle Button */}
        {onToggleFullscreen && (
          <button
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen Cockpit' : 'Expand to Fullscreen Cockpit'}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        )}
      </div>

      {/* Floating Center Telemetry HUD (Live Meteorological Banner on Map) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] hidden md:flex items-center gap-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 px-4 py-2 rounded-xl shadow-lg text-white">
        <div className="flex items-center gap-1.5 text-xs font-black text-rose-400">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          <span>LANDFALL: ~3.5 HOURS</span>
        </div>
        <span className="text-slate-600 font-mono">|</span>
        <div className="text-xs font-extrabold text-amber-300">
          WIND: 215 KM/H (CAT 4)
        </div>
        <span className="text-slate-600 font-mono">|</span>
        <div className="text-xs font-extrabold text-blue-300 flex items-center gap-1">
          <Droplets size={13} />
          <span>PURI RAIN: 285 MM</span>
        </div>
        <span className="text-slate-600 font-mono">|</span>
        <div className="text-xs font-extrabold text-cyan-300">
          SURGE: 4.2M SEAS
        </div>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <MapController center={center} zoom={zoom} />
        
        {/* Base Tile Layer */}
        <TileLayer 
          key={mapStyle} 
          url={getTileUrl()} 
          attribution="&copy; Esri Ocean, NOAA, OpenStreetMap & CycloneAI" 
        />
        
        {/* In Ocean View, add Esri Ocean Reference overlay for ocean names and coastlines */}
        {mapStyle === 'ocean' && (
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}"
            opacity={0.85}
          />
        )}

        {/* Ocean Sea Surface Temperature (SST) Thermal Contours */}
        {layers.oceanView && layers.sstThermal && oceanSSTZones.map(zone => (
          <Polygon
            key={zone.id}
            positions={zone.coords}
            pathOptions={{
              color: '#f97316',
              fillColor: '#ea580c',
              fillOpacity: mapStyle === 'ocean' ? 0.22 : 0.15,
              weight: 1.5,
              dashArray: '6, 6'
            }}
          >
            <Popup>
              <div className="p-1 font-sans text-xs">
                <div className="font-bold text-orange-600">{zone.name}</div>
                <div className="text-slate-700 font-semibold">Sea Surface Temp: {zone.tempC}°C</div>
                <div className="text-emerald-600 text-[10px] mt-0.5">● Highly Favorable for Cyclonic Intensification (&gt;28°C threshold)</div>
              </div>
            </Popup>
          </Polygon>
        ))}

        {/* Ocean Wave Buoy Stations */}
        {layers.oceanView && layers.waveBuoys && oceanWaveBuoys.map(buoy => (
          <Marker
            key={buoy.id}
            position={buoy.pos}
            icon={createWaveBuoyIcon(buoy)}
          >
            <Popup>
              <div className="p-1 font-sans text-xs">
                <div className="font-bold text-slate-700">{buoy.name}</div>
                <div className="text-slate-700 font-semibold">Wave Height: {buoy.waveHeightM} meters</div>
                <div className="text-slate-500">Wave Period: {buoy.periodS} seconds</div>
                <div className="text-red-600 font-bold mt-0.5">{buoy.condition}</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* District Alert Polygons */}
        {layers.alertZones && districtPolygons.map(d => (
          <Polygon 
            key={d.id}
            positions={d.coords}
            pathOptions={{ 
              color: getAlertColor(d.alertLevel),
              fillColor: getAlertColor(d.alertLevel),
              fillOpacity: 0.35,
              weight: d.alertLevel === 'red' ? 3 : 2,
              className: d.alertLevel === 'red' ? 'animate-pulse' : ''
            }}
          >
            <Popup className="custom-popup">
              <DistrictPopup district={d} />
            </Popup>
          </Polygon>
        ))}

        {/* RAINFALL EFFECTS ON TOP OF THE AFFECTED REGIONS */}
        {layers.rainfall && affectedRegionRainfall.map(region => (
          <Marker
            key={region.id}
            position={region.center}
            icon={createRegionRainfallIcon(region)}
          >
            <Popup>
              <div className="p-2 font-sans text-xs">
                <div className="font-bold text-blue-700 text-sm flex items-center gap-1">
                  <span>🌧️</span>
                  <span>{region.name} - {region.state}</span>
                </div>
                <div className="mt-1 text-slate-700">
                  <span className="font-semibold">Current Precipitation: </span>
                  <span className="text-blue-600 font-bold">{region.intensityMmPerHour} mm/hr</span>
                </div>
                <div className="text-slate-700">
                  <span className="font-semibold">Classification: </span>
                  <span className="text-red-600 font-bold uppercase">{region.level} DOWNPOUR</span>
                </div>
                <div className="text-slate-500 text-[10px] mt-1 border-t pt-1">
                  Inundation &amp; flash-flood warning active. Drainage capacity exceeded.
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Historical and Predicted Cyclone Tracks */}
        {layers.historicalTrack && (
          <Polyline 
            positions={cycloneTrack as any} 
            pathOptions={{ color: '#0284c7', weight: 4, opacity: 0.85 }} 
          />
        )}
        {layers.predictedTrack && (
          <Polyline 
            positions={predictedTrack as any} 
            pathOptions={{ color: '#dc2626', weight: 4, dashArray: '8, 8', opacity: 0.9 }} 
          />
        )}

        {/* Upgraded High-Fidelity Animated Cyclone Marker */}
        {layers.cyclone && (
          <Marker 
            position={[20.5, 85.6]} 
            icon={CycloneMarker({
              name: 'DANA',
              category: 'Cat 4 (Extremely Severe)',
              windSpeed: 215,
              pressure: 948,
              movement: 'NW at 18 km/h'
            })}
          >
            <Popup>
              <div className="p-2 font-sans">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                  <h3 className="font-extrabold text-red-600 text-base m-0">Cyclone DANA</h3>
                </div>
                <div className="text-xs text-slate-500 font-semibold mb-2">Category 4 (Extremely Severe Cyclonic Storm)</div>
                <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <div><strong>Max Winds:</strong> 215 km/h</div>
                  <div><strong>Gusts:</strong> 245 km/h</div>
                  <div><strong>Pressure:</strong> 948 hPa</div>
                  <div><strong>Speed:</strong> 18 km/h NW</div>
                  <div><strong>Eye Diameter:</strong> 28 km</div>
                  <div><strong>Landfall:</strong> 3 - 4 Hours</div>
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Emergency Facilities Markers */}
        {layers.emergencyFacilities && facilityMarkers.map(f => (
          <Marker 
            key={f.id} 
            position={f.pos as any} 
            icon={f.type === 'hospital' ? facilityIcon : shelterIcon}
          >
            <Popup>
              <div className="font-semibold text-xs text-slate-800">{f.name}</div>
            </Popup>
          </Marker>
        ))}

        {/* Road Blockages */}
        {layers.roadBlockages && roadBlockages.map(r => (
          <Marker 
            key={r.id} 
            position={r.pos as any} 
            icon={blockIcon}
          >
            <Popup>
              <div className="font-semibold text-xs text-red-600">{r.name}</div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
      
      {/* UI Overlays: Layer Control & Legend */}
      <MapLayerControl 
        mapStyle={mapStyle} 
        setMapStyle={setMapStyle as any} 
        layers={layers} 
        setLayers={setLayers} 
      />
      <MapLegend />
    </div>
  );
}
