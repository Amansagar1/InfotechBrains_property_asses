import { Photo } from '../types/property';
import { APP_CONFIG } from '../constants/config';

//-------------------- Curated Architectural Photography ----------------------
const CURATED_EXTERIORS = [
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&auto=format&fit=crop&q=80',
];

const ROOM_PHOTOS: Record<string, string> = {
  living: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&auto=format&fit=crop&q=80',
  kitchen: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=900&auto=format&fit=crop&q=80',
  bedroom: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&auto=format&fit=crop&q=80',
  backyard: 'https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=900&auto=format&fit=crop&q=80',
};

const getHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

//-------------------- Image Resolution Helpers ----------------------
export const resolveImageUrl = (
  url?: string,
  propertyType?: string,
  propertyId?: string
): string => {
  if (!url) return '';

  if (
    (url.startsWith('http://') || url.startsWith('https://')) &&
    !url.includes('placeholder.svg')
  ) {
    return url;
  }

  if (url.includes('placeholder.svg') || url.endsWith('.svg')) {
    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes('living')) return ROOM_PHOTOS.living;
    if (lowerUrl.includes('kitchen')) return ROOM_PHOTOS.kitchen;
    if (lowerUrl.includes('bedroom')) return ROOM_PHOTOS.bedroom;
    if (lowerUrl.includes('backyard') || lowerUrl.includes('garden')) return ROOM_PHOTOS.backyard;

    const listingMatch = url.match(/listing=([^&]+)/);
    const seed = listingMatch ? listingMatch[1] : propertyId || propertyType || url;
    const index = getHash(seed) % CURATED_EXTERIORS.length;
    return CURATED_EXTERIORS[index];
  }

  return `${APP_CONFIG.BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const getPropertyPhotos = (
  property?: { id?: string; photos?: Photo[] } | null,
  photos?: Photo[]
): Photo[] => {
  if (photos && photos.length > 0) {
    return photos;
  }
  if (property?.photos && property.photos.length > 0) {
    return property.photos;
  }
  return [];
};
