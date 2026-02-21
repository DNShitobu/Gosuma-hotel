import { CurrencyProvider } from './context/CurrencyContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Booking from './components/Booking/Booking';
import BookingCalendar from './components/BookingCalendar/BookingCalendar';
import About from './components/About/About';
import Rooms from './components/Rooms/Rooms';
import RoomModal from './components/RoomModal/RoomModal';
import RoomComparison from './components/RoomComparison/RoomComparison';
import Amenities from './components/Amenities/Amenities';
import Offers from './components/Offers/Offers';
import Events from './components/Events/Events';
import Restaurants from './components/Restaurants/Restaurants';
import Services from './components/Services/Services';
import Reviews from './components/Reviews/Reviews';
import GuestReview from './components/GuestReview/GuestReview';
import Gallery from './components/Gallery/Gallery';
import FAQ from './components/FAQ/FAQ';
import Location from './components/Location/Location';
import Admin from './components/Admin/Admin';
import Footer from './components/Footer/Footer';
import Newsletter from './components/Newsletter/Newsletter';
import ContactForm from './components/ContactForm/ContactForm';
import LiveChat from './components/LiveChat/LiveChat';
import PriceAlert from './components/PriceAlert/PriceAlert';
import AvailabilityNotification from './components/AvailabilityNotification/AvailabilityNotification';
import VirtualTour from './components/VirtualTour/VirtualTour';
import LoyaltyProgram from './components/LoyaltyProgram/LoyaltyProgram';
import PackageDeals from './components/PackageDeals/PackageDeals';
import WeatherWidget from './components/WeatherWidget/WeatherWidget';
import LocalAttractions from './components/LocalAttractions/LocalAttractions';
import Housekeeping from './components/Housekeeping/Housekeeping';
import POS from './components/POS/POS';
import GuestProfiles from './components/GuestProfiles/GuestProfiles';
import Reports from './components/Reports/Reports';
import Maintenance from './components/Maintenance/Maintenance';
import FrontDesk from './components/FrontDesk/FrontDesk';
import Conference from './components/Conference/Conference';
import NightAudit from './components/NightAudit/NightAudit';
import RoomService from './components/RoomService/RoomService';
import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [rooms, setRooms] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/rooms')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error('Error fetching rooms:', err));
  }, []);

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <LanguageProvider>
          <AuthProvider>
            <ErrorBoundary>
              <Navbar />
              <Hero />
              <Booking />
              <BookingCalendar />
              <About />
              <Rooms />
              <button 
                className="compare-rooms-btn"
                onClick={() => setShowComparison(true)}
                style={{
                  position: 'fixed',
                  bottom: '100px',
                  left: '30px',
                  padding: '15px 25px',
                  background: 'var(--primary)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  zIndex: 100,
                  boxShadow: '0 4px 15px rgba(75, 83, 32, 0.4)'
                }}
              >
                Compare Rooms
              </button>
              
              {showComparison && (
                <RoomComparison 
                  rooms={rooms} 
                  onClose={() => setShowComparison(false)} 
                />
              )}
              
              <RoomModal />
              <Amenities />
              <Offers />
              <Events />
              <Restaurants />
              <Services />
              <Reviews />
              <GuestReview />
              <Gallery />
              <VirtualTour />
              <PackageDeals />
              <LoyaltyProgram />
              <FAQ />
              <Location />
              <LocalAttractions />
              <WeatherWidget />
              <PriceAlert rooms={rooms} />
              <AvailabilityNotification rooms={rooms} />
              <Newsletter />
              <ContactForm />
              <RoomService />
              <FrontDesk />
              <Conference />
              <Housekeeping />
              <Maintenance />
              <POS />
              <GuestProfiles />
              <Reports />
              <NightAudit />
              <Admin />
              <Footer />
              <LiveChat />
            </ErrorBoundary>
          </AuthProvider>
        </LanguageProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
