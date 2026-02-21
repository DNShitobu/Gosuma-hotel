import { useState, useEffect, useCallback } from 'react';
import './Admin.css';

const API_URL = 'http://localhost:3001/api';
const ADMIN_PASSWORD = 'gosuma2024!'; // Default admin password

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const adminHeaders = {
    'Content-Type': 'application/json',
    'x-admin-password': ADMIN_PASSWORD
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        fetch(`${API_URL}/admin/stats`, { headers: adminHeaders }),
        fetch(`${API_URL}/admin/bookings${filter !== 'all' ? `?status=${filter}` : ''}`, { headers: adminHeaders })
      ]);
      
      const statsData = await statsRes.json();
      const bookingsData = await bookingsRes.json();
      
      setStats(statsData);
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/admin/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: adminHeaders,
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchData();
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffc107',
      confirmed: '#28a745',
      cancelled: '#dc3545',
      completed: '#17a2b8'
    };
    return colors[status] || '#6c757d';
  };

  if (loading) {
    return (
      <section className="admin" id="admin">
        <div className="container">
          <div className="admin-loading">Loading admin dashboard...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="admin" id="admin">
      <div className="container">
        <h2 className="section-title">Admin Dashboard</h2>
        
        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">{stats.totalBookings}</span>
              <span className="stat-label">Total Bookings</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.pendingBookings}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.confirmedBookings}</span>
              <span className="stat-label">Confirmed</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">${stats.totalRevenue.toLocaleString()}</span>
              <span className="stat-label">Total Revenue</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.todayCheckIns}</span>
              <span className="stat-label">Check-ins Today</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.todayCheckOuts}</span>
              <span className="stat-label">Check-outs Today</span>
            </div>
          </div>
        )}

        <div className="bookings-section">
          <div className="bookings-header">
            <h3>Bookings</h3>
            <div className="filter-buttons">
              <button 
                className={filter === 'all' ? 'active' : ''} 
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={filter === 'pending' ? 'active' : ''} 
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={filter === 'confirmed' ? 'active' : ''} 
                onClick={() => setFilter('confirmed')}
              >
                Confirmed
              </button>
              <button 
                className={filter === 'cancelled' ? 'active' : ''} 
                onClick={() => setFilter('cancelled')}
              >
                Cancelled
              </button>
            </div>
          </div>

          <div className="bookings-table">
            <table>
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-data">No bookings found</td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <div className="guest-info">
                          <span className="guest-name">{booking.guestName}</span>
                          <span className="guest-email">{booking.guestEmail}</span>
                        </div>
                      </td>
                      <td>{booking.roomName}</td>
                      <td>{formatDate(booking.checkIn)}</td>
                      <td>{formatDate(booking.checkOut)}</td>
                      <td>${booking.totalPrice}</td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(booking.status) }}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="view-btn"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            View
                          </button>
                          {booking.status === 'pending' && (
                            <button 
                              className="confirm-btn"
                              onClick={() => handleStatusChange(booking.id, 'confirmed')}
                            >
                              Confirm
                            </button>
                          )}
                          {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                            <button 
                              className="cancel-btn"
                              onClick={() => handleStatusChange(booking.id, 'cancelled')}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedBooking && (
          <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Booking Details</h3>
                <button className="close-btn" onClick={() => setSelectedBooking(null)}>×</button>
              </div>
              <div className="modal-body">
                <div className="detail-row">
                  <span className="detail-label">Booking ID:</span>
                  <span className="detail-value">{selectedBooking.id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Guest Name:</span>
                  <span className="detail-value">{selectedBooking.guestName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedBooking.guestEmail}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{selectedBooking.guestPhone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Room:</span>
                  <span className="detail-value">{selectedBooking.roomName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Check-in:</span>
                  <span className="detail-value">{formatDate(selectedBooking.checkIn)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Check-out:</span>
                  <span className="detail-value">{formatDate(selectedBooking.checkOut)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Guests:</span>
                  <span className="detail-value">{selectedBooking.guests}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Total Price:</span>
                  <span className="detail-value">${selectedBooking.totalPrice} {selectedBooking.currency}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span 
                    className="detail-value status-badge"
                    style={{ backgroundColor: getStatusColor(selectedBooking.status) }}
                  >
                    {selectedBooking.status}
                  </span>
                </div>
                {selectedBooking.specialRequests && (
                  <div className="detail-row">
                    <span className="detail-label">Special Requests:</span>
                    <span className="detail-value">{selectedBooking.specialRequests}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">Created:</span>
                  <span className="detail-value">{formatDate(selectedBooking.createdAt)}</span>
                </div>
              </div>
              <div className="modal-footer">
                {selectedBooking.status === 'pending' && (
                  <button 
                    className="confirm-btn"
                    onClick={() => handleStatusChange(selectedBooking.id, 'confirmed')}
                  >
                    Confirm Booking
                  </button>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <button 
                    className="complete-btn"
                    onClick={() => handleStatusChange(selectedBooking.id, 'completed')}
                  >
                    Mark as Completed
                  </button>
                )}
                {selectedBooking.status !== 'cancelled' && selectedBooking.status !== 'completed' && (
                  <button 
                    className="cancel-btn"
                    onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Admin;
