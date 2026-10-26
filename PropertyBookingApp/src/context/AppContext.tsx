import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Property } from '../types/property';
import { BookingConfirmation } from '../types/booking';
import { ScheduledVisit } from '../types/visit';
import { formatPrice } from '../utils/formatters';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

export interface AppContextType {
  savedProperties: Property[];
  isSaved: (propertyId: string) => boolean;
  toggleSave: (property: Property) => boolean;
  removeSaved: (propertyId: string) => void;
  bookedVisits: ScheduledVisit[];
  addBookedVisit: (confirmation: BookingConfirmation) => void;
  cancelVisit: (visitId: string) => void;
  rescheduleVisit: (visitId: string, day: string, month: string, timeSlot: string) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [bookedVisits, setBookedVisits] = useState<ScheduledVisit[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Aman Sagar',
    email: 'aman@example.com',
    phone: '+91 98765 43210',
  });

  const isSaved = useCallback(
    (propertyId: string): boolean => {
      return savedProperties.some(p => p.id === propertyId);
    },
    [savedProperties]
  );

  const toggleSave = useCallback(
    (property: Property): boolean => {
      let isNowSaved = false;
      setSavedProperties(prev => {
        const exists = prev.some(p => p.id === property.id);
        if (exists) {
          isNowSaved = false;
          return prev.filter(p => p.id !== property.id);
        } else {
          isNowSaved = true;
          return [property, ...prev];
        }
      });
      return isNowSaved;
    },
    []
  );

  const removeSaved = useCallback((propertyId: string) => {
    setSavedProperties(prev => prev.filter(p => p.id !== propertyId));
  }, []);

  const addBookedVisit = useCallback((confirmation: BookingConfirmation) => {
    const rawDate = confirmation.visitor.preferredDate.trim();
    let day = '26';
    let month = 'OCT';
    let year = '2026';

    const parts = rawDate.split(/[\s-]+/);
    if (parts.length >= 3) {
      if (isNaN(Number(parts[0]))) {
        month = parts[0].slice(0, 3).toUpperCase();
        day = parts[1];
        year = parts[2];
      } else {
        day = parts[0];
        month = parts[1].slice(0, 3).toUpperCase();
        year = parts[2];
      }
    }

    const agentInfo = confirmation.property.agent || {
      id: 'agent_01',
      name: 'Sarah Mitchell',
      phone: '+1-555-0142',
      email: 'sarah.mitchell@northstarrealty.com',
      role: 'Listing Agent',
    };

    const newVisit: ScheduledVisit = {
      id: confirmation.bookingId,
      bookingReference: confirmation.bookingId,
      property: {
        id: confirmation.property.id,
        address: confirmation.property.address,
        city: confirmation.property.city || '',
        state: confirmation.property.state || '',
        zipcode: '',
        type: 'sale',
        property_type: confirmation.property.property_type,
        price: confirmation.property.price,
        beds: confirmation.property.beds ?? 2,
        baths: confirmation.property.baths ?? 2,
        sqft: confirmation.property.sqft ?? 850,
        status: 'active',
        description: 'A charming residence in prime location.',
        photos: confirmation.property.imageUrl
          ? [{ url: confirmation.property.imageUrl, caption: 'Exterior' }]
          : [],
        agent: confirmation.property.agent,
        currency: confirmation.property.currency,
      },
      title: confirmation.property.address
        ? confirmation.property.address.split(',')[0]
        : 'Property Visit',
      location:
        confirmation.property.city && confirmation.property.state
          ? `${confirmation.property.city}, ${confirmation.property.state}`
          : confirmation.property.address,
      priceDisplay: formatPrice(
        confirmation.property.price,
        confirmation.property.currency || 'USD'
      ),
      beds: confirmation.property.beds ?? 2,
      baths: confirmation.property.baths ?? 2,
      sqftDisplay: `${confirmation.property.sqft ?? 850} sqft`,
      day,
      month,
      year,
      timeSlot: confirmation.visitor.preferredTimeSlot,
      status: 'upcoming',
      localImage: null,
      agent: {
        id: agentInfo.id || 'agent_01',
        name: agentInfo.name,
        phone: agentInfo.phone,
        email: agentInfo.email,
        role: 'Listing Agent',
      },
      meetingLocation: confirmation.property.address,
      createdAt: new Date().toISOString(),
    };

    setBookedVisits(prev => [newVisit, ...prev]);
  }, []);

  const cancelVisit = useCallback((visitId: string) => {
    setBookedVisits(prev =>
      prev.map(v => (v.id === visitId ? { ...v, status: 'cancelled' as const } : v))
    );
  }, []);

  const rescheduleVisit = useCallback(
    (visitId: string, day: string, month: string, timeSlot: string) => {
      setBookedVisits(prev =>
        prev.map(v =>
          v.id === visitId
            ? { ...v, day, month, timeSlot, status: 'upcoming' as const }
            : v
        )
      );
    },
    []
  );

  const updateUserProfile = useCallback((profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        savedProperties,
        isSaved,
        toggleSave,
        removeSaved,
        bookedVisits,
        addBookedVisit,
        cancelVisit,
        rescheduleVisit,
        userProfile,
        updateUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
