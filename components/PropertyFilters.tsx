'use client';

/**
 * Property Filters Component
 *
 * Provides all filtering options that connect to the Django API:
 * - Property type
 * - Price range
 * - Bedrooms/Bathrooms
 * - Amenities
 * - City/Country search
 * - Date range for availability
 * - Geolocation radius
 */

import { useState, useEffect } from 'react';
import type { PropertyFilters as Filters } from '@/lib/types';
import { PROPERTY_TYPES, AMENITIES } from '@/lib/types';

interface PropertyFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  showGeolocationFilters?: boolean;
}

export default function PropertyFilters({
  filters,
  onFilterChange,
  showGeolocationFilters = false,
}: PropertyFiltersProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Update local filters when parent filters change
  useEffect(() => {
    setLocalFilters(filters);
    if (filters.amenities) {
      setSelectedAmenities(filters.amenities.split(','));
    }
  }, [filters]);

  const handleChange = (key: keyof Filters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter(a => a !== amenity)
      : [...selectedAmenities, amenity];

    setSelectedAmenities(newAmenities);
    handleChange('amenities', newAmenities.join(','));
  };

  const handleReset = () => {
    const resetFilters: Filters = { page_size: 20 };
    setLocalFilters(resetFilters);
    setSelectedAmenities([]);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset All
        </button>
      </div>

      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <input
          type="text"
          placeholder="Search properties..."
          value={localFilters.search || ''}
          onChange={(e) => handleChange('search', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type
        </label>
        <select
          value={localFilters.property_type || ''}
          onChange={(e) => handleChange('property_type', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Types</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            placeholder="e.g., Berlin"
            value={localFilters.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            placeholder="e.g., Germany"
            value={localFilters.country || ''}
            onChange={(e) => handleChange('country', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range (per night)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              placeholder="Min"
              value={localFilters.min_price || ''}
              onChange={(e) => handleChange('min_price', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Max"
              value={localFilters.max_price || ''}
              onChange={(e) => handleChange('max_price', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Bedrooms
          </label>
          <select
            value={localFilters.bedrooms__gte || ''}
            onChange={(e) => handleChange('bedrooms__gte', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}+
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Bathrooms
          </label>
          <select
            value={localFilters.bathrooms__gte || ''}
            onChange={(e) => handleChange('bathrooms__gte', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any</option>
            {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((num) => (
              <option key={num} value={num}>
                {num}+
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Max Guests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Min Guests
        </label>
        <select
          value={localFilters.max_guests || ''}
          onChange={(e) => handleChange('max_guests', e.target.value ? Number(e.target.value) : undefined)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Any</option>
          {[1, 2, 4, 6, 8, 10].map((num) => (
            <option key={num} value={num}>
              {num}+
            </option>
          ))}
        </select>
      </div>

      {/* Date Range for Availability */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Dates
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="date"
              value={localFilters.check_in || ''}
              onChange={(e) => handleChange('check_in', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Check-in"
            />
          </div>
          <div>
            <input
              type="date"
              value={localFilters.check_out || ''}
              onChange={(e) => handleChange('check_out', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Check-out"
            />
          </div>
        </div>
      </div>

      {/* Geolocation Radius */}
      {showGeolocationFilters && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Radius (km)
          </label>
          <input
            type="number"
            value={localFilters.radius || 10}
            onChange={(e) => handleChange('radius', e.target.value ? Number(e.target.value) : 10)}
            min="1"
            max="100"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Click on the map to select a location
          </p>
        </div>
      )}

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amenities
        </label>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {AMENITIES.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={localFilters.ordering || ''}
          onChange={(e) => handleChange('ordering', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Newest First</option>
          <option value="-created_at">Newest First</option>
          <option value="created_at">Oldest First</option>
          <option value="base_price_per_night">Price: Low to High</option>
          <option value="-base_price_per_night">Price: High to Low</option>
          <option value="bedrooms">Bedrooms: Low to High</option>
          <option value="-bedrooms">Bedrooms: High to Low</option>
          <option value="name">Name: A-Z</option>
          <option value="-name">Name: Z-A</option>
        </select>
      </div>

      {/* Active Filters Summary */}
      {Object.keys(localFilters).length > 1 && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(localFilters).map(([key, value]) => {
              if (!value || key === 'page_size') return null;
              return (
                <span
                  key={key}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                >
                  {key.replace(/__/g, ' ').replace(/_/g, ' ')}: {value.toString()}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
