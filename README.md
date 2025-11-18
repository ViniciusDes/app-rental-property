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

- Backend repo: [Link to your backend repository]
- Backend API documentation: See backend README for endpoints

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** installed
- **Backend API running** - This frontend requires a Django REST API backend
  - Local: `http://localhost:8000/api`
  - Production: Your deployed backend URL
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository:**

```bash
git clone <your-frontend-repo-url>
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

# OR for production backend
# NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api
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

This frontend requires a backend API. You have two options:

### Option 1: Use Existing Deployed Backend

If you have access to a deployed backend:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

### Option 2: Run Backend Locally

1. Clone the backend repository (separate repo)
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

```
Frontend (Next.js)  ──HTTP/REST──>  Backend API (Django)
     Vercel                            Railway/Render
```

**Backend Repository:** You need a separate Django API backend for this frontend to work.

- Backend repo: [Link to your backend repository]
- Backend API documentation: See backend README for endpoints

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** installed
- **Backend API running** - This frontend requires a Django REST API backend
  - Local: `http://localhost:8000/api`
  - Production: Your deployed backend URL
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository:**

```bash
git clone <your-frontend-repo-url>
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

# OR for production backend
# NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api
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

This frontend requires a backend API. You have two options:

### Option 1: Use Existing Deployed Backend

If you have access to a deployed backend:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

### Option 2: Run Backend Locally

1. Clone the backend repository (separate repo)
2. Follow backend README instructions
3. Start backend on `http://localhost:8000`
4. Configure frontend `.env.local`:

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

**Backend Repository:** [Link to Django backend repo]

**Required Backend Endpoints:**
<<<<<<< HEAD
=======

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- `GET /api/properties/` - List properties
- `GET /api/properties/{id}/` - Property details
- `GET /api/properties/nearby/` - Geolocation search
- `GET /api/properties/{id}/availability/` - Check availability
- `GET /api/properties/{id}/calculate_price/` - Dynamic pricing

## 📁 Project Structure

```
rental-properties-frontend/    (standalone repository)
├── app/
│   ├── page.tsx              # Main search page with property listing
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles (includes Leaflet CSS)
├── components/
│   ├── PropertyCard.tsx      # Property card with dynamic pricing
│   ├── PropertyFilters.tsx   # Filter sidebar with all controls
│   └── PropertyMap.tsx       # Leaflet map with markers & geolocation
├── lib/
│   ├── api.ts               # API client functions (axios)
│   └── types.ts             # TypeScript interfaces
├── public/                  # Static assets
├── .env.local              # Local environment variables (create this)
├── .env.production         # Production environment variables template
├── .gitignore              # Git ignore patterns
├── package.json            # Dependencies and scripts
├── vercel.json             # Vercel deployment config
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── README.md               # This file
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Maps:** Leaflet + React Leaflet
- **UI:** Custom components with Tailwind

## 🔧 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🌍 Environment Variables

Create `.env.local` for development:

```bash
# Backend API URL (required)
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

For production (`.env.production`):

```bash
# Production backend URL (Railway/Render)
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api
```

> **Important:** All environment variables used in browser code must be prefixed with `NEXT_PUBLIC_`

## 📦 Key Dependencies

```json
{
<<<<<<< HEAD
  "next": "^15.0.3",          // Next.js framework
  "react": "^19.0.0",         // React library
  "typescript": "^5",         // TypeScript
  "tailwindcss": "^3.4.1",    // Utility-first CSS
  "axios": "^1.6.2",          // HTTP client
  "leaflet": "^1.9.4",        // Map library
  "react-leaflet": "^4.2.1"   // React bindings for Leaflet
=======
  "next": "^15.0.3", // Next.js framework
  "react": "^19.0.0", // React library
  "typescript": "^5", // TypeScript
  "tailwindcss": "^3.4.1", // Utility-first CSS
  "axios": "^1.6.2", // HTTP client
  "leaflet": "^1.9.4", // Map library
  "react-leaflet": "^4.2.1" // React bindings for Leaflet
>>>>>>> 5c9c0fd (feat: finished v1 frontend app)
}
```

## 🎨 Components Overview

### PropertyCard

<<<<<<< HEAD
Displays individual property information with:
=======

Displays individual property information with:

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- Property image
- Name, type, location
- Bedrooms, bathrooms, max guests
- Amenities (first 3 + count)
- Distance (when geolocation active)
- Base price or dynamic price (when dates selected)

**Props:**
<<<<<<< HEAD
=======

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- `property: Property` - Property data from API
- `selectedDates?: { checkIn: string; checkOut: string }` - Optional date range for dynamic pricing

### PropertyFilters

<<<<<<< HEAD
Complete filter sidebar with:
=======

Complete filter sidebar with:

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- Property type dropdown
- City/country text inputs
- Price range (min/max)
- Bedrooms/bathrooms selectors
- Amenities multi-select checkboxes
- Date range (check-in/check-out)
- Max guests selector
- Radius slider (for geolocation)
- Clear filters button

**Props:**
<<<<<<< HEAD
=======

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- `filters: PropertyFilters` - Current filter state
- `onFilterChange: (filters: PropertyFilters) => void` - Filter change callback
- `showGeolocationFilters: boolean` - Show/hide geolocation controls

### PropertyMap

<<<<<<< HEAD
Interactive Leaflet map with:
=======

Interactive Leaflet map with:

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- OpenStreetMap tiles
- Property markers with popups
- Click-to-search functionality
- Circle visualization for search radius
- Auto-center on results

**Props:**
<<<<<<< HEAD
=======

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- `properties: Property[]` - Array of properties to display
- `center?: [number, number]` - Map center coordinates (default: London)
- `zoom?: number` - Initial zoom level (default: 10)
- `onLocationSelect?: (lat, lng, radius) => void` - Location click callback
- `selectedRadius?: number` - Search radius in km (default: 10)

## 🔌 API Integration

All API calls are in `lib/api.ts`:

```typescript
// Fetch properties with filters
fetchProperties(filters?: PropertyFilters): Promise<PropertyListResponse>

// Fetch single property
fetchPropertyById(id: number): Promise<PropertyDetail>

// Geolocation search
fetchNearbyProperties(lat: number, lng: number, radius: number)

// Property availability
fetchPropertyAvailability(id: number)

// Dynamic pricing calculation
calculatePrice(id: number, checkIn: string, checkOut: string)
```

## 🗺️ Using the Map

1. **View Properties:** All properties display as markers on the map
2. **Click Marker:** Shows popup with property details and "View Details" link
3. **Search by Location:**
   - Click anywhere on map to set search center
   - Blue circle appears showing search radius
   - Properties filtered by distance
   - Distance shown on property cards
4. **Adjust Radius:** Use radius slider in filters sidebar

## 💰 Dynamic Pricing Feature

When you select dates in the filter sidebar:

1. **Date Selection:** Check-in and check-out dates
2. **Real-time Calculation:** Each property card fetches dynamic price
3. **Display:**
   - Green badge showing number of nights
   - Total price in green
   - Average price per night
   - "Calculating..." state while loading

Backend applies pricing rules (e.g., summer 1.30x, winter 0.85x) automatically.

## 🐛 Troubleshooting

### Map Not Loading

<<<<<<< HEAD
**Problem:** Gray tiles or no map visible

# **Solution:**

**Problem:** Gray tiles or no map visible

**Solution:**

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

```bash
# Check Leaflet CSS is imported in app/globals.css
@import 'leaflet/dist/leaflet.css';

# Verify node_modules has leaflet
npm install --legacy-peer-deps
```

### Cannot Connect to API

<<<<<<< HEAD
**Problem:** Properties not loading, network errors

# **Solution:**

**Problem:** Properties not loading, network errors

**Solution:**

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

```bash
# Check backend is running
curl http://localhost:8000/api/properties/

# Verify .env.local has correct API URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Restart Next.js dev server after changing .env
npm run dev
```

### CORS Errors

<<<<<<< HEAD
**Problem:** Browser console shows CORS policy errors

# **Solution:**

**Problem:** Browser console shows CORS policy errors

**Solution:**

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- Ensure Django backend has `CORS_ALLOWED_ORIGINS` including `http://localhost:3000`
- Check backend `settings.py` has `corsheaders` in `INSTALLED_APPS`

### Dynamic Pricing Not Working

<<<<<<< HEAD
**Problem:** Prices don't update when selecting dates

# **Solution:**

**Problem:** Prices don't update when selecting dates

**Solution:**

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

```bash
# Check backend endpoint
curl "http://localhost:8000/api/properties/1/calculate_price/?check_in=2025-06-15&check_out=2025-06-20"

# Verify dates are in correct format (YYYY-MM-DD)
# Check browser console for errors
```

## 📱 Responsive Breakpoints

- **Mobile:** Single column layout, full-width filters
- **Tablet (md):** 2-column property grid
- **Desktop (lg):** 4-column layout with sidebar, 3-column property grid
- **Map:** Full width on all breakpoints, height 360px

## 🎯 Key Features Walkthrough

### 1. Basic Search

# <<<<<<< HEAD

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

```
1. Open app at http://localhost:3000
2. Browse properties in grid view
3. Scroll through results
```

### 2. Filter by Property Type

# <<<<<<< HEAD

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

```
1. Open filters sidebar (left)
2. Select "Apartment" from Property Type dropdown
3. Results update automatically
```

### 3. Geolocation Search

# <<<<<<< HEAD

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

```
1. Click "Show Map" (if hidden)
2. Click anywhere on the map
3. Blue circle appears with radius
4. Properties filtered by distance
5. Distance shown on cards
```

### 4. Date Selection + Dynamic Pricing

# <<<<<<< HEAD

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

```
1. Select Check-in date (e.g., 2025-06-15)
2. Select Check-out date (e.g., 2025-06-20)
3. Property cards update with:
   - Green "5 nights" badge
   - Total price
   - Average per night
4. Header shows "Dynamic Pricing Active"
```

### 5. Multi-Filter Search

```
1. Type: Apartment
2. City: Berlin
3. Price: $100 - $500
4. Bedrooms: 2+
5. Amenities: WiFi + Pool
6. Dates: Next month
7. Results match ALL criteria
```

## 🚀 Production Deployment to Vercel

This standalone frontend can be deployed independently to Vercel.

### Prerequisites

# <<<<<<< HEAD

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- GitHub account
- Vercel account (free tier available)
- **Backend API deployed** and accessible via HTTPS

### Deployment Steps

#### Option 1: Vercel GitHub Integration (Recommended)

1. **Push to GitHub:**
   <<<<<<< HEAD
   =======

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-frontend-repo-url>
git push -u origin main
```

2. **Deploy on Vercel:**
   <<<<<<< HEAD
   =======

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- **Important:** No need to set root directory (repo is standalone)
- Framework Preset: Next.js (auto-detected)
- Build Command: `npm run build` (auto-detected)
- Install Command: Override with `npm install --legacy-peer-deps`

3. **Configure Environment Variables:**
   <<<<<<< HEAD
   =======

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- In Vercel project settings → Environment Variables
- Add:
  ```
  Name: NEXT_PUBLIC_API_URL
  Value: https://your-backend.up.railway.app/api
  ```
- Apply to: Production, Preview, Development

4. **Deploy:**
   - Click "Deploy"
   - Vercel builds and deploys automatically
   - Your app will be live at `https://your-app.vercel.app`

#### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from repository root)
vercel

# Follow prompts:
# - Set up new project: Yes
# - Project name: rental-properties-frontend
# - Directory: ./ (current directory)
# - Override settings: No

# Set environment variable
vercel env add NEXT_PUBLIC_API_URL production

# Deploy to production
vercel --prod
```

### Post-Deployment

1. **Update Backend CORS:**
   <<<<<<< HEAD
   =======

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- Add your Vercel URL to backend's `CORS_ALLOWED_ORIGINS`
- Example: `https://rental-properties.vercel.app`
- Redeploy backend if needed

2. **Test the Deployment:**
   <<<<<<< HEAD
   =======

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- Visit your Vercel URL
- Check browser console for errors
- Verify properties load from backend API
- Test all features (map, filters, pricing)

3. **Custom Domain (Optional):**
   - Go to Vercel project → Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed
   - Update backend CORS with custom domain

### Environment Variables

**Production (.env.production):**
<<<<<<< HEAD
=======

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

```bash
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api
```

**Note:** Remember to update this in Vercel dashboard, not just in the file.

### Continuous Deployment

Once connected to GitHub, Vercel automatically:
<<<<<<< HEAD
=======

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- ✅ Deploys on every push to `main` branch
- ✅ Creates preview deployments for pull requests
- ✅ Runs builds and checks
- ✅ Provides deployment URLs for each commit

## 📚 Learn More

### Next.js Resources

# <<<<<<< HEAD

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [TypeScript with Next.js](https://nextjs.org/docs/app/building-your-application/configuring/typescript)

### Library Documentation

# <<<<<<< HEAD

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- [React Leaflet](https://react-leaflet.js.org/)
- [Leaflet](https://leafletjs.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Axios](https://axios-http.com/docs/intro)

### Backend Integration

# <<<<<<< HEAD

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- **Backend Repository:** [Link to your Django backend repo]
- **API Documentation:** See backend README for API endpoints and setup

## 🔗 Related Repositories

This frontend is designed to work with a Django REST API backend:
<<<<<<< HEAD
=======

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

- **Backend Repository:** [rental-properties-backend](link-to-your-backend-repo)
- **Backend Tech:** Django + PostgreSQL + PostGIS
- **Deployment:** Railway, Render, or DigitalOcean

## 🤝 Contributing

This is a standalone frontend application for a property rental system.

To contribute:
<<<<<<< HEAD
=======

> > > > > > > 5c9c0fd (feat: finished v1 frontend app)

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with the backend API
5. Submit a pull request

## 📝 License

MIT License - feel free to use this project for learning!

---

**Built with Next.js 14 + TypeScript + Tailwind CSS**

**Standalone frontend application - requires separate backend API**
