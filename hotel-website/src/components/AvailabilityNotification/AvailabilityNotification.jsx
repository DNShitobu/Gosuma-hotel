import { useState } from 'react';
import './AvailabilityNotification.css';

const AvailabilityNotification = ({ rooms }) => {
  const [email, setEmail] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !selectedRoom) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubscribed(true);
    setLoading(false);
  };

  if (subscribed) {
    return (
      <section className="availability-notification">
        <div className="container">
          <div className="success-message">
            <span>✓</span>
            <h3>You'll be notified!</h3>
            <p>We'll email you when {rooms?.find(r => r.id === parseInt(selectedRoom))?.name} becomes available.</p>
            <button className="btn" onClick={() => setSubscribed(false)}>Set Another</button>
          </div>
        </div>
      </section>
    );
  }

  const unavailableRooms = rooms?.filter(r => r.available === 0) || [];

  return (
    <section className="availability-notification">
      <div className="container">
        <h2 className="section-title">Get Notified</h2>
        <p className="section-subtitle">We'll let you know when your preferred room is available</p>

        {unavailableRooms.length > 0 ? (
          <form className="notify-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} required>
                <option value="">Select a room type</option>
                {unavailableRooms.map(room => (
                  <option key={room.id} value={room.id}>{room.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Subscribing...' : 'Notify Me'}
            </button>
          </form>
        ) : (
          <p className="all-available">All rooms are currently available!</p>
        )}
      </div>
    </section>
  );
};

export default AvailabilityNotification;
