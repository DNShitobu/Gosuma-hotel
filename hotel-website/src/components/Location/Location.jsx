import hotelConfig from '../../config/hotelConfig';
import './Location.css';

const Location = () => {
  const { name, contact } = hotelConfig;

  return (
    <section className="location" id="location">
      <div className="container">
        <h2 className="section-title">Our Location</h2>
        <p className="section-subtitle">Find us easily in {contact.city}</p>
        
        <div className="location-content">
          <div className="location-info">
            <div className="info-card">
              <h3>{name}</h3>
              <p>{contact.address}</p>
              <p>{contact.city}, {contact.country}</p>
            </div>
            
            <div className="info-card">
              <h4>Contact</h4>
              <ul>
                <li>📞 {contact.phone}</li>
                <li>✉️ {contact.email}</li>
                <li>🌐 {contact.website}</li>
              </ul>
            </div>
            
            <div className="info-card">
              <h4>Getting Here</h4>
              <p>From Airport: Approximately 30 minutes to city center.</p>
              <p>Airport transfer available upon request.</p>
            </div>
          </div>
          
          <div className="map-container">
            <div className="map-placeholder">
              <span>🗺️</span>
              <p>Map View</p>
              <small>{contact.address}, {contact.city}, {contact.country}</small>
              <a 
                href={`https://maps.google.com/?q=${contact.address},${contact.city},${contact.country}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-directions"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
