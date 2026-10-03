# 🌤️ Weather App

A modern, responsive weather app built with **Vite + React + Tailwind CSS**. It shows current conditions, a short-range forecast and an interactive weather map, all in a glassmorphism interface with a background that changes to match the weather. ✨

## ✨ Features

### 🌡️ Weather data
- 🔍 **City search** – look up any city worldwide (press Enter or click Search).
- 🌡️ **Current conditions** – temperature, feels-like, humidity, pressure, wind speed, visibility, sunrise and sunset.
- ⏱️ **Short-range forecast** – the next 21 hours in 3-hour steps, each showing temperature, humidity and wind.
- 🌙 **Day/night icons** – clear nights show a moon instead of a sun.

### 🗺️ Interactive map
- 📍 **Leaflet map** that recenters on the searched city.
- 🎚️ **Switchable weather overlays** – Temperature, Clouds, Wind, Precipitation and Pressure (OpenWeatherMap tile layers).
- 🌑 **Dark-mode map** – the base map is darkened automatically in dark theme.

### 🎨 Design
- 🧊 **Glassmorphism cards** – frosted-glass panels with backdrop blur, soft borders and subtle highlights.
- 🎬 **Weather-reactive background** – animated media changes with the current condition (clear, clouds, rain, snow, mist, fog).
- 🖼️ **Modern icons** – Lucide for the interface, Phosphor duotone for weather conditions.
- 🌓 **Light/dark theme** – follows your system setting on first visit, then remembers your choice.
- 📱 **Responsive layout** – the forecast scrolls horizontally on mobile and becomes a grid on larger screens.
- ⏳ **Loading and error states** – a loading placeholder and a clear message for unknown cities or API errors.

## 🛠️ Tech stack

| Area | Tools |
| --- | --- |
| ⚛️ Framework | React 18, Vite 5 |
| 🎨 Styling | Tailwind CSS 3 (with custom glass utilities) |
| 🔣 Icons | react-icons (Lucide `lu`, Phosphor `pi`) |
| 🗺️ Map | Leaflet, OpenStreetMap tiles |
| ☁️ Data | OpenWeatherMap 5-day / 3-hour forecast API and weather map tiles |

## 🚀 Getting started

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Add your API key 🔑
Get a free key from [OpenWeatherMap](https://home.openweathermap.org/api_keys), then create a `.env` file in the project root (next to `package.json`):

```
VITE_WEATHER_API_KEY=your_openweathermap_key
```

Rules for the `.env` file:
- ✅ The variable name must start with `VITE_`.
- ✅ No quotes and no spaces around `=`.
- 🔄 Restart the dev server after changing it.
- ⏰ New keys can take up to a couple of hours to activate.

### 3️⃣ Run the app ▶️
```bash
npm run dev       # development server
npm run build     # production build
npm run preview   # preview the production build
```



## 🌐 Deployment

`vite.config.mjs` sets `base: "/WeatherApp/"`, which suits GitHub Pages at `https://<username>.github.io/WeatherApp/`. Change or remove `base` if you deploy elsewhere.

⚠️ Vite embeds environment variables at **build time**, so the API key must be available when the site is built (for example, as a repository secret passed to your build step). A local `.env` file is not used by remote build servers.

## 🔒 Security notes

- 🚫 Never commit your `.env` file. Make sure `.env` is listed in `.gitignore`.
- 👀 Any `VITE_` variable ends up in the browser bundle, so the key is visible to anyone who inspects the site. For a public deployment, restrict usage in your OpenWeatherMap account or proxy requests through a small backend.
- 🔁 If a key was ever committed to git history, rotate it.

## 🙏 Credits

- ☁️ Weather data and map tiles: [OpenWeatherMap](https://openweathermap.org/)
- 🗺️ Base map: © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
- 🔣 Icons: [Lucide](https://lucide.dev/) and [Phosphor](https://phosphoricons.com/) via [react-icons](https://react-icons.github.io/react-icons/)

## P.S.

- Practice lang po HAHAHA