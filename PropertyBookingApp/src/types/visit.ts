import { Property } from './property';

export type VisitStatus = 'upcoming' | 'completed' | 'cancelled';

export interface ScheduledVisit {
  id: string;
  bookingReference: string;
  property: Property;
  title: string;
  location: string;
  priceDisplay: string;
  priceSuffix?: string;
  beds: number;
  baths: number;
  sqftDisplay: string;
  day: string;
  month: string;
  year: string;
  timeSlot: string;
  status: VisitStatus;
  localImage: any;
  agent: {
    id: string;
    name: string;
    phone: string;
    email: string;
    role: string;
  };
  meetingLocation: string;
  notes?: string;
  createdAt: string;
}
