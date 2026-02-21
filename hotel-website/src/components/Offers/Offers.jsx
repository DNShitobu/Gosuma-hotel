import './Offers.css';

const Offers = () => {
  const offers = [
    {
      title: 'Early Bird Discount',
      discount: '15% OFF',
      description: 'Book 30 days in advance and save 15% on your stay',
      validUntil: 'Valid until Dec 31, 2024',
      code: 'EARLYBIRD15'
    },
    {
      title: 'Stay Longer, Save More',
      discount: '25% OFF',
      description: 'Stay 5+ nights and enjoy 25% discount on your booking',
      validUntil: 'Valid until Dec 31, 2024',
      code: 'STAY5PLUS'
    },
    {
      title: 'Weekend Getaway',
      discount: '20% OFF',
      description: 'Special weekend rates for couples and families',
      validUntil: 'Valid on weekends only',
      code: 'WEEKEND20'
    }
  ];

  return (
    <section className="offers" id="offers">
      <div className="container">
        <h2 className="section-title">Special Offers</h2>
        <p className="section-subtitle">Exclusive deals for our guests</p>
        
        <div className="offers-grid">
          {offers.map((offer, index) => (
            <div className="offer-card" key={index}>
              <div className="offer-badge">{offer.discount}</div>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <div className="offer-code">
                <span>Use code: </span>
                <code>{offer.code}</code>
              </div>
              <small>{offer.validUntil}</small>
              <a href="#book" className="btn">Book Now</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
