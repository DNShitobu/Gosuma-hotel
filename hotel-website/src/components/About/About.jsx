import hotelConfig from '../../config/hotelConfig';
import './About.css';

const About = () => {
  const { name, description } = hotelConfig;

  const stats = [
    { number: '5000+', label: 'Happy Guests' },
    { number: '50+', label: 'Rooms' },
    { number: '4', label: 'Conference Venues' },
    { number: '2', label: 'Restaurants & Bars' },
  ];

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">Welcome</h2>
            <h3 className="section-subtitle">Welcome to {name}</h3>
            <p>
              {description}
            </p>
            <p>
              Experience unparalleled hospitality at {name}. Our hotel offers a perfect 
              blend of comfort and luxury, making your stay memorable whether you're 
              here for business or leisure.
            </p>
            <p>
              With elegantly furnished rooms, world-class amenities, and dedicated 
              service, we strive to make every guest feel at home. Our commitment 
              to excellence has earned us the reputation as one of the finest 
              hotels in {hotelConfig.contact.country}.
            </p>
            <a href="#rooms" className="btn">Read More</a>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-item" key={index}>
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
