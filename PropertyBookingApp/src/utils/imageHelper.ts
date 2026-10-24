import { Photo } from '../types/property';

export const SAVED_IMAGES = {
  maplewood: require('../assets/images/saved_maplewood.jpg'),
  serene: require('../assets/images/saved_serene.jpg'),
  willow: require('../assets/images/saved_willow.jpg'),
};

export const CURATED_PROPERTY_IMAGES = [
  SAVED_IMAGES.maplewood,
  SAVED_IMAGES.serene,
  SAVED_IMAGES.willow,
  { uri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' },
  { uri: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop' },
  { uri: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop' },
  { uri: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop' },
  { uri: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop' },
  { uri: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop' },
  { uri: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200&auto=format&fit=crop' },
  { uri: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop' },
];


const GALLERY_FALLBACK_URLS = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
];

export const resolveImageUrl = (url?: string, identifier?: string | number): string => {
  if (url && (url.startsWith('http://') || url.startsWith('https://')) && !url.includes('.svg')) {
    return url;
  }

  const num = typeof identifier === 'string'
    ? parseInt(identifier.replace(/\D/g, ''), 10) || 0
    : typeof identifier === 'number'
    ? identifier
    : 0;

  return GALLERY_FALLBACK_URLS[num % GALLERY_FALLBACK_URLS.length];
};

export const getPropertyImageSource = (
  property?: { id?: string; photos?: Photo[] } | null,
  photoIndex: number = 0
) => {
  if (!property) {
    return CURATED_PROPERTY_IMAGES[0];
  }

  const id = property.id || '';
  const num = parseInt(id.replace(/\D/g, ''), 10) || 1;
  const imageIndex = (num - 1 + photoIndex) % CURATED_PROPERTY_IMAGES.length;

  return CURATED_PROPERTY_IMAGES[imageIndex];
};

export const getPropertyPhotoGallery = (
  property?: { id?: string; photos?: Photo[] } | null
): any[] => {
  if (!property) {
    return [CURATED_PROPERTY_IMAGES[0], ...GALLERY_FALLBACK_URLS.slice(1, 8)];
  }

  const id = property.id || '';
  const num = parseInt(id.replace(/\D/g, ''), 10) || 1;
  const mainImage = CURATED_PROPERTY_IMAGES[(num - 1) % CURATED_PROPERTY_IMAGES.length];

  return [
    mainImage,
    { uri: GALLERY_FALLBACK_URLS[1] },
    { uri: GALLERY_FALLBACK_URLS[2] },
    { uri: GALLERY_FALLBACK_URLS[3] },
    { uri: GALLERY_FALLBACK_URLS[4] },
    { uri: GALLERY_FALLBACK_URLS[5] },
    { uri: GALLERY_FALLBACK_URLS[6] },
    { uri: GALLERY_FALLBACK_URLS[7] },
  ];
};
