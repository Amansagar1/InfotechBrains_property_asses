import { useState, useCallback } from 'react';
import { BookingFormData, BookingFormErrors, BookingConfirmation } from '../types/booking';
import { Property } from '../types/property';
import { validateBookingForm } from '../utils/validators';
import { submitVisitBooking } from '../services/api/propertyApi';
import { COUNTRY_CODES } from '../constants/config';

export const useBookingForm = (property: Property) => {
  const [formData, setFormData] = useState<BookingFormData>({
    visitorName: '',
    email: '',
    contactNumber: '',
    countryCode: COUNTRY_CODES[0].value,
    preferredDate: '',
    preferredTimeSlot: '',
  });

  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = useCallback((field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => {
      if (prev[field]) {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      }
      return prev;
    });
  }, []);

  const submit = useCallback(
    async (): Promise<BookingConfirmation | null> => {
      if (isSubmitting) return null;

      setSubmitError(null);

      const { isValid, errors: validationErrors } = validateBookingForm(formData);
      if (!isValid) {
        setErrors(validationErrors);
        return null;
      }

      setIsSubmitting(true);

      try {
        const confirmation = await submitVisitBooking(formData, property);
        return confirmation;
      } catch (err: any) {
        setSubmitError(err?.message || 'Failed to submit visit request. Please try again.');
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, property, isSubmitting]
  );

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    updateField,
    submit,
  };
};
