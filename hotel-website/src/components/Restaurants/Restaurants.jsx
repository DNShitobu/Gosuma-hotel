import hotelConfig from '../../config/hotelConfig';
import './Restaurants.css';

const Restaurants = () => {
  const { restaurants, name } = hotelConfig;

  return (
    <section className="restaurants" id="restaurants">
      <div className="container">
        <h2 className="section-title">Wine & Dine at {name}</h2>
        <p className="section-subtitle">Experience our Culinary Delights</p>
        
        <div className="restaurants-grid">
          {restaurants.map((restaurant, index) => (
            <div className="restaurant-card" key={index}>
              <div className="restaurant-image">
                <img 
                  src={restaurant.image || `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80`} 
                  alt={restaurant.name} 
                />
              </div>
              <div className="restaurant-content">
                <h3>{restaurant.name}</h3>
                <p className="cuisine">{restaurant.cuisine}</p>
                <p className="description">{restaurant.description}</p>
                <p className="hours">🕐 {restaurant.hours}</p>
                <p className="capacity">👥 Capacity: {restaurant.capacity} guests</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Restaurants;
