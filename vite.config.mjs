import { defineConfig } from 'vite';
// import "@/components/styles/ToggleTheme.css";

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/WeatherApp/"
});

