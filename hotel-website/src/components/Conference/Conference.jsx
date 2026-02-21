import { useState } from 'react';
import './Conference.css';

const Conference = () => {
  const [activeTab, setActiveTab] = useState('rooms');
  const venues = [
    { id: 1, name: 'Grand Ballroom', capacity: 300, size: '500 sqm', rate: 1500, equipment: ['Projector', 'Sound System', 'Stage', 'Lighting'] },
    { id: 2, name: 'Executive Boardroom', capacity: 20, size: '50 sqm', rate: 300, equipment: ['TV Screen', 'Video Conference', 'Whiteboard'] },
    { id: 3, name: 'Conference Room A', capacity: 50, size: '80 sqm', rate: 400, equipment: ['Projector', 'Whiteboard', 'Sound System'] },
    { id: 4, name: 'Conference Room B', capacity: 30, size: '60 sqm', rate: 250, equipment: ['TV Screen', 'Whiteboard'] }
  ];

  const bookings = [
    { id: 101, venue: 'Grand Ballroom', client: 'Tech Corp', date: '2026-02-25', time: '09:00 - 17:00', status: 'confirmed' },
    { id: 102, venue: 'Conference Room A', client: 'Marketing Ltd', date: '2026-02-22', time: '14:00 - 18:00', status: 'confirmed' },
    { id: 103, venue: 'Executive Boardroom', client: 'Finance Group', date: '2026-02-24', time: '10:00 - 12:00', status: 'pending' }
  ];

  const [newBooking, setNewBooking] = useState({ venue: '', client: '', date: '', time: '', attendees: 20 });

  const handleBooking = () => {
    if (!newBooking.venue || !newBooking.client || !newBooking.date) return;
    alert('Conference room booking request submitted!');
    setNewBooking({ venue: '', client: '', date: '', time: '', attendees: 20 });
  };

  return (
    <section className="conference-section" id="conference">
      <div className="container">
        <h2 className="section-title">Conference & Events</h2>
        <p className="section-subtitle">Meeting rooms and event spaces</p>

        <div className="conference-tabs">
          <button className={activeTab === 'rooms' ? 'active' : ''} onClick={() => setActiveTab('rooms')}>Venues</button>
          <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>Bookings</button>
          <button className={activeTab === 'new' ? 'active' : ''} onClick={() => setActiveTab('new')}>New Booking</button>
        </div>

        {activeTab === 'rooms' && (
          <div className="venues-grid">
            {venues.map(venue => (
              <div key={venue.id} className="venue-card">
                <div className="venue-header">
                  <h3>{venue.name}</h3>
                  <span className="capacity">Up to {venue.capacity} guests</span>
                </div>
                <p className="size">{venue.size}</p>
                <p className="rate">${venue.rate}/day</p>
                <div className="equipment">
                  {venue.equipment.map((item, i) => (
                    <span key={i} className="equip-tag">{item}</span>
                  ))}
                </div>
                <button className="btn-book">Book This Venue</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bookings-list">
            {bookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-info">
                  <h4>{booking.venue}</h4>
                  <p className="client">{booking.client}</p>
                </div>
                <div className="booking-details">
                  <p>📅 {booking.date}</p>
                  <p>🕐 {booking.time}</p>
                </div>
                <span className={`status ${booking.status}`}>{booking.status}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'new' && (
          <div className="booking-form">
            <h3>Request a Booking</h3>
            <div className="form-grid">
              <select value={newBooking.venue} onChange={(e) => setNewBooking({...newBooking, venue: e.target.value})}>
                <option value="">Select Venue</option>
                {venues.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
              </select>
              <input type="text" placeholder="Company/Client Name" value={newBooking.client} onChange={(e) => setNewBooking({...newBooking, client: e.target.value})} />
              <input type="date" value={newBooking.date} onChange={(e) => setNewBooking({...newBooking, date: e.target.value})} />
              <input type="text" placeholder="Time (e.g., 09:00 - 17:00)" value={newBooking.time} onChange={(e) => setNewBooking({...newBooking, time: e.target.value})} />
              <input type="number" placeholder="Number of Attendees" value={newBooking.attendees} onChange={(e) => setNewBooking({...newBooking, attendees: e.target.value})} />
              <button className="btn-submit" onClick={handleBooking}>Submit Request</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Conference;
