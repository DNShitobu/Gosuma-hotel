import { useState } from 'react';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import hotelConfig from '../../config/hotelConfig';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          {hotelConfig.name.toUpperCase()}
        </a>
        
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
          <li><a href="#home">Home</a></li>
          <li><a href="#rooms">Rooms</a></li>
          <li><a href="#amenities">Amenities</a></li>
          <li><a href="#offers">Offers</a></li>
          <li><a href="#events">Events</a></li>
          <li><a href="#restaurants">Dining</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#location">Location</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#admin">Admin</a></li>
          <li><a href="#book" className="book-btn">Book Now</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
