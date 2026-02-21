import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Welcome to Airport View Hotel</h1>
        <p>A blend of Cosmopolitan Serenity</p>
        <div className="hero-btn-group">
          <a href="/login" className="btn btn-outline">Login</a>
          <a href="/signup" className="btn btn-outline">Sign Up</a>
          <a href="#book" className="btn">Book Your Stay</a>
        </div>
      </div>
      <div className="hero-overlay"></div>
    </section>
  );
};

export default Hero;
