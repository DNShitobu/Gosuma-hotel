import hotelConfig from '../../config/hotelConfig';
import './Services.css';

const Services = () => {
  const { contact } = hotelConfig;

  const services = [
    {
      icon: '✈️',
      title: 'Airport Transfer',
      description: `Convenient shuttle service to and from Julius Nyerere International Airport`,
      available: '24/7 Available',
      price: 'TSh 50,000'
    },
    {
      icon: '🚗',
      title: 'Car Rental',
      description: 'Explore Dar es Salaam at your own pace with our partner car rental service',
      available: 'Available',
      price: 'From TSh 150,000/day'
    },
    {
      icon: '💱',
      title: 'Forex Bureau',
      description: 'Currency exchange services for international guests',
      available: 'Available',
      price: 'Competitive rates'
    },
    {
      icon: '🎁',
      title: 'Gift Shop',
      description: 'Tanzanian souvenirs, essentials, and gifts available on-site',
      available: 'Available',
      price: ''
    },
    {
      icon: '🧺',
      title: 'Laundry Service',
      description: 'Professional laundry and dry cleaning services',
      available: 'Same day service',
      price: 'From TSh 5,000'
    },
    {
      icon: '🛎️',
      title: 'Concierge',
      description: ' Assistance with tours, reservations, and local recommendations',
      available: '24/7 Available',
      price: ''
    }
  ];

  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">Additional Services</h2>
        <p className="section-subtitle">Extra amenities for your convenience</p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <span className="service-icon">{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {service.price && <span className="service-price">{service.price}</span>}
              <span className="service-available">{service.available}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
