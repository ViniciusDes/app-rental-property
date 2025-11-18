'use client';

/**
 * Main Properties Listing Page
 *
 * Features:
 * - Property list with pagination
 * - Interactive filters (sidebar)
 * - Leaflet map with property markers
 * - Geolocation search (click on map)
 * - Real-time API integration with Django backend
 */

import { useState, useEffect } from 'react';
import { fetchProperties } from '@/lib/api';
import type { Property, PropertyFilters as Filters } from '@/lib/types';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import PropertyMap from '@/components/PropertyMap';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<Filters>({ page_size: 20 });
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [showMap, setShowMap] = useState(true); // Map open by default
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]);
  const [selectedDates, setSelectedDates] = useState<{checkIn: string; checkOut: string} | undefined>(undefined);

  // Fetch properties when filters change
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const data = await fetchProperties(filters);
        setProperties(data.results);
        setTotalCount(data.count);

        // Update map center if there are results with geolocation
        if (data.results.length > 0 && filters.latitude && filters.longitude) {
          setMapCenter([filters.latitude, filters.longitude]);
        } else if (data.results.length > 0) {
          setMapCenter([data.results[0].latitude, data.results[0].longitude]);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [filters]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    // Update selected dates for dynamic pricing
    if (newFilters.check_in && newFilters.check_out) {
      setSelectedDates({
        checkIn: newFilters.check_in,
        checkOut: newFilters.check_out
      });
    } else {
      setSelectedDates(undefined);
    }
  };

  const handleLocationSelect = (lat: number, lng: number, radius: number) => {
    setFilters({
      ...filters,
      latitude: lat,
      longitude: lng,
      radius,
    });
    setMapCenter([lat, lng]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Rental Properties</h1>
              <p className="text-sm text-gray-600 mt-1">
                {totalCount} properties available
                {selectedDates && (
                  <span className="ml-2 text-green-600 font-medium">
                    · {selectedDates.checkIn} to {selectedDates.checkOut} (Dynamic Pricing Active)
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={() => setShowMap(!showMap)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <PropertyFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              showGeolocationFilters={showMap}
            />
          </aside>

          {/* Properties List & Map */}
          <main className="lg:col-span-3">
            {/* Map */}
            {showMap && (
              <div className="mb-8">
                <PropertyMap
                  properties={properties}
                  center={mapCenter}
                  zoom={10}
                  onLocationSelect={handleLocationSelect}
                  selectedRadius={filters.radius || 10}
                />
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Click on the map to search for properties within a radius
                </p>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-md h-96 animate-pulse"
                  >
                    <div className="h-48 bg-gray-300" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-300 rounded w-3/4" />
                      <div className="h-4 bg-gray-300 rounded w-1/2" />
                      <div className="h-4 bg-gray-300 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : properties.length === 0 ? (
              /* No Results */
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No properties found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={() => setFilters({ page_size: 20 })}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              /* Properties Grid */
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      selectedDates={selectedDates}
                    />
                  ))}
                </div>

                {/* Pagination Info */}
                {totalCount > properties.length && (
                  <div className="mt-8 text-center text-sm text-gray-600">
                    Showing {properties.length} of {totalCount} properties
                    <p className="text-xs mt-1">
                      (Pagination can be implemented using the next/previous URLs from the API)
                    </p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Powered by Django + PostGIS + Next.js 14
          </p>
        </div>
      </footer>
    </div>
  );
}
