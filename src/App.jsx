import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import MapView from './components/MapView';
import ToggleTheme from './components/ToggleTheme';
import { mediaFor } from './components/WeatherIcon';
import { LuTriangleAlert } from 'react-icons/lu';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('Manila');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
        );
        const data = await res.json();
        if (!res.ok || !data.list) throw new Error(data.message || 'City not found');
        setWeatherData(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [location]);

  const main = weatherData?.list[0].weather[0].main;

  return (
    <div className="relative min-h-screen text-white">
      {/* Weather-reactive media background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${mediaFor(main)})` }}
      />
      <div
        className={`fixed inset-0 -z-10 transition-colors duration-700 ${
          dark ? 'bg-gradient-to-b from-slate-950/85 via-slate-900/70 to-slate-950/90'
               : 'bg-gradient-to-b from-sky-900/40 via-indigo-900/40 to-slate-900/60'
        }`}
      />
      <ToggleTheme dark={dark} setDark={setDark} />

      <main className="max-w-5xl mx-auto px-4 pt-24 pb-10">
        <SearchBar setLocation={setLocation} />

        {error && (
          <div className="glass p-4 mb-6 flex items-center gap-3 text-red-200">
            <LuTriangleAlert className="text-xl shrink-0" /> <span className="capitalize">{error}</span>
          </div>
        )}
        {loading && !weatherData && <div className="glass h-64 animate-pulse mb-6" />}

        {weatherData && (
          <div className={loading ? 'opacity-60 transition' : 'transition'}>
            <WeatherCard data={weatherData} />
            <Forecast data={weatherData} />
            <MapView coord={weatherData.city.coord} dark={dark} />
          </div>
        )}
      </main>
    </div>
  );
}
