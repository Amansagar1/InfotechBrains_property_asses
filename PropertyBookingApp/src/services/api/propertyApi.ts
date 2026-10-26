import { apiClient } from './apiClient';
import { ENDPOINTS } from './endpoints';
import {
  Property,
  PropertyListResponse,
  PropertyPhotosResponse,
  Photo,
} from '../../types/property';
import {
  BookingFormData,
  BookingConfirmation,
  PropertySummary,
} from '../../types/booking';
import { resolveImageUrl } from '../../utils/imageHelper';

export const getPropertyListings = async (
  page: number = 1,
  perPage: number = 10
): Promise<PropertyListResponse> => {
  console.log(`📡 [API CALL] getPropertyListings(page: ${page}, perPage: ${perPage})`);
  const response = await apiClient.get<PropertyListResponse>(
    ENDPOINTS.listings(page, perPage)
  );
  console.log(
    `📋 [API DATA] Listings page ${page}: loaded ${response.data.data.length} properties. Total available: ${response.data.pagination?.total}`
  );
  return response.data;
};

export const getPropertyDetails = async (
  propertyId: string
): Promise<Property> => {
  console.log(`📡 [API CALL] getPropertyDetails(id: "${propertyId}")`);
  const response = await apiClient.get<Property>(
    ENDPOINTS.propertyDetails(propertyId)
  );
  console.log(
    `🏠 [API DATA] Property details: "${response.data.address}", Price: $${response.data.price}, Type: ${response.data.property_type}`
  );
  return response.data;
};

export const getPropertyPhotos = async (
  propertyId: string
): Promise<Photo[]> => {
  try {
    console.log(`📡 [API CALL] getPropertyPhotos(id: "${propertyId}")`);
    const response = await apiClient.get<PropertyPhotosResponse>(
      ENDPOINTS.propertyPhotos(propertyId)
    );
    console.log(
      `📸 [API DATA] Photos for ${propertyId}: received ${response.data.photos?.length || 0} photos`
    );
    return response.data.photos || [];
  } catch (err) {
    console.warn(`⚠️ [API PHOTOS WARN] Photos endpoint for ${propertyId}: using listing photos fallback`);
    return [];
  }
};

export const submitVisitBooking = async (
  formData: BookingFormData,
  property: Property
): Promise<BookingConfirmation> => {
  await new Promise(resolve => setTimeout(() => resolve(undefined), 1000));

  const propertySummary: PropertySummary = {
    id: property.id,
    address: property.address,
    city: property.city,
    state: property.state,
    price: property.price,
    currency: property.currency || 'USD',
    property_type: property.property_type,
    beds: property.beds,
    baths: property.baths,
    sqft: property.sqft,
    imageUrl: property.photos?.[0]?.url || (property as any).featured_photo || '',
    agent: property.agent,
  };

  const confirmation: BookingConfirmation = {
    bookingId: `BK-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`,
    property: propertySummary,
    visitor: formData,
    submittedAt: new Date().toISOString(),
    isSimulated: true,
  };

  return confirmation;
};
