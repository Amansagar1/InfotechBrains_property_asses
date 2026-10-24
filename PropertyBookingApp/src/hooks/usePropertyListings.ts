import { useState, useEffect, useCallback, useRef } from 'react';
import { Property, Pagination } from '../types/property';
import { getPropertyListings } from '../services/api/propertyApi';
import { ApiError } from '../types/api';
import { INITIAL_SAVED_PROPERTIES } from '../constants/savedProperties';

export const usePropertyListings = (initialPage: number = 1, perPage: number = 10) => {
  const [listings, setListings] = useState<Property[]>(INITIAL_SAVED_PROPERTIES);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const listingsRef = useRef(listings);
  listingsRef.current = listings;

  const fetchListings = useCallback(
    async (targetPage: number = 1, isRefresh: boolean = false) => {
      if (isRefresh) {
        setRefreshing(true);
      } else if (targetPage === 1 && listingsRef.current.length === 0) {
        setLoading(true);
      } else if (targetPage > 1) {
        setLoadingMore(true);
      }

      setError(null);

      try {
        const response = await getPropertyListings(targetPage, perPage);

        setListings(prev => {
          if (targetPage === 1 || isRefresh) {
            return response.data;
          }
          const existingIds = new Set(prev.map(p => p.id));
          const newUnique = response.data.filter(p => !existingIds.has(p.id));
          return [...prev, ...newUnique];
        });

        setPagination(response.pagination);
        setPage(targetPage);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError?.message || 'Failed to load properties. Please check your connection.');
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [perPage]
  );

  useEffect(() => {
    fetchListings(1);
  }, [fetchListings]);

  const onRefresh = useCallback(() => {
    fetchListings(1, true);
  }, [fetchListings]);

  const loadMore = useCallback(() => {
    if (loading || loadingMore || !pagination) return;
    if (pagination.page < pagination.totalPages) {
      fetchListings(pagination.page + 1);
    }
  }, [loading, loadingMore, pagination, fetchListings]);

  const retry = useCallback(() => {
    fetchListings(page);
  }, [fetchListings, page]);

  return {
    listings,
    loading,
    refreshing,
    loadingMore,
    error,
    pagination,
    onRefresh,
    loadMore,
    retry,
  };
};
