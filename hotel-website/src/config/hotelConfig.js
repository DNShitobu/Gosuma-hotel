const hotelConfig = {
  name: 'Gosuma Hotel',
  tagline: 'Your Home Away From Home',
  description: 'Experience comfort and luxury at Gosuma Hotel - Your premier destination for business and leisure travelers in Dar es Salaam. We offer world-class hospitality with elegantly furnished rooms, exceptional dining options, and state-of-the-art conference facilities.',
  
  contact: {
    phone: '+255 700 123 456',
    whatsapp: '+255 700 123 456',
    email: 'reservations@gosumahotel.com',
    address: 'Gosuma Street, CBD',
    city: 'Dar es Salaam',
    country: 'Tanzania',
    zipCode: '',
    website: 'www.gosumahotel.com'
  },

  social: {
    facebook: 'https://facebook.com/gosumahotel',
    instagram: 'https://instagram.com/gosumahotel',
    twitter: 'https://twitter.com/gosumahotel',
    tripAdvisor: ''
  },

  settings: {
    currency: 'TZS',
    currencySymbol: 'TSh',
    languages: ['en', 'sw'],
    defaultLanguage: 'en',
    timeZone: 'Africa/Dar_es_Salaam',
    checkInTime: '14:00',
    checkOutTime: '11:00'
  },

  booking: {
    confirmationEmail: true,
    requireDeposit: false,
    depositPercentage: 0,
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in. Late cancellation may incur a one-night charge.',
    maxNights: 30,
    maxGuestsPerRoom: 4,
    childPolicy: 'Children under 12 stay free. Extra bed available on request.',
    petPolicy: 'Pets not allowed'
  },

  stripe: {
    testMode: true,
    publishableKey: 'pk_test_placeholder',
    secretKey: 'sk_test_placeholder',
    webhookSecret: 'whsec_placeholder'
  },

  admin: {
    username: 'admin',
    password: 'gosuma2024!',
    email: 'admin@gosumahotel.com'
  },

  features: {
    wifi: { name: 'Free WiFi', available: true },
    pool: { name: 'Swimming Pool', available: true },
    gym: { name: 'Fitness Center', available: true },
    spa: { name: 'Spa & Wellness', available: true },
    restaurant: { name: 'Restaurant', available: true },
    parking: { name: 'Free Parking', available: true },
    roomService: { name: '24/7 Room Service', available: true },
    conference: { name: 'Conference Facilities', available: true },
    airportTransfer: { name: 'Airport Transfer', available: true },
    laundry: { name: 'Laundry Service', available: true },
    concierge: { name: 'Concierge', available: true },
    business: { name: 'Business Center', available: true }
  },

  roomTypes: [
    { 
      id: 1, 
      name: 'Standard Room', 
      basePrice: 150000,
      description: 'Comfortable room with all essential amenities for a pleasant stay.',
      capacity: 2,
      bedType: 'Queen Bed',
      size: '25 sqm',
      amenities: ['Free WiFi', 'Smart TV', 'Air Conditioning', 'Safe', 'Mini Bar', 'Coffee Maker', 'Work Desk']
    },
    { 
      id: 2, 
      name: 'Deluxe Room', 
      basePrice: 250000,
      description: 'Spacious room with enhanced amenities and city view.',
      capacity: 3,
      bedType: 'King Bed',
      size: '35 sqm',
      amenities: ['Free WiFi', 'Smart TV', 'Air Conditioning', 'Safe', 'Mini Bar', 'Coffee Maker', 'Work Desk', 'Seating Area', 'City View']
    },
    { 
      id: 3, 
      name: 'Suite', 
      basePrice: 400000,
      description: 'Luxurious suite with separate living area and premium amenities.',
      capacity: 4,
      bedType: 'King Bed',
      size: '55 sqm',
      amenities: ['Free WiFi', 'Smart TV', 'Air Conditioning', 'Safe', 'Mini Bar', 'Coffee Maker', 'Work Desk', 'Seating Area', 'City View', 'Living Room', 'Bathrobe', 'Slippers']
    },
    { 
      id: 4, 
      name: 'Executive Suite', 
      basePrice: 600000,
      description: 'Top-floor suite with panoramic views and exclusive executive benefits.',
      capacity: 4,
      bedType: 'King Bed',
      size: '75 sqm',
      amenities: ['Free WiFi', 'Smart TV', 'Air Conditioning', 'Safe', 'Mini Bar', 'Coffee Maker', 'Work Desk', 'Seating Area', 'City View', 'Living Room', 'Dining Area', 'Bathrobe', 'Slippers', 'Jacuzzi', 'Butler Service']
    }
  ],

  restaurants: [
    {
      id: 1,
      name: 'The Golden Palm',
      cuisine: 'International & Local',
      hours: '6:30 AM - 10:30 PM',
      description: 'Our signature restaurant offering diverse cuisine from Tanzanian specialties to international favorites.',
      capacity: 120
    },
    {
      id: 2,
      name: 'Sky Lounge',
      cuisine: 'Cocktails & Snacks',
      hours: '5:00 PM - 12:00 AM',
      description: 'Rooftop lounge with stunning city views, perfect for evening relaxation.',
      capacity: 50
    },
    {
      id: 3,
      name: 'Pool Bar',
      cuisine: 'Light Bites & Beverages',
      hours: '10:00 AM - 7:00 PM',
      description: 'Refreshments by the poolside.',
      capacity: 30
    }
  ],

  conferenceVenues: [
    {
      id: 1,
      name: 'Grand Ballroom',
      capacity: 300,
      size: '500 sqm',
      rate: 2500000
    },
    {
      id: 2,
      name: 'Executive Boardroom',
      capacity: 20,
      size: '50 sqm',
      rate: 500000
    },
    {
      id: 3,
      name: 'Conference Room A',
      capacity: 50,
      size: '80 sqm',
      rate: 800000
    },
    {
      id: 4,
      name: 'Conference Room B',
      capacity: 30,
      size: '60 sqm',
      rate: 600000
    }
  ],

  nearbyAttractions: [
    { name: 'Julius Nyerere International Airport', distance: '15 km', type: 'Airport' },
    { name: 'Village Museum', distance: '8 km', type: 'Cultural' },
    { name: 'Makuti Mosque', distance: '3 km', type: 'Historical' },
    { name: 'Askari Monument', distance: '2 km', type: 'Historical' },
    { name: 'Slipway Shopping Center', distance: '5 km', type: 'Shopping' },
    { name: 'Coconut Beach', distance: '7 km', type: 'Beach' }
  ]
};

export default hotelConfig;
