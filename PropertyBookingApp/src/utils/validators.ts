import { BookingFormData, BookingFormErrors } from '../types/booking';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^\d{7,15}$/.test(cleaned);
};

export const validateRequired = (value?: string): boolean => {
  return typeof value === 'string' && value.trim().length > 0;
};

export const validateFutureDate = (dateString: string): boolean => {
  if (!dateString) return false;
  let selectedDate = new Date(dateString);

  if (isNaN(selectedDate.getTime())) {
    const parts = dateString.trim().split(/[\s-]+/);
    if (parts.length === 3) {
      const monthMap: Record<string, number> = {
        jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
        jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
      };
      const mIdx = monthMap[parts[1].toLowerCase().slice(0, 3)];
      if (mIdx !== undefined) {
        selectedDate = new Date(Number(parts[2]), mIdx, Number(parts[0]));
      }
    }
  }

  if (isNaN(selectedDate.getTime())) {
    return true;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  return selectedDate.getTime() >= today.getTime();
};

export const validateBookingForm = (data: BookingFormData): {
  isValid: boolean;
  errors: BookingFormErrors;
} => {
  const errors: BookingFormErrors = {};

  if (!validateRequired(data.visitorName)) {
    errors.visitorName = 'Full name is required';
  } else if (data.visitorName.trim().length < 2) {
    errors.visitorName = 'Please enter a valid name';
  }

  if (!validateRequired(data.email)) {
    errors.email = 'Email address is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validateRequired(data.contactNumber)) {
    errors.contactNumber = 'Contact number is required';
  } else if (!validatePhone(data.contactNumber)) {
    errors.contactNumber = 'Please enter a valid 10-digit phone number';
  }

  if (!validateRequired(data.preferredDate)) {
    errors.preferredDate = 'Visit date is required';
  } else if (!validateFutureDate(data.preferredDate)) {
    errors.preferredDate = 'Selected date cannot be in the past';
  }

  if (!validateRequired(data.preferredTimeSlot)) {
    errors.preferredTimeSlot = 'Please select a preferred time slot';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
