import React from 'react';
import {
  PiSunDuotone, PiMoonStarsDuotone, PiCloudDuotone, PiCloudRainDuotone,
  PiCloudSnowDuotone, PiCloudFogDuotone, PiCloudLightningDuotone,
} from 'react-icons/pi';

const base = import.meta.env.BASE_URL;

// Media + icon per OpenWeather "main" condition
export const mediaFor = (main = '') => {
  const m = main.toLowerCase();
  if (m === 'clear') return `${base}videos/clear.gif`;
  if (['rain', 'drizzle', 'thunderstorm'].includes(m)) return `${base}videos/rain.gif`;
  if (m === 'snow') return `${base}videos/snow.gif`;
  if (m === 'fog') return `${base}videos/fog.gif`;
  if (['mist', 'haze', 'smoke', 'dust', 'sand', 'ash', 'squall', 'tornado'].includes(m)) return `${base}videos/mist.gif`;
  return `${base}videos/cloud.gif`;
};

export default function WeatherIcon({ main = '', night = false, className = '' }) {
  const m = main.toLowerCase();
  const props = { className };
  if (m === 'clear') return night ? <PiMoonStarsDuotone {...props} /> : <PiSunDuotone {...props} />;
  if (m === 'rain' || m === 'drizzle') return <PiCloudRainDuotone {...props} />;
  if (m === 'thunderstorm') return <PiCloudLightningDuotone {...props} />;
  if (m === 'snow') return <PiCloudSnowDuotone {...props} />;
  if (['mist', 'fog', 'haze', 'smoke', 'dust'].includes(m)) return <PiCloudFogDuotone {...props} />;
  return <PiCloudDuotone {...props} />;
}
