import { useState, useEffect } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import './GuestProfiles.css';

const API_URL = 'http://localhost:3001/api';

const GuestProfiles = () => {
  const { format } = useCurrency();
  const [guests, setGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const res = await fetch(`${API_URL}/bookings`);
      const bookings = await res.json();
      
      const guestMap = {};
      bookings.forEach(booking => {
        if (!guestMap[booking.guestEmail]) {
          guestMap[booking.guestEmail] = {
            id: booking.id,
            name: booking.guestName,
            email: booking.guestEmail,
            phone: booking.guestPhone,
            visits: 1,
            totalSpent: booking.totalPrice || 0,
            lastVisit: booking.checkIn,
            preferences: [],
            notes: '',
            vip: false,
            bookings: [booking]
          };
        } else {
          guestMap[booking.guestEmail].visits++;
          guestMap[booking.guestEmail].totalSpent += booking.totalPrice || 0;
          guestMap[booking.guestEmail].bookings.push(booking);
        }
      });

      const mockGuests = [
        { id: 1, name: 'John Smith', email: 'john.smith@email.com', phone: '+233 50 123 4567', visits: 5, totalSpent: 2400, lastVisit: '2026-02-15', vip: true, preferences: ['Extra pillows', 'High floor'], notes: 'Prefers quiet rooms', tier: 'gold' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+233 55 987 6543', visits: 3, totalSpent: 890, lastVisit: '2026-02-10', vip: false, preferences: ['Early check-in'], notes: '', tier: 'bronze' },
        { id: 3, name: 'Michael Brown', email: 'm.brown@email.com', phone: '+233 24 456 7890', visits: 8, totalSpent: 4200, lastVisit: '2026-02-18', vip: true, preferences: ['Late checkout', 'Airport transfer'], notes: 'Business traveler', tier: 'platinum' },
        { id: 4, name: 'Emily Davis', email: 'emily.d@email.com', phone: '+233 27 111 2222', visits: 2, totalSpent: 320, lastVisit: '2026-01-28', vip: false, preferences: [], notes: '', tier: 'bronze' },
        { id: 5, name: 'David Wilson', email: 'd.wilson@email.com', phone: '+233 20 333 4444', visits: 12, totalSpent: 6800, lastVisit: '2026-02-20', vip: true, preferences: ['Suite', 'Breakfast included'], notes: 'Regular guest, prefers room 501', tier: 'platinum' }
      ];

      setGuests([...Object.values(guestMap), ...mockGuests]);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'vip') return matchesSearch && guest.vip;
    if (activeTab === 'regular') return matchesSearch && !guest.vip;
    return matchesSearch;
  });

  const getTierColor = (tier) => {
    const colors = { bronze: '#CD7F32', silver: '#C0C0C0', gold: '#FFD700', platinum: '#E5E4E2' };
    return colors[tier] || '#CD7F32';
  };

  const totalGuests = guests.length;
  const vipGuests = guests.filter(g => g.vip).length;
  const totalRevenue = guests.reduce((sum, g) => sum + (g.totalSpent || 0), 0);

  return (
    <section className="guest-profiles-section" id="guests">
      <div className="container">
        <h2 className="section-title">Guest Profiles</h2>
        <p className="section-subtitle">Manage guest information and preferences</p>

        <div className="guests-stats">
          <div className="stat">
            <span className="stat-value">{totalGuests}</span>
            <span className="stat-label">Total Guests</span>
          </div>
          <div className="stat">
            <span className="stat-value">{vipGuests}</span>
            <span className="stat-label">VIP Guests</span>
          </div>
          <div className="stat">
            <span className="stat-value">{format(totalRevenue)}</span>
            <span className="stat-label">Total Revenue</span>
          </div>
        </div>

        <div className="guests-toolbar">
          <input
            type="text"
            placeholder="Search guests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="guests-tabs">
            <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>All</button>
            <button className={activeTab === 'vip' ? 'active' : ''} onClick={() => setActiveTab('vip')}>VIP</button>
            <button className={activeTab === 'regular' ? 'active' : ''} onClick={() => setActiveTab('regular')}>Regular</button>
          </div>
        </div>

        <div className="guests-list">
          {filteredGuests.map(guest => (
            <div key={guest.id} className="guest-card" onClick={() => setSelectedGuest(guest)}>
              <div className="guest-avatar">
                {guest.name.charAt(0)}
                {guest.vip && <span className="vip-badge">VIP</span>}
              </div>
              <div className="guest-info">
                <h4>
                  {guest.name}
                  <span className="tier-badge" style={{ background: getTierColor(guest.tier) }}>
                    {guest.tier}
                  </span>
                </h4>
                <p className="guest-email">{guest.email}</p>
                <p className="guest-phone">{guest.phone}</p>
              </div>
              <div className="guest-stats-mini">
                <div className="mini-stat">
                  <span className="value">{guest.visits}</span>
                  <span className="label">Visits</span>
                </div>
                <div className="mini-stat">
                  <span className="value">{format(guest.totalSpent || 0)}</span>
                  <span className="label">Spent</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedGuest && (
          <div className="guest-modal-overlay" onClick={() => setSelectedGuest(null)}>
            <div className="guest-modal" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedGuest(null)}>×</button>
              
              <div className="modal-header">
                <div className="avatar-large">
                  {selectedGuest.name.charAt(0)}
                  {selectedGuest.vip && <span className="vip-badge">VIP</span>}
                </div>
                <div className="header-info">
                  <h2>{selectedGuest.name}</h2>
                  <span className="tier-badge-large" style={{ background: getTierColor(selectedGuest.tier) }}>
                    {selectedGuest.tier} Member
                  </span>
                </div>
              </div>

              <div className="modal-body">
                <div className="info-section">
                  <h4>Contact Information</h4>
                  <p><strong>Email:</strong> {selectedGuest.email}</p>
                  <p><strong>Phone:</strong> {selectedGuest.phone}</p>
                </div>

                <div className="info-section">
                  <h4>Stay Statistics</h4>
                  <div className="stats-grid">
                    <div className="stat-box">
                      <span>{selectedGuest.visits}</span>
                      <label>Total Visits</label>
                    </div>
                    <div className="stat-box">
                      <span>{format(selectedGuest.totalSpent || 0)}</span>
                      <label>Total Spent</label>
                    </div>
                    <div className="stat-box">
                      <span>{selectedGuest.lastVisit || 'N/A'}</span>
                      <label>Last Visit</label>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h4>Preferences</h4>
                  <div className="preferences-list">
                    {selectedGuest.preferences?.length > 0 ? (
                      selectedGuest.preferences.map((pref, i) => (
                        <span key={i} className="preference-tag">{pref}</span>
                      ))
                    ) : (
                      <p>No preferences recorded</p>
                    )}
                  </div>
                </div>

                <div className="info-section">
                  <h4>Notes</h4>
                  <p>{selectedGuest.notes || 'No notes'}</p>
                </div>

                <div className="info-section">
                  <h4>Booking History</h4>
                  <div className="booking-history">
                    {selectedGuest.bookings?.slice(0, 5).map((booking, i) => (
                      <div key={i} className="history-item">
                        <span>Room {booking.roomId || 'N/A'}</span>
                        <span>{booking.checkIn}</span>
                        <span>{format(booking.totalPrice || 0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-secondary">Edit Profile</button>
                <button className="btn-primary">Send Offer</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GuestProfiles;
