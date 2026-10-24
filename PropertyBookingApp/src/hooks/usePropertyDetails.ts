import { useState, useEffect, useCallback } from 'react';
import { Property, Photo } from '../types/property';
import { getPropertyDetails, getPropertyPhotos } from '../services/api/propertyApi';
import { ApiError } from '../types/api';

export const usePropertyDetails = (propertyId: string, initialProperty?: Property) => {
  const [property, setProperty] = useState<Property | null>(initialProperty || null);
  const [photos, setPhotos] = useState<Photo[]>(initialProperty?.photos || []);
  const [loading, setLoading] = useState<boolean>(!initialProperty);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = useCallback(async () => {
    if (!propertyId) return;

    setLoading(true);
    setError(null);

    try {
      const [detailsData, photosData] = await Promise.allSettled([
        getPropertyDetails(propertyId),
        getPropertyPhotos(propertyId),
      ]);

      if (detailsData.status === 'fulfilled') {
        const fetchedProperty = detailsData.value;
        setProperty(fetchedProperty);

        if (photosData.status === 'fulfilled' && photosData.value.length > 0) {
          setPhotos(photosData.value);
        } else if (fetchedProperty.photos && fetchedProperty.photos.length > 0) {
          setPhotos(fetchedProperty.photos);
        }
      } else if (!initialProperty) {
        throw detailsData.reason;
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError?.message || 'Unable to load property details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [propertyId, initialProperty]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const retry = useCallback(() => {
    fetchDetails();
  }, [fetchDetails]);

  return {
    property,
    photos,
    loading,
    error,
    retry,
  };
};
