import { useState } from 'react';
import './FrontDesk.css';

const FrontDesk = () => {
  const [activeTab, setActiveTab] = useState('checkin');
  const [rooms, setRooms] = useState([
    { id: 101, guest: 'John Smith', status: 'occupied', checkIn: '2026-02-18', checkOut: '2026-02-22', balance: 450 },
    { id: 102, guest: 'Sarah Johnson', status: 'occupied', checkIn: '2026-02-19', checkOut: '2026-02-21', balance: 0 },
    { id: 103, guest: null, status: 'vacant', checkIn: null, checkOut: null, balance: 0 },
    { id: 104, guest: 'Mike Brown', status: 'reserved', checkIn: '2026-02-21', checkOut: '2026-02-25', balance: 800 },
    { id: 105, guest: null, status: 'vacant', checkIn: null, checkOut: null, balance: 0 },
    { id: 201, guest: 'Emily Davis', status: 'occupied', checkIn: '2026-02-15', checkOut: '2026-02-20', balance: 280 },
    { id: 202, guest: null, status: 'maintenance', checkIn: null, checkOut: null, balance: 0 },
    { id: 203, guest: 'David Wilson', status: 'occupied', checkIn: '2026-02-20', checkOut: '2026-02-23', balance: 0 }
  ]);

  const [walkInGuest, setWalkInGuest] = useState({ name: '', phone: '', email: '', roomType: 'standard', nights: 1 });
  const [showKeyModal, setShowKeyModal] = useState(null);

  const guestMessages = [
    { id: 1, from: 'Room 101', message: 'Need extra towels', time: '10:30 AM', status: 'new' },
    { id: 2, from: 'Room 203', message: 'Late checkout request', time: '09:45 AM', status: 'read' },
    { id: 3, from: 'Room 201', message: 'Room service order', time: '08:15 AM', status: 'read' }
  ];

  const handleWalkIn = () => {
    if (!walkInGuest.name || !walkInGuest.roomType) return;
    alert(`Check-in successful for ${walkInGuest.name}! Room assigned.`);
    setWalkInGuest({ name: '', phone: '', email: '', roomType: 'standard', nights: 1 });
  };

  const statusColors = {
    vacant: '#27ae60',
    occupied: '#3498db',
    reserved: '#f39c12',
    maintenance: '#e74c3c'
  };

  return (
    <section className="frontdesk-section" id="frontdesk">
      <div className="container">
        <h2 className="section-title">Front Desk Operations</h2>
        <p className="section-subtitle">Manage check-in, check-out & guest services</p>

        <div className="frontdesk-tabs">
          <button className={activeTab === 'checkin' ? 'active' : ''} onClick={() => setActiveTab('checkin')}>
            Check-in/out
          </button>
          <button className={activeTab === 'rooms' ? 'active' : ''} onClick={() => setActiveTab('rooms')}>
            Room Status
          </button>
          <button className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')}>
            Messages ({guestMessages.filter(m => m.status === 'new').length})
          </button>
        </div>

        {activeTab === 'checkin' && (
          <div className="checkin-content">
            <div className="walk-in-form">
              <h3>Walk-in Check-in</h3>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Guest Name"
                  value={walkInGuest.name}
                  onChange={(e) => setWalkInGuest({...walkInGuest, name: e.target.value})}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={walkInGuest.phone}
                  onChange={(e) => setWalkInGuest({...walkInGuest, phone: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={walkInGuest.email}
                  onChange={(e) => setWalkInGuest({...walkInGuest, email: e.target.value})}
                />
                <select
                  value={walkInGuest.roomType}
                  onChange={(e) => setWalkInGuest({...walkInGuest, roomType: e.target.value})}
                >
                  <option value="standard">Standard Room</option>
                  <option value="deluxe">Deluxe Room</option>
                  <option value="suite">Suite</option>
                </select>
                <input
                  type="number"
                  placeholder="Nights"
                  value={walkInGuest.nights}
                  onChange={(e) => setWalkInGuest({...walkInGuest, nights: e.target.value})}
                  min="1"
                />
                <button className="btn-checkin" onClick={handleWalkIn}>Check In Guest</button>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="actions-grid">
                <button className="action-btn" onClick={() => setShowKeyModal(101)}>
                  <span className="icon">🔑</span>
                  <span>Generate Key Card</span>
                </button>
                <button className="action-btn">
                  <span className="icon">🧾</span>
                  <span>Print Folio</span>
                </button>
                <button className="action-btn">
                  <span className="icon">💳</span>
                  <span>Process Payment</span>
                </button>
                <button className="action-btn">
                  <span className="icon">📋</span>
                  <span>Late Checkout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="rooms-status-grid">
            {rooms.map(room => (
              <div key={room.id} className="room-status-card" style={{ borderColor: statusColors[room.status] }}>
                <div className="room-number">Room {room.id}</div>
                <span className="status" style={{ background: statusColors[room.status] }}>
                  {room.status}
                </span>
                {room.guest && (
                  <div className="guest-info">
                    <p className="guest-name">{room.guest}</p>
                    <p className="dates">{room.checkIn} - {room.checkOut}</p>
                    {room.balance > 0 && <p className="balance">Balance: ${room.balance}</p>}
                  </div>
                )}
                <div className="room-actions">
                  {room.status === 'vacant' && <button className="btn-small">Assign</button>}
                  {room.status === 'occupied' && <button className="btn-small">Checkout</button>}
                  {room.status === 'reserved' && <button className="btn-small">Checkin</button>}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="messages-list">
            {guestMessages.map(msg => (
              <div key={msg.id} className={`message-card ${msg.status}`}>
                <div className="message-header">
                  <span className="from">{msg.from}</span>
                  <span className="time">{msg.time}</span>
                </div>
                <p className="message-text">{msg.message}</p>
                <button className="btn-respond">Respond</button>
              </div>
            ))}
          </div>
        )}

        {showKeyModal && (
          <div className="key-modal-overlay" onClick={() => setShowKeyModal(null)}>
            <div className="key-modal" onClick={e => e.stopPropagation()}>
              <h3>Key Card Generated</h3>
              <div className="key-animation">🔑</div>
              <p>Room {showKeyModal}</p>
              <p className="key-info">Valid until: 12:00 PM checkout</p>
              <button className="btn" onClick={() => setShowKeyModal(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FrontDesk;
