import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import hotelConfig from '../../config/hotelConfig';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    
    // If on homepage, scroll to booking section
    if (location.pathname === '/') {
      const bookingSection = document.getElementById('booking-section');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on homepage, navigate to homepage
      navigate('/');
    }
    
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          {hotelConfig.name.toUpperCase()}
        </Link>
        
        <div className="navbar-currency">
          <LanguageSelector />
          <CurrencySelector />
          <ThemeToggle />
        </div>
        
        <button className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li className="navbar-dropdown">
            <span>Accommodation</span>
            <ul className="dropdown-menu">
              <li><Link to="/rooms">Rooms</Link></li>
              <li><Link to="/amenities">Amenities</Link></li>
              <li><Link to="/offers">Offers</Link></li>
            </ul>
          </li>
          <li className="navbar-dropdown">
            <span>Experiences</span>
            <ul className="dropdown-menu">
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/dining">Dining</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </li>
          <li className="navbar-dropdown">
            <span>Guest Services</span>
            <ul className="dropdown-menu">
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </li>
          <li className="navbar-dropdown">
            <span>Info</span>
            <ul className="dropdown-menu">
              <li><Link to="/location">Location</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </li>
          <li><Link to="/admin">Admin</Link></li>
          <li><a href="/" onClick={handleBookNow} className="book-btn">Book Now</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
