export interface Photo {
  url: string;
  caption?: string;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipcode?: string;
  type: 'sale' | 'rent' | string;
  property_type: 'single_family' | 'condo' | 'townhouse' | 'villa' | 'apartment' | string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lot_size_sqft?: number;
  year_built?: number;
  status?: 'active' | 'pending' | 'sold' | string;
  days_on_market?: number;
  lat?: number;
  lng?: number;
  description: string;
  features?: string[];
  hoa_fee?: number;
  taxes_annual?: number;
  photos: Photo[];
  agent?: Agent;
  listed_at?: string;
  city_market?: string;
  currency?: string;
}

export interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface PropertyListResponse {
  data: Property[];
  pagination: Pagination;
  meta?: {
    filters?: Record<string, unknown>;
    counts?: Record<string, number>;
  };
}

export interface PropertyPhotosResponse {
  id: string;
  listing_id: string;
  photos: Photo[];
}
