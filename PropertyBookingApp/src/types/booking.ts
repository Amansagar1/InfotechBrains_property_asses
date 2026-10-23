export interface BookingFormData {
  visitorName: string;
  email: string;
  contactNumber: string;
  countryCode: string;
  preferredDate: string;
  preferredTimeSlot: string;
}

export type BookingFormErrors = Partial<Record<keyof BookingFormData, string>>;

export interface PropertySummary {
  id: string;
  address: string;
  city: string;
  state: string;
  price: number;
  currency?: string;
  property_type: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  imageUrl?: string;
}

export interface BookingConfirmation {
  bookingId: string;
  property: PropertySummary;
  visitor: BookingFormData;
  submittedAt: string;
  isSimulated: true;
}
