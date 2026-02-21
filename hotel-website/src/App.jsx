import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LiveChat from './components/LiveChat/LiveChat';
import AvailabilityNotification from './components/AvailabilityNotification/AvailabilityNotification';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Page imports
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import AmenitiesPage from './pages/AmenitiesPage';
import OffersPage from './pages/OffersPage';
import EventsPage from './pages/EventsPage';
import DiningPage from './pages/DiningPage';
import ServicesPage from './pages/ServicesPage';
import FAQPage from './pages/FAQPage';
import LocationPage from './pages/LocationPage';
import ContactPage from './pages/ContactPage';
import ReviewsPage from './pages/ReviewsPage';
import GalleryPage from './pages/GalleryPage';
import AdminPage from './pages/AdminPage';

import './index.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CurrencyProvider>
          <LanguageProvider>
            <AuthProvider>
              <ErrorBoundary>
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/rooms" element={<RoomsPage />} />
                  <Route path="/amenities" element={<AmenitiesPage />} />
                  <Route path="/offers" element={<OffersPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/dining" element={<DiningPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/location" element={<LocationPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                </Routes>
                <Footer />
                <LiveChat />
                <AvailabilityNotification />
              </ErrorBoundary>
            </AuthProvider>
          </LanguageProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
