import hotelConfig from '../../config/hotelConfig';
import './LocalAttractions.css';

const LocalAttractions = () => {
  const { contact, nearbyAttractions } = hotelConfig;

  const attractions = [
    {
      id: 1,
      name: 'Julius Nyerere International Airport',
      category: 'Airport',
      distance: '15 km',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400',
      description: 'Main international airport serving Dar es Salaam',
      rating: 4.2
    },
    {
      id: 2,
      name: 'Village Museum',
      category: 'Cultural',
      distance: '8 km',
      image: 'https://images.unsplash.com/photo-1568736333610-eae6e0ab9202?w=400',
      description: 'Open-air museum showcasing Tanzanian cultures and traditions',
      rating: 4.5
    },
    {
      id: 3,
      name: 'Makuti Mosque',
      category: 'Historical',
      distance: '3 km',
      image: 'https://images.unsplash.com/photo-1568736333610-eae6e0ab9202?w=400',
      description: 'Historic mosque with beautiful architecture',
      rating: 4.3
    },
    {
      id: 4,
      name: 'Slipway Shopping Center',
      category: 'Shopping',
      distance: '5 km',
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400',
      description: 'Waterfront shopping complex with restaurants and boutiques',
      rating: 4.1
    },
    {
      id: 5,
      name: 'Coconut Beach',
      category: 'Beach',
      distance: '7 km',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      description: 'Popular beach for relaxation and water activities',
      rating: 4.4
    },
    {
      id: 6,
      name: 'Askari Monument',
      category: 'Historical',
      distance: '2 km',
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400',
      description: 'Historic monument commemorating WWI soldiers',
      rating: 4.0
    }
  ];

  const categories = ['All', 'Airport', 'Cultural', 'Historical', 'Shopping', 'Beach'];

  return (
    <section className="attractions-section" id="attractions">
      <div className="container">
        <h2 className="section-title">Explore Local Attractions</h2>
        <p className="section-subtitle">Discover the best of {contact.city}</p>

        <div className="attractions-grid">
          {attractions.map(attraction => (
            <div key={attraction.id} className="attraction-card">
              <div className="attraction-image">
                <img src={attraction.image} alt={attraction.name} />
                <span className="category-badge">{attraction.category}</span>
              </div>
              <div className="attraction-content">
                <div className="attraction-header">
                  <h3>{attraction.name}</h3>
                  <div className="rating">
                    <span className="stars">⭐</span>
                    <span>{attraction.rating}</span>
                  </div>
                </div>
                <p className="description">{attraction.description}</p>
                <div className="attraction-footer">
                  <span className="distance">📍 {attraction.distance} from hotel</span>
                  <button className="directions-btn">Directions</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="attractions-map">
          <h3>View on Map</h3>
          <div className="map-placeholder">
            <span>🗺️ Interactive Map</span>
            <p>View all attractions on Google Maps</p>
            <a 
              href={`https://maps.google.com/?q=${contact.address},${contact.city},${contact.country}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalAttractions;
