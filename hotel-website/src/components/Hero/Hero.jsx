import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Welcome to Airport View Hotel</h1>
        <p>A blend of Cosmopolitan Serenity</p>
        <a href="#book" className="btn">Book Your Stay</a>
      </div>
      <div className="hero-overlay"></div>
    </section>
  );
};

export default Hero;
