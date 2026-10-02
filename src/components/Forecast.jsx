import React from 'react';
import { LuDroplets, LuWind } from 'react-icons/lu';
import WeatherIcon from './WeatherIcon';

export default function Forecast({ data }) {
  return (
    <section className="mb-6 fade-up">
      <h3 className="text-sm uppercase tracking-wide opacity-70 mb-3 px-1">Next 21 hours</h3>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 sm:grid sm:grid-cols-4 lg:grid-cols-7 sm:overflow-visible">
        {data.list.slice(1, 8).map((item) => {
          const d = new Date(item.dt * 1000);
          return (
            <div key={item.dt} className="glass !rounded-2xl p-4 min-w-[8.5rem] text-center hover:-translate-y-1 transition duration-300">
              <p className="text-sm font-medium">{d.toLocaleDateString([], { weekday: 'short', day: 'numeric' })}</p>
              <p className="text-xs opacity-70">{d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
              <WeatherIcon main={item.weather[0].main} night={item.sys?.pod === 'n'} className="text-5xl mx-auto my-3" />
              <p className="text-2xl font-light">{Math.round(item.main.temp)}°</p>
              <p className="flex items-center justify-center gap-1 text-xs opacity-80 mt-2"><LuDroplets /> {item.main.humidity}%</p>
              <p className="flex items-center justify-center gap-1 text-xs opacity-80"><LuWind /> {item.wind.speed} m/s</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
