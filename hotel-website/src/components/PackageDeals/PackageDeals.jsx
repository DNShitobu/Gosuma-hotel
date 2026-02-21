import { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import hotelConfig from '../../config/hotelConfig';
import './PackageDeals.css';

const PackageDeals = () => {
  const { format } = useCurrency();
  const [activePackage, setActivePackage] = useState(null);

  const packages = [
    {
      id: 1,
      name: 'Romantic Getaway',
      image: 'https://images.unsplash.com/photo-1529290130-4ca3753253ae?w=600',
      price: 850000,
      description: 'Perfect for couples seeking a romantic escape',
      duration: '2 Nights',
      includes: [
        'Deluxe Room with city view',
        'Welcome champagne & chocolates',
        "Couple's massage (60 min)",
        'Romantic dinner (3-course)',
        'Breakfast in bed',
        'Late checkout (2 PM)',
        'Flower arrangement'
      ]
    },
    {
      id: 2,
      name: 'Business Essentials',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
      price: 680000,
      description: 'Everything business travelers need for a productive trip',
      duration: '2 Nights',
      includes: [
        'Executive Suite',
        'Airport transfer (both ways)',
        'Full day conference room',
        'Business lunch for 2',
        'High-speed WiFi',
        'Express check-in/out',
        'Daily newspaper'
      ]
    },
    {
      id: 3,
      name: 'Family Fun',
      image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600',
      price: 950000,
      description: 'Fun-filled getaway for the whole family',
      duration: '3 Nights',
      includes: [
        'Deluxe Room (2 adults + 2 kids)',
        'Kids eat free (under 12)',
        'Family city tour',
        'Pool toys & games',
        'Kids club access',
        'Babysitting (1 evening)',
        'Family photo session'
      ]
    },
    {
      id: 4,
      name: 'Wellness Retreat',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbec9d?w=600',
      price: 1200000,
      description: 'Rejuvenate your body, mind, and soul',
      duration: '4 Nights',
      includes: [
        'Wellness Suite',
        'Daily yoga sessions',
        'Full body massage (3 sessions)',
        'Spa treatments',
        'Healthy meal plan',
        'Wellness consultation',
        'Meditation sessions'
      ]
    },
    {
      id: 5,
      name: 'Weekend Escape',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600',
      price: 450000,
      description: 'Quick getaway for relaxation',
      duration: '2 Nights',
      includes: [
        'Deluxe Room',
        'Daily breakfast',
        'Spa discount (20%)',
        'Pool access',
        'Late checkout (1 PM)',
        'Welcome drink'
      ]
    }
  ];

  return (
    <section className="package-deals-section" id="packages">
      <div className="container">
        <h2 className="section-title">Special Packages</h2>
        <p className="section-subtitle">Curated experiences for unforgettable stays at {hotelConfig.name}</p>

        <div className="packages-grid">
          {packages.map(pkg => (
            <div key={pkg.id} className="package-card">
              <div className="package-image">
                <img src={pkg.image} alt={pkg.name} />
                <span className="duration-badge">{pkg.duration}</span>
              </div>
              <div className="package-content">
                <h3>{pkg.name}</h3>
                <p className="package-description">{pkg.description}</p>
                <div className="package-price">
                  <span className="price">{format(pkg.price)}</span>
                  <span className="per">/ package</span>
                </div>
                <button className="btn-outline" onClick={() => setActivePackage(pkg)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {activePackage && (
          <div className="package-modal-overlay" onClick={() => setActivePackage(null)}>
            <div className="package-modal" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setActivePackage(null)}>×</button>
              <div className="modal-header">
                <img src={activePackage.image} alt={activePackage.name} />
                <div className="header-content">
                  <h3>{activePackage.name}</h3>
                  <p>{activePackage.description}</p>
                  <span className="duration">{activePackage.duration}</span>
                </div>
              </div>
              <div className="modal-body">
                <h4>Package Includes:</h4>
                <ul className="includes-list">
                  {activePackage.includes.map((item, i) => (
                    <li key={i}>✓ {item}</li>
                  ))}
                </ul>
                <div className="modal-price">
                  <span className="total">Total: {format(activePackage.price)}</span>
                  <button className="btn">Book This Package</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackageDeals;
