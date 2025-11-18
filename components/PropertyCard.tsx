/**
 * Property Card Component
 * Displays individual property information in a card format with dynamic pricing
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Property } from '@/lib/types';
import { calculatePrice } from '@/lib/api';

interface PropertyCardProps {
  property: Property;
  selectedDates?: {
    checkIn: string;
    checkOut: string;
  };
}

export default function PropertyCard({ property, selectedDates }: PropertyCardProps) {
  const [priceInfo, setPriceInfo] = useState<{
    total: string;
    nights: number;
    average: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // Calculate price when dates are selected
  useEffect(() => {
    if (selectedDates && selectedDates.checkIn && selectedDates.checkOut) {
      const fetchPrice = async () => {
        try {
          setLoading(true);
          const data = await calculatePrice(
            property.id,
            selectedDates.checkIn,
            selectedDates.checkOut
          );
          setPriceInfo({
            total: data.total_price,
            nights: data.nights,
            average: data.average_price_per_night,
          });
        } catch (error) {
          console.error('Error calculating price:', error);
          setPriceInfo(null);
        } finally {
          setLoading(false);
        }
      };
      fetchPrice();
    } else {
      setPriceInfo(null);
    }
  }, [selectedDates, property.id]);

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        {/* Property Image */}
        <div className="relative h-48 bg-gray-200">
          {property.primary_image ? (
            <img
              src={property.primary_image}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          {property.distance && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
              {property.distance} km away
            </div>
          )}
          {priceInfo && (
            <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
              {priceInfo.nights} nights
            </div>
          )}
        </div>

        {/* Property Info */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
              {property.name}
            </h3>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {property.property_type}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            {property.city}, {property.country}
          </p>

          <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
            <span>{property.bedrooms} bed</span>
            <span>·</span>
            <span>{property.bathrooms} bath</span>
            <span>·</span>
            <span>{property.max_guests} guests</span>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {property.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                >
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Price - Dynamic or Base */}
          <div className="flex items-baseline justify-between pt-3 border-t border-gray-200">
            {loading ? (
              <div className="text-sm text-gray-500">Calculating...</div>
            ) : priceInfo ? (
              <div>
                <div className="text-2xl font-bold text-green-600">
                  ${parseFloat(priceInfo.total).toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  total · ${parseFloat(priceInfo.average).toFixed(2)}/night avg
                </div>
              </div>
            ) : (
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  ${property.base_price_per_night}
                </span>
                <span className="text-sm text-gray-500 ml-1">/night</span>
              </div>
            )}
            <span className="text-sm text-blue-600 font-medium hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
