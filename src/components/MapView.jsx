// import React, { useEffect, useRef, useState } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { LuLayers } from 'react-icons/lu';

// const layers = { Clouds: 'clouds_new', Temperature: 'temp_new', Wind: 'wind_new', Precipitation: 'precipitation_new', Pressure: 'pressure_new' };
// const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

// export default function MapView({ coord, dark }) {
//   const mapRef = useRef(null);
//   const baseRef = useRef(null);
//   const overlayRef = useRef(null);
//   const [selected, setSelected] = useState('Clouds');

//   useEffect(() => {
//     mapRef.current = L.map('map', { zoomControl: false }).setView([coord.lat, coord.lon], 7);
//     L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);
//     return () => mapRef.current.remove();
//   }, []);

//   useEffect(() => { mapRef.current.setView([coord.lat, coord.lon], 7); }, [coord.lat, coord.lon]);

//   useEffect(() => {
//     baseRef.current?.remove();
//     baseRef.current = L.tileLayer(
//       `https://{s}.basemaps.cartocdn.com/${dark ? 'dark_all' : 'light_all'}/{z}/{x}/{y}{r}.png`,
//       { attribution: '© OpenStreetMap, © CARTO' }
//     ).addTo(mapRef.current);
//     baseRef.current.bringToBack();
//   }, [dark]);

//   useEffect(() => {
//     overlayRef.current?.remove();
//     overlayRef.current = L.tileLayer(
//       `https://tile.openweathermap.org/map/${layers[selected]}/{z}/{x}/{y}.png?appid=${apiKey}`,
//       { attribution: '© OpenWeatherMap', opacity: 0.7 }
//     ).addTo(mapRef.current);
//   }, [selected]);

//   return (
//     <section className="glass p-4 mb-6 fade-up">
//       <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar">
//         <LuLayers className="text-xl opacity-70 shrink-0" />
//         {Object.keys(layers).map((name) => (
//           <button key={name} onClick={() => setSelected(name)} className={`chip shrink-0 ${selected === name ? 'chip-active' : ''}`}>
//             {name}
//           </button>
//         ))}
//       </div>
//       <div id="map" className="h-80 w-full" />
//     </section>
//   );
// }

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LuLayers, LuTriangleAlert } from 'react-icons/lu';

const layers = { Temperature: 'temp_new', Clouds: 'clouds_new', Wind: 'wind_new', Precipitation: 'precipitation_new', Pressure: 'pressure_new' };
const apiKey = (import.meta.env.VITE_WEATHER_API_KEY || '').trim();

export default function MapView({ coord, dark }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [selected, setSelected] = useState('Temperature');
  const [overlayError, setOverlayError] = useState(false);

  // Create the map once
  useEffect(() => {
    const map = L.map(containerRef.current, { zoomControl: false }).setView([coord.lat, coord.lon], 6);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    map.createPane('weather');
    map.getPane('weather').style.zIndex = 250; // above base tiles (200)
    map.getPane('weather').style.pointerEvents = 'none';
    mapRef.current = map;
    const t = setTimeout(() => map.invalidateSize(), 300); // card animates in
    return () => { clearTimeout(t); map.remove(); mapRef.current = null; };
  }, []);

  // Recenter when the city changes
  useEffect(() => {
    mapRef.current?.setView([coord.lat, coord.lon], 6);
  }, [coord.lat, coord.lon]);

  // Base map (light/dark)
  // Base map (OpenStreetMap needs no key; dark mode is handled in CSS)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const base = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);
    return () => base.remove();
  }, []);

  // Weather overlay
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    setOverlayError(!apiKey);
    if (!apiKey) return;
    const layer = L.tileLayer(
      `https://tile.openweathermap.org/map/${layers[selected]}/{z}/{x}/{y}.png?appid=${apiKey}`,
      { pane: 'weather', opacity: 0.85, attribution: '© OpenWeatherMap' }
    );
    layer.on('tileerror', () => setOverlayError(true));
    layer.on('tileload', () => setOverlayError(false));
    layer.addTo(map);
    return () => layer.remove();
  }, [selected]);

  return (
    <section className="glass p-4 mb-6 fade-up">
      <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar">
        <LuLayers className="text-xl opacity-70 shrink-0" />
        {Object.keys(layers).map((name) => (
          <button key={name} onClick={() => setSelected(name)} className={`chip shrink-0 ${selected === name ? 'chip-active' : ''}`}>
            {name}
          </button>
        ))}
      </div>
      {overlayError && (
        <p className="flex items-center gap-2 text-sm text-amber-200 mb-2">
          <LuTriangleAlert /> Overlay tiles failed to load. Check the API key and the Network tab.
        </p>
      )}
      <div ref={containerRef} className="h-80 w-full" />
    </section>
  );
}
