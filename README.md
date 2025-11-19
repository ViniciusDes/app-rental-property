# 🏠 Rental Properties - Next.js Frontend

Interactive property search application with map-based geolocation, comprehensive filtering, and dynamic pricing. This is a standalone frontend application that consumes a REST API.

## 🎯 Features

<<<<<<< HEAD

- 🗺️ **Interactive Leaflet Map** - View properties on OpenStreetMap with markers and popups
- 🔍 **Advanced Filtering** - Filter by type, price, bedrooms, bathrooms, amenities, location
- 📅 **Calendar Integration** - Select dates to check availability and see dynamic pricing
- 💰 **Dynamic Pricing** - Real-time price calculation with seasonal multipliers
- 📍 **Geolocation Search** - Click on map to search properties within a radius
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop

## 🏗️ Architecture

This is a **standalone frontend application** that can be deployed independently from the backend.

```
Frontend (Next.js)  ──HTTP/REST──>  Backend API (Django)
     Vercel                            Railway/Render
```

**Backend Repository:** You need a separate Django API backend for this frontend to work.

- Backend repo: https://github.com/ViniciusDes/rental-property-backend

### Installation

1. **Clone the repository:**

```bash
after clone this repo 
cd rental-properties-frontend
```

2. **Install dependencies:**

```bash
npm install --legacy-peer-deps
```

> **Note:** `--legacy-peer-deps` is required due to React Leaflet peer dependency compatibility

3. **Configure API URL:**

Create `.env.local` file in the root directory:

```bash
# For local backend
NEXT_PUBLIC_API_URL=http://localhost:8000/api

```

> **Important:** The environment variable MUST be prefixed with `NEXT_PUBLIC_` to be accessible in the browser

4. **Start development server:**

```bash
npm run dev
```

5. **Open browser:**

```
http://localhost:3000
```

## 🔗 Backend Setup

This frontend requires a backend API.

## Run Backend Locally

1. Clone the backend repository (https://github.com/ViniciusDes/rental-property-backend) 
2. Follow backend README instructions
3. Start backend on `http://localhost:8000`
4. # Configure frontend `.env.local`:

- 🗺️ **Interactive Leaflet Map** - View properties on OpenStreetMap with markers and popups
- 🔍 **Advanced Filtering** - Filter by type, price, bedrooms, bathrooms, amenities, location
- 📅 **Calendar Integration** - Select dates to check availability and see dynamic pricing
- 💰 **Dynamic Pricing** - Real-time price calculation with seasonal multipliers
- 📍 **Geolocation Search** - Click on map to search properties within a radius
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop

## 🏗️ Architecture

This is a **standalone frontend application** that can be deployed independently from the backend.

