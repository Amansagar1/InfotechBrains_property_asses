export const APP_CONFIG = {
  APP_NAME: 'Perfect Space',
  BASE_URL: 'https://fakeapifordevs.vercel.app',
  API_BASE_URL: 'https://fakeapifordevs.vercel.app/api/realestate',
  DEFAULT_PER_PAGE: 10,
  REQUEST_TIMEOUT_MS: 12000,
  MAX_RETRIES: 2,
} as const;

export const PROPERTY_CATEGORIES = [
  'All',
  'Villa',
  'Apartment',
  'Independent House',
] as const;

export const TIME_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
] as const;

export const COUNTRY_CODES = [
  { label: '+91 (India)', value: '+91' },
  { label: '+1 (USA/Canada)', value: '+1' },
  { label: '+44 (UK)', value: '+44' },
  { label: '+971 (UAE)', value: '+971' },
  { label: '+65 (Singapore)', value: '+65' },
] as const;

export const DEFAULT_FALLBACK_IMAGES = {
  property: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  interior: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
  kitchen: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop',
  pool: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200&auto=format&fit=crop',
} as const;
