import { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  if (subscribed) {
    return (
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-success">
            <span className="success-icon">✓</span>
            <h3>Thank you for subscribing!</h3>
            <p>You'll receive our latest offers and updates.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get exclusive offers and updates directly to your inbox</p>
          
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
