"use client";

/**
 * Leaflet Map Component for Property Geolocation
 *
 * Features:
 * - Interactive map with property markers
 * - Click to select location and filter nearby properties
 * - Shows property cards on marker click
 * - Integrates with filter system
 */

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Property } from "@/lib/types";

// Fix for default marker icon in Next.js
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

interface PropertyMapProps {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
  onLocationSelect?: (lat: number, lng: number, radius: number) => void;
  selectedRadius?: number;
}

// Component to handle map clicks
function MapClickHandler({
  onLocationSelect,
  radius,
}: {
  onLocationSelect?: (lat: number, lng: number, radius: number) => void;
  radius: number;
}) {
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setSelectedLocation([lat, lng]);
      if (onLocationSelect) {
        onLocationSelect(lat, lng, radius);
      }
    },
  });

  if (!selectedLocation) return null;

  return (
    <>
      <Marker position={selectedLocation}>
        <Popup>
          Search center
          <br />
          Radius: {radius}km
        </Popup>
      </Marker>
      <Circle
        center={selectedLocation}
        radius={radius * 1000} // Convert km to meters
        pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.1 }}
      />
    </>
  );
}

export default function PropertyMap({
  properties,
  center = [51.505, -0.09], // Default to London
  zoom = 10,
  onLocationSelect,
  selectedRadius = 10,
}: PropertyMapProps) {
  const [mounted, setMounted] = useState(false);

  // Only render map on client side
  useEffect(() => {
    // Fix for default marker icon in Next.js (client-side only)
    const DefaultIcon = L.icon({
      iconUrl: icon.src,
      shadowUrl: iconShadow.src,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[360px] bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[360px] rounded-lg overflow-hidden border border-gray-300">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Property markers */}
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.latitude, property.longitude]}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-bold text-lg mb-2">{property.name}</h3>
                {property.primary_image && (
                  <img
                    src={property.primary_image}
                    alt={property.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <p className="text-sm text-gray-600">
                  {property.city}, {property.country}
                </p>
                <p className="text-sm font-semibold mt-2">
                  ${property.base_price_per_night}/night
                </p>
                <p className="text-xs text-gray-500">
                  {property.bedrooms} bed · {property.bathrooms} bath
                </p>
                {property.distance && (
                  <p className="text-xs text-blue-600 mt-1">
                    {property.distance} km away
                  </p>
                )}
                <a
                  href={`/properties/${property.id}`}
                  className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  View Details
                </a>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Click handler for location selection */}
        {onLocationSelect && (
          <MapClickHandler
            onLocationSelect={onLocationSelect}
            radius={selectedRadius}
          />
        )}
      </MapContainer>
    </div>
  );
}
