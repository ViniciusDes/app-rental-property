/**
 * API Client for Django Rental API
 * Handles all HTTP requests to the backend
 */

import axios from 'axios';
import type { PropertyListResponse, PropertyDetail, PropertyFilters } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch properties with optional filters
 * Similar to Django's PropertyViewSet.list()
 */
export async function fetchProperties(
  filters?: PropertyFilters
): Promise<PropertyListResponse> {
  const params = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
  }

  const response = await apiClient.get<PropertyListResponse>('/properties/', { params });
  return response.data;
}

/**
 * Fetch a single property by ID
 * Similar to Django's PropertyViewSet.retrieve()
 */
export async function fetchPropertyById(id: number): Promise<PropertyDetail> {
  const response = await apiClient.get<PropertyDetail>(`/properties/${id}/`);
  return response.data;
}

/**
 * Fetch nearby properties using geolocation
 * Similar to Django's PropertyViewSet.nearby()
 */
export async function fetchNearbyProperties(
  latitude: number,
  longitude: number,
  radius: number = 10
): Promise<{ count: number; radius_km: number; center: { latitude: number; longitude: number }; results: PropertyListResponse['results'] }> {
  const response = await apiClient.get('/properties/nearby/', {
    params: { latitude, longitude, radius },
  });
  return response.data;
}

/**
 * Fetch property availability
 * Similar to Django's PropertyViewSet.availability()
 */
export async function fetchPropertyAvailability(id: number) {
  const response = await apiClient.get(`/properties/${id}/availability/`);
  return response.data;
}

/**
 * Calculate price for a date range with dynamic pricing
 * Similar to Django's PropertyViewSet.calculate_price()
 */
export async function calculatePrice(
  id: number,
  checkIn: string,
  checkOut: string
): Promise<{
  property_id: number;
  property_name: string;
  check_in: string;
  check_out: string;
  nights: number;
  base_price_per_night: string;
  total_price: string;
  average_price_per_night: string;
  currency: string;
  daily_breakdown: Array<{
    date: string;
    base_price: string;
    multiplier: string;
    final_price: string;
    pricing_rule: string;
  }>;
}> {
  const response = await apiClient.get(`/properties/${id}/calculate_price/`, {
    params: { check_in: checkIn, check_out: checkOut },
  });
  return response.data;
}

/**
 * Build query string from filters
 * Helper function for URL manipulation
 */
export function buildQueryString(filters: PropertyFilters): string {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value.toString());
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}
