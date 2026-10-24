import { Property } from '../types/property';
import { SAVED_IMAGES } from '../utils/imageHelper';

export interface SavedPropertyItem extends Property {
  title: string;
  priceDisplay: string;
  locationDisplay: string;
  listingType: 'For Sale' | 'For Rent';
  sqftDisplay: string;
  propertyTypeDisplay: string;
  localImage: any;
  savedTimestamp: number;
}

export const INITIAL_SAVED_PROPERTIES: SavedPropertyItem[] = [
  {
    id: 'prop_001',
    title: 'Maplewood Villa',
    address: 'Whitefield, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'sale',
    property_type: 'villa',
    price: 24000000,
    priceDisplay: '₹ 2.4 Cr',
    locationDisplay: 'Whitefield, Bangalore',
    listingType: 'For Sale',
    beds: 4,
    baths: 3,
    sqft: 2400,
    sqftDisplay: '2,400 sqft',
    propertyTypeDisplay: 'Villa',
    localImage: SAVED_IMAGES.maplewood,
    savedTimestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
    description:
      'Magnificent luxury two-story contemporary villa situated in prime Whitefield. Features a private swimming pool, landscaped lawn, expansive glass facades, double-height ceiling living hall, modern modular kitchen, and smart home automation.',
    photos: [
      { url: 'saved_maplewood', caption: 'Private Pool & Exterior' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop', caption: 'Living Area' },
    ],
    agent: {
      id: 'agent_01',
      name: 'Aditya Sharma',
      phone: '+91 98765 43210',
      email: 'aditya.sharma@perfectspace.in',
    },
    features: [
      'Private Swimming Pool',
      'Italian Marble Flooring',
      'Landscape Garden',
      'Covered 2-Car Parking',
      '24/7 Security & CCTV',
      'Solar Power Backup',
    ],
    currency: 'INR',
  },
  {
    id: 'prop_002',
    title: 'Serene Heights',
    address: 'Sarjapur Road, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'sale',
    property_type: 'apartment',
    price: 13500000,
    priceDisplay: '₹ 1.35 Cr',
    locationDisplay: 'Sarjapur Road, Bangalore',
    listingType: 'For Sale',
    beds: 3,
    baths: 2,
    sqft: 1600,
    sqftDisplay: '1,600 sqft',
    propertyTypeDisplay: 'Apartment',
    localImage: SAVED_IMAGES.serene,
    savedTimestamp: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
    description:
      'Bright and airy luxury high-rise condominium overlooking sprawling green canopies. Floor-to-ceiling balcony sliders, premium wooden finishes, open-concept living and dining, clubhouse access, and round-the-clock concierge.',
    photos: [
      { url: 'saved_serene', caption: 'Spacious Living Room' },
      { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop', caption: 'Balcony View' },
    ],
    agent: {
      id: 'agent_02',
      name: 'Priya Narang',
      phone: '+91 98112 34567',
      email: 'priya.narang@perfectspace.in',
    },
    features: [
      'Panaromic Park Views',
      'Clubhouse & Gym',
      'Jogging Track',
      'EV Charging Point',
      'Intercom & Gated Security',
    ],
    currency: 'INR',
  },
  {
    id: 'prop_003',
    title: 'Willow Creek Residence',
    address: 'Electronic City, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'rent',
    property_type: 'apartment',
    price: 8500000,
    priceDisplay: '₹ 85 Lakh',
    locationDisplay: 'Electronic City, Bangalore',
    listingType: 'For Rent',
    beds: 2,
    baths: 2,
    sqft: 1150,
    sqftDisplay: '1,150 sqft',
    propertyTypeDisplay: 'Apartment',
    localImage: SAVED_IMAGES.willow,
    savedTimestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    description:
      'Chic urban residence in Electronic City featuring contemporary architectural lines, private balcony, warm designer lighting, secure gated community, clubhouse, gym, and proximity to major tech parks.',
    photos: [
      { url: 'saved_willow', caption: 'Facade & Entrance' },
      { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop', caption: 'Interior' },
    ],
    agent: {
      id: 'agent_03',
      name: 'Karan Mehra',
      phone: '+91 98450 12345',
      email: 'karan.mehra@perfectspace.in',
    },
    features: [
      'Modern Architectural Facade',
      'High-Speed Elevators',
      'Infinity Pool on Terrace',
      '24/7 Power Backup',
      'Children Play Area',
    ],
    currency: 'INR',
  },
];
