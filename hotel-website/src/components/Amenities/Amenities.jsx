import hotelConfig from '../../config/hotelConfig';
import './Amenities.css';

const Amenities = () => {
  const amenitiesList = [
    { icon: '🏊', title: 'Swimming Pool', desc: 'Relax in our temperature-controlled pool', key: 'pool' },
    { icon: '📶', title: 'Free WiFi', desc: 'High-speed internet throughout', key: 'wifi' },
    { icon: '🅿️', title: 'Free Parking', desc: 'Secure on-site parking', key: 'parking' },
    { icon: '🏋️', title: 'Fitness Center', desc: 'Fully equipped gym', key: 'gym' },
    { icon: '💆', title: 'Spa & Wellness', desc: 'Relaxation and wellness services', key: 'spa' },
    { icon: '✈️', title: 'Airport Transfer', desc: 'Pickup and drop-off services', key: 'airportTransfer' },
    { icon: '🍽️', title: 'Room Service', desc: '24-hour in-room dining', key: 'roomService' },
    { icon: '💼', title: 'Business Center', desc: 'Office services for travelers', key: 'business' },
    { icon: '🛎️', title: '24/7 Reception', desc: 'Round-the-clock guest services', key: 'concierge' },
    { icon: '🧹', title: 'Housekeeping', desc: 'Daily cleaning services', key: 'laundry' },
    { icon: '🔒', title: 'Security', desc: '24-hour security personnel', key: null },
    { icon: '🍳', title: 'Restaurant', desc: 'On-site dining options', key: 'restaurant' },
    { icon: '🏢', title: 'Conference Facilities', desc: 'Meeting rooms and event spaces', key: 'conference' },
    { icon: '🧺', title: 'Laundry', desc: 'Professional laundry services', key: 'laundry' },
  ];

  const availableAmenities = amenitiesList.filter(a => !a.key || hotelConfig.features[a.key]?.available);

  return (
    <section className="amenities" id="amenities">
      <div className="container">
        <h2 className="section-title">Hotel Amenities</h2>
        <p className="section-subtitle">Everything you need for a comfortable stay</p>
        
        <div className="amenities-grid">
          {availableAmenities.map((item, index) => (
            <div className="amenity-card" key={index}>
              <span className="amenity-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
