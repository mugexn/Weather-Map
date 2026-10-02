import React from 'react';
import { LuMapPin, LuDroplets, LuWind, LuGauge, LuEye, LuSunrise, LuSunset, LuThermometer } from 'react-icons/lu';
import WeatherIcon from './WeatherIcon';

const fmt = (ts) => new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default function WeatherCard({ data }) {
  const c = data.list[0];
  const stats = [
    [LuThermometer, 'Feels like', `${Math.round(c.main.feels_like)}°`],
    [LuDroplets, 'Humidity', `${c.main.humidity}%`],
    [LuWind, 'Wind', `${c.wind.speed} m/s`],
    [LuGauge, 'Pressure', `${c.main.pressure} hPa`],
    [LuEye, 'Visibility', `${(c.visibility / 1000).toFixed(1)} km`],
    [LuSunrise, 'Sunrise', fmt(data.city.sunrise)],
    [LuSunset, 'Sunset', fmt(data.city.sunset)],
  ];
  return (
    <section className="glass p-6 sm:p-8 mb-6 fade-up">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-medium">
            <LuMapPin className="opacity-80" /> {data.city.name}, {data.city.country}
          </h2>
          <p className="capitalize opacity-80 mt-1">{c.weather[0].description}</p>
          <p className="text-7xl sm:text-8xl font-light tracking-tighter mt-4">{Math.round(c.main.temp)}°</p>
        </div>
        <WeatherIcon main={c.weather[0].main} night={c.sys?.pod === 'n'} className="text-8xl sm:text-9xl drop-shadow-lg" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
        {stats.map(([Icon, label, value]) => (
          <div key={label} className="glass-tile p-3">
            <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide opacity-70"><Icon /> {label}</p>
            <p className="text-lg font-medium mt-1">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
