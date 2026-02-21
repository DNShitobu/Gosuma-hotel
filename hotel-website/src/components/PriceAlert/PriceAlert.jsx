import { useState } from 'react';
import './PriceAlert.css';

const API_URL = 'http://localhost:3001/api';

const PriceAlert = ({ rooms }) => {
  const [email, setEmail] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !selectedRoom || !targetPrice) return;

    setLoading(true);
    try {
      await fetch(`${API_URL}/price-alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, roomId: selectedRoom, targetPrice: parseFloat(targetPrice) })
      });
      setSubscribed(true);
    } catch (error) {
      console.error('Error setting price alert:', error);
    }
    setLoading(false);
  };

  if (subscribed) {
    return (
      <section className="price-alert-section">
        <div className="container">
          <div className="price-alert-success">
            <span className="icon">🔔</span>
            <h3>Price Alert Set!</h3>
            <p>We'll notify you at {email} when the price drops to your target.</p>
            <button className="btn" onClick={() => setSubscribed(false)}>Set Another Alert</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="price-alert-section" id="price-alert">
      <div className="container">
        <h2 className="section-title">Price Alerts</h2>
        <p className="section-subtitle">Get notified when room prices drop</p>

        <form className="price-alert-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Room Type</label>
            <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} required>
              <option value="">Select a room</option>
              {rooms?.map(room => (
                <option key={room.id} value={room.id}>{room.name} - From {room.price}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Target Price (per night)</label>
            <input
              type="number"
              placeholder="Your target price"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Setting Alert...' : '🔔 Set Price Alert'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PriceAlert;
