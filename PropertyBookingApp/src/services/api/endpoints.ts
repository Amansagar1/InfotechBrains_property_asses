import { APP_CONFIG } from '../../constants/config';

export const ENDPOINTS = {
  listings: (page: number = 1, perPage: number = APP_CONFIG.DEFAULT_PER_PAGE): string => {
    return `/listings?page=${page}&per_page=${perPage}`;
  },

  propertyDetails: (propertyId: string): string => {
    return `/listings/${encodeURIComponent(propertyId)}`;
  },

  propertyPhotos: (propertyId: string): string => {
    return `/listings/${encodeURIComponent(propertyId)}/photos`;
  },
} as const;
