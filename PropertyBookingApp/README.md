# Perfect Space — Real Estate Property Listing & Booking App

A React Native CLI mobile application built with TypeScript, featuring real property data, photo gallery inspection, filterable listing feeds, and a simulated visit booking flow. Designed with a minimal aesthetic based on the provided UI design mockup and assignment specification.

---

## 📱 Features

- **Discover & Listing Feed (Screen 1)**:
  - 100% live data fetching from `GET https://fakeapifordevs.vercel.app/api/realestate/listings?page=1&per_page=10` with pagination and pull-to-refresh.
  - Search by property location, city, and property type.
  - Category filtering matching actual API property types (*All, Single Family, Condo, Townhome, Apartment, Multi Family, Land*).
  - Dynamic property cards displaying SVG thumbnails from the API, type badges, price with currency ($/USD), address, bed/bath/sqft specs, and favorite toggles.
  - Comprehensive states: loading indicators, network error handling with retry CTA, and empty search results.

- **Property Details & Gallery (Screen 2)**:
  - Selected property details fetched from `GET /api/realestate/listings/{id}` and high-res photos from `GET /api/realestate/listings/{id}/photos`.
  - Paged photo gallery with index counter badge (`1/5`) and live captions from the API (*"Front exterior"*, *"Living room"*, etc.).
  - Top action controls: back navigation, favorite heart toggle, and share action.
  - Spec grid highlighting beds, baths, sqft, and property type directly from the API.
  - Full property description from the API with expandable text (*"Read more →"* / *"Read less ↑"*).
  - Real amenities grid mapped directly from the property's `features` array (*garage, fireplace, balcony, solar_panels*, etc.).
  - Listing Agent card displaying agent name, email, and phone from `property.agent`.
  - Sticky bottom action bar with *"Book a Visit →"* call-to-action.

- **Book a Visit (Screen 3)**:
  - Selected API property summary card (title, location, price, and thumbnail).
  - Complete scheduling form:
    - **Visitor Full Name** (required, min 2 chars)
    - **Email Address** (required, strict email regex validation)
    - **Contact Number** with country code selector (default `+91`, supports `+1`, `+44`, etc.)
    - **Preferred Visit Date** with past-date prevention and quick date selection chips (*Today*, *Tomorrow*, *In 2 Days*, *Next Week*)
    - **Preferred Time Slot** selector dropdown (*10:00 AM - 11:00 AM*, *11:30 AM - 12:30 PM*, etc.)
  - Real-time inline field validation and duplicate submission prevention (`isSubmitting` lock).

- **Booking Confirmation (Screen 4)**:
  - Status hero illustration and confirmation header.
  - Selected API property summary card.
  - Visitor details breakdown card with name, email, phone, date, and time slot.
  - Note: *"This is a simulated booking request. No actual appointment has been reserved yet."* as specified by the PDF.
  - Navigation actions: *"Back to Home"* and *"View My Requests"*.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React Native CLI (`0.88.x`)
- **Language**: TypeScript (`v6.x`)
- **Navigation**: React Navigation (`@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`)
- **Networking**: Axios with centralized request/response interceptors and typed error envelopes
- **Icons & Graphics**: `react-native-svg`
- **Design System**: Modular theme tokens (`colors.ts`, `typography.ts`, `spacing.ts`, `shadows.ts`)

---

## 📂 Project Structure

```text
src/
├── assets/
│   ├── fonts/                   # Fraunces (Serif) & Outfit (Sans-Serif)
│   ├── icons/                   # Vector assets
│   └── images/                  # Fallback & illustration assets
│
├── components/
│   ├── common/                  # Shared atomic UI components
│   │   ├── Badge.tsx            # Tag badges (glass, primary, outline)
│   │   ├── CustomButton.tsx     # Primary, secondary, outline, arrow buttons
│   │   ├── ErrorState.tsx       # Error view with retry CTA
│   │   ├── FormField.tsx        # Input with label, icons & error display
│   │   ├── Icons.tsx            # Sharp SVG icons (Bed, Bath, Sqft, Pin, etc.)
│   │   ├── LoadingIndicator.tsx # Activity spinner & status message
│   │   └── index.ts
│   │
│   ├── property/                # Domain-specific property components
│   │   ├── AmenityItem.tsx      # Amenity icon card
│   │   ├── PhotoGallery.tsx     # Paged hero carousel with counter pill
│   │   ├── PropertyCard.tsx     # Feed card with specs and arrow action
│   │   ├── PropertySpecGrid.tsx # 4-box spec grid (beds, baths, sqft, type)
│   │   ├── PropertySummaryCard.tsx # Compact thumbnail & info card
│   │   └── index.ts
│   │
│   └── booking/                 # Booking form components
│       ├── BookingForm.tsx      # Form fields, quick dates & time picker modal
│       └── index.ts
│
├── constants/
│   ├── config.ts                # Base URLs, time slots, country codes, fallbacks
│   └── index.ts
│
├── hooks/
│   ├── useBookingForm.ts        # Form state, validation & duplicate prevention
│   ├── usePropertyDetails.ts    # Fetch single property & photo gallery
│   ├── usePropertyListings.ts   # Fetch listings, pagination & pull-to-refresh
│   └── index.ts
│
├── navigation/
│   ├── AppNavigator.tsx         # Root Native Stack Navigator
│   ├── BottomTabNavigator.tsx   # Bottom tabs (Discover, Saved, Visits, Profile)
│   ├── types.ts                 # Route params & screen props
│   └── index.ts
│
├── screens/
│   ├── listing/
│   │   └── PropertyListingScreen.tsx  # Screen 1: Discover / Feed
│   ├── details/
│   │   └── PropertyDetailsScreen.tsx  # Screen 2: Property Details
│   ├── booking/
│   │   └── BookVisitScreen.tsx        # Screen 3: Book a Visit
│   └── confirmation/
│       └── BookingConfirmationScreen.tsx # Screen 4: Confirmation
│
├── services/
│   ├── api/
│   │   ├── apiClient.ts         # Axios client instance & error interceptor
│   │   ├── endpoints.ts         # Endpoint URL builders
│   │   └── propertyApi.ts       # Service methods (listings, details, photos, booking)
│   └── index.ts
│
├── theme/
│   ├── colors.ts                # Warm off-white, forest green, sage, charcoal
│   ├── shadows.ts               # Elevation tokens for cards, buttons, modals
│   ├── spacing.ts               # Margin, padding, and border radius tokens
│   ├── typography.ts            # Fraunces & Outfit font styles
│   └── index.ts
│
├── types/                       # TypeScript interfaces
│   ├── api.ts                   # ApiResponse, ApiError, QueryOptions
│   ├── booking.ts               # BookingFormData, BookingConfirmation
│   ├── navigation.ts            # Stack & Tab ParamLists, ScreenProps
│   ├── property.ts              # Property, Photo, Agent, Pagination
│   └── index.ts
│
├── utils/                       # Pure utility functions
│   ├── formatters.ts            # Currency (INR / USD), sqft, beds, baths, date
│   ├── imageHelper.ts           # Relative URL resolver & curated fallbacks
│   ├── validators.ts            # Email regex, phone, required & future date
│   └── index.ts
│
└── App.tsx                      # Root application entry component
```

---

## 🌐 API Endpoints Used

| Endpoint | Method | Purpose |
| :--- | :---: | :--- |
| `/api/realestate/listings?page=1&per_page=10` | `GET` | Paginated property listings |
| `/api/realestate/listings/{id}` | `GET` | Detailed information for a single property |
| `/api/realestate/listings/{id}/photos` | `GET` | High-res photo gallery for selected property |

---

## 🎨 Theme & Typography

### Color Palette
- **Background**: `#FAF9F6` (Warm Off-White)
- **Cards**: `#FFFFFF` (White)
- **Primary Buttons / CTA**: `#264E36` (Forest Green)
- **Secondary Accents**: `#A3B18A` (Sage Green)
- **Primary Text**: `#252823` (Charcoal)
- **Secondary Text**: `#777B75` (Muted Gray)
- **Borders**: `#E7E7E2` (Light Gray)
- **Accent**: `#E9DFC8` (Soft Sand)
- **Success**: `#E4F0E5` (Soft Green)
- **Error**: `#FCE8E6` (Soft Red)

### Google Fonts Integration
- **Fraunces**: Headings, property titles, prices (`https://fonts.google.com/specimen/Fraunces`)
- **Outfit**: Body text, descriptions, buttons, forms (`https://fonts.google.com/specimen/Outfit`)
- Configured in `react-native.config.js` with assets path pointing to `src/assets/fonts/`.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `>= 22`
- Android Studio / Android SDK configured (`ANDROID_HOME`)
- Xcode (for iOS on macOS)

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Android
```bash
npm run android
```

### 4. Run iOS (macOS only)
```bash
cd ios && pod install && cd ..
npm run ios
```

---

## 💡 Assumptions & Edge Cases Handled

1. **Relative Image & SVG URLs**:
   The fakeapifordevs API returns relative SVG image URLs (e.g. `/placeholder.svg?height=600&width=900...`). The `PropertyImage` component detects `.svg` extensions and renders them with `react-native-svg`'s `<SvgUri>`, automatically prefixing `https://fakeapifordevs.vercel.app`.
2. **100% Dynamic Data**:
   All listing cards, detailed descriptions, photo galleries, captions, amenities, and listing agent contact details are fetched dynamically using the endpoints in the assignment PDF without hardcoding mock property data.
3. **Frontend-Only Simulated Booking**:
   As required by Section 4 (Screen 4) of the assignment PDF, visit booking is simulated on the frontend with a 1.2-second network feedback delay and displays an explicit note indicating no actual appointment was reserved.
4. **Form Validation & Duplicate Prevention**:
   The form verifies required fields, validates RFC 5322-compliant email formats, verifies contact numbers, and checks for past dates. The `useBookingForm` hook maintains an `isSubmitting` lock that disables the button during in-flight submissions to prevent duplicate requests.
