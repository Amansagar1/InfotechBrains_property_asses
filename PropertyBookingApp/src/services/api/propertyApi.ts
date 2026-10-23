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
  const response = await apiClient.get<PropertyListResponse>(
    ENDPOINTS.listings(page, perPage)
  );
  return response.data;
};

export const getPropertyDetails = async (
  propertyId: string
): Promise<Property> => {
  const response = await apiClient.get<Property>(
    ENDPOINTS.propertyDetails(propertyId)
  );
  return response.data;
};

export const getPropertyPhotos = async (
  propertyId: string
): Promise<Photo[]> => {
  try {
    const response = await apiClient.get<PropertyPhotosResponse>(
      ENDPOINTS.propertyPhotos(propertyId)
    );
    return response.data.photos || [];
  } catch {
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
    imageUrl: resolveImageUrl(property.photos?.[0]?.url, property.id),
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
