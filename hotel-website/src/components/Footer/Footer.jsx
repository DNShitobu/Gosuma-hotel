import hotelConfig from '../../config/hotelConfig';
import './Footer.css';

const Footer = () => {
  const { name, contact, social } = hotelConfig;

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>{name}</h3>
            <p>
              {hotelConfig.description}
            </p>
            <div className="social-links">
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
              )}
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
              )}
              {social.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</a>
              )}
            </div>
          </div>

          <div className="footer-section">
            <h3>Useful Links</h3>
            <ul>
              <li><a href="#rooms">Rooms</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#restaurants">Restaurants & Bars</a></li>
              <li><a href="#amenities">Leisure Facilities</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Find Out More</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#">Hotel Policies</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul className="contact-info">
              <li>{contact.address}</li>
              <li>{contact.city}, {contact.country}</li>
              <li>{contact.phone}</li>
              <li>{contact.whatsapp}</li>
              <li>{contact.email}</li>
              <li>{contact.website}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
