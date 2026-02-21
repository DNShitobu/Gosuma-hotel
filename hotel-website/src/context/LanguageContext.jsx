/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Navigation
    home: 'Home',
    rooms: 'Rooms',
    amenities: 'Amenities',
    offers: 'Offers',
    events: 'Events',
    dining: 'Dining',
    services: 'Services',
    faq: 'FAQ',
    location: 'Location',
    contact: 'Contact',
    admin: 'Admin',
    bookNow: 'Book Now',
    
    // Hero
    welcomeTo: 'Welcome to Airport View Hotel',
    blendOfSerenity: 'A blend of Cosmopolitan Serenity',
    bookYourStay: 'Book Your Stay',
    
    // Booking
    checkIn: 'Check In',
    checkOut: 'Check Out',
    guests: 'Guests',
    selectRoom: 'Select Room',
    guestDetails: 'Guest Details',
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    specialRequests: 'Special Requests',
    confirmBooking: 'Confirm Booking',
    bookingConfirmed: 'Booking Confirmed!',
    bookingId: 'Booking ID',
    
    // Rooms
    ourRooms: 'Our Rooms',
    findComfort: 'Find Comfort in our Rooms',
    roomsAvailable: 'available',
    soldOut: 'Sold out',
    
    // Reviews
    guestReviews: 'Guest Reviews',
    shareExperience: 'Share Your Experience',
    valueFeedback: 'We value your feedback',
    submitReview: 'Submit Review',
    
    // Footer
    usefulLinks: 'Useful Links',
    findOutMore: 'Find Out More',
    contactUs: 'Contact Us',
    followUs: 'Follow Us',
  },
  fr: {
    // Navigation
    home: 'Accueil',
    rooms: 'Chambres',
    amenities: 'Équipements',
    offers: 'Offres',
    events: 'Événements',
    dining: 'Restauration',
    services: 'Services',
    faq: 'FAQ',
    location: 'Emplacement',
    contact: 'Contact',
    admin: 'Admin',
    bookNow: 'Réserver',
    
    // Hero
    welcomeTo: 'Bienvenue à l\'Airport View Hotel',
    blendOfSerenity: 'Un mélange de sérénité cosmopolite',
    bookYourStay: 'Réserver votre séjour',
    
    // Booking
    checkIn: 'Arrivée',
    checkOut: 'Départ',
    guests: 'Voyageurs',
    selectRoom: 'Sélectionner une chambre',
    guestDetails: 'Coordonnées',
    fullName: 'Nom complet',
    email: 'Adresse email',
    phone: 'Téléphone',
    specialRequests: 'Demandes spéciales',
    confirmBooking: 'Confirmer',
    bookingConfirmed: 'Réservation confirmée!',
    bookingId: 'N° de réservation',
    
    // Rooms
    ourRooms: 'Nos chambres',
    findComfort: 'Trouvez votre confort',
    roomsAvailable: 'disponible',
    soldOut: 'Complet',
    
    // Reviews
    guestReviews: 'Avis clients',
    shareExperience: 'Partagez votre expérience',
    valueFeedback: 'Vos retours nous aident à nous améliorer',
    submitReview: 'Soumettre',
    
    // Footer
    usefulLinks: 'Liens utiles',
    findOutMore: 'En savoir plus',
    contactUs: 'Nous contacter',
    followUs: 'Suivez-nous',
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
