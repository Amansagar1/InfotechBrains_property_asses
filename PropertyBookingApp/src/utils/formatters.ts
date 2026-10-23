export const formatPrice = (price?: number, currency: string = 'USD'): string => {
  if (price === undefined || price === null || isNaN(price)) {
    return 'Price on request';
  }

  if (currency === 'INR') {
    if (price >= 10000000) {
      const cr = parseFloat((price / 10000000).toFixed(2));
      return `₹ ${cr} Cr`;
    }
    if (price > 0 && price < 100) {
      return `₹ ${price} Cr`;
    }
    if (price >= 100000) {
      const lakh = parseFloat((price / 100000).toFixed(2));
      return `₹ ${lakh} L`;
    }
    return `₹ ${price.toLocaleString('en-IN')}`;
  }

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `$${price.toLocaleString()}`;
  }
};

export const formatSqft = (sqft?: number): string => {
  if (!sqft) return 'Area N/A';
  return `${sqft.toLocaleString()} sqft`;
};

export const formatBeds = (beds?: number): string => {
  if (beds === undefined || beds === null) return 'N/A';
  return `${beds} ${beds === 1 ? 'Bed' : 'Beds'}`;
};

export const formatBaths = (baths?: number): string => {
  if (baths === undefined || baths === null) return 'N/A';
  return `${baths} ${baths === 1 ? 'Bath' : 'Baths'}`;
};

export const formatPropertyType = (type?: string): string => {
  if (!type) return 'Property';
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const formatDate = (dateInput?: string | Date): string => {
  if (!dateInput) return '';
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return String(dateInput);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
