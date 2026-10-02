import React from 'react';
import { LuSun, LuMoon, LuCloudSun } from 'react-icons/lu';

export default function ToggleTheme({ dark, setDark }) {
  return (
    <header className="fixed top-3 left-3 right-3 z-50 sm:left-6 sm:right-6">
      <div className="glass !rounded-full flex items-center justify-between px-5 py-2.5 max-w-5xl mx-auto">
        <span className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <LuCloudSun className="text-2xl" /> Weather
        </span>
        <button
          onClick={() => setDark(!dark)}
          aria-label="Toggle theme"
          className="h-9 w-9 grid place-items-center rounded-full bg-white/15 hover:bg-white/30 transition"
        >
          {dark ? <LuSun className="text-lg" /> : <LuMoon className="text-lg" />}
        </button>
      </div>
    </header>
  );
}
