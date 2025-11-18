/**
 * TypeScript types for the Rental API
 * These match the Django API response structure
 */

export interface Property {
  id: number;
  name: string;
  property_type: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: string;
  max_guests: number;
  base_price_per_night: string;
  currency: string;
  amenities: string[];
  primary_image: string | null;
  distance?: number; // Only present when using geolocation
}

export interface PropertyDetail extends Property {
  description: string;
  address: string;
  images: PropertyImage[];
  available_dates: {
    message: string;
    note: string;
  };
  unavailable_dates: UnavailableDate[];
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: number;
  image_url: string;
  is_primary: boolean;
}

export interface UnavailableDate {
  check_in: string;
  check_out: string;
}

export interface PropertyListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Property[];
  filters_applied: {
    property_type: string | null;
    city: string | null;
    min_price: string | null;
    max_price: string | null;
    geolocation: boolean;
  };
}

export interface PropertyFilters {
  property_type?: string;
  city?: string;
  country?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  bedrooms__gte?: number;
  bathrooms?: number;
  bathrooms__gte?: number;
  amenities?: string;
  max_guests?: number;
  check_in?: string;
  check_out?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  ordering?: string;
  search?: string;
  page?: number;
  page_size?: number;
}

export const PROPERTY_TYPES = [
  'Apartment',
  'House',
  'Condo',
  'Villa',
  'Townhouse',
  'Loft',
  'Studio',
  'Penthouse',
  'Cottage',
  'Bungalow',
] as const;

export const AMENITIES = [
  'WiFi',
  'Kitchen',
  'Parking',
  'Pool',
  'Gym',
  'Air Conditioning',
  'Heating',
  'TV',
  'Washer',
  'Dryer',
  'Elevator',
  'Balcony',
  'Pet Friendly',
] as const;
