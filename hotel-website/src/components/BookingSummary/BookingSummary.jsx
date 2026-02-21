import { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import './BookingSummary.css';

const BookingSummary = ({ booking, onClose, onPrint }) => {
  const { format } = useCurrency();
  const [activeTab, setActiveTab] = useState('details');

  if (!booking) return null;

  const nights = Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24));
  const total = booking.totalPrice || (booking.room?.price * nights);

  return (
    <div className="booking-summary-overlay" onClick={onClose}>
      <div className="booking-summary-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="summary-header">
          <h2>Booking Confirmation</h2>
          <p className="confirmation-number">Confirmation #: {booking.confirmationNumber || booking.id}</p>
        </div>

        <div className="summary-tabs">
          <button 
            className={`tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button 
            className={`tab ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            Payment
          </button>
          <button 
            className={`tab ${activeTab === 'policies' ? 'active' : ''}`}
            onClick={() => setActiveTab('policies')}
          >
            Policies
          </button>
        </div>

        <div className="summary-content">
          {activeTab === 'details' && (
            <div className="details-tab">
              <div className="detail-section">
                <h4>Guest Information</h4>
                <p><strong>Name:</strong> {booking.guestName}</p>
                <p><strong>Email:</strong> {booking.guestEmail}</p>
                <p><strong>Phone:</strong> {booking.guestPhone}</p>
              </div>

              <div className="detail-section">
                <h4>Room Details</h4>
                {booking.room && (
                  <>
                    <p><strong>Room Type:</strong> {booking.room.name}</p>
                    <p><strong>Capacity:</strong> Up to {booking.room.capacity} guests</p>
                  </>
                )}
              </div>

              <div className="detail-section">
                <h4>Stay Dates</h4>
                <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
                <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
                <p><strong>Nights:</strong> {nights}</p>
              </div>

              <div className="detail-section">
                <h4>Booking Summary</h4>
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Room ({nights} nights × {format(booking.room?.price || 0)})</span>
                    <span>{format(booking.room?.price * nights || 0)}</span>
                  </div>
                  {booking.extras?.map((extra, i) => (
                    <div className="price-row" key={i}>
                      <span>{extra.name}</span>
                      <span>{format(extra.price)}</span>
                    </div>
                  ))}
                  <div className="price-row total">
                    <span>Total</span>
                    <span>{format(total)}</span>
                  </div>
                </div>
              </div>

              {booking.specialRequests && (
                <div className="detail-section">
                  <h4>Special Requests</h4>
                  <p>{booking.specialRequests}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="payment-tab">
              <div className="payment-status">
                <span className={`status-badge ${booking.paymentStatus || 'pending'}`}>
                  {booking.paymentStatus || 'Pending'}
                </span>
              </div>
              <div className="payment-details">
                <p><strong>Payment Method:</strong> {booking.paymentMethod || 'Not specified'}</p>
                <p><strong>Amount Paid:</strong> {format(booking.amountPaid || 0)}</p>
                <p><strong>Balance Due:</strong> {format(total - (booking.amountPaid || 0))}</p>
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="policies-tab">
              <h4>Cancellation Policy</h4>
              <p>Free cancellation up to 48 hours before check-in. After that, the first night is non-refundable.</p>
              
              <h4>Check-in / Check-out</h4>
              <p>Check-in: 2:00 PM<br/>Check-out: 12:00 PM</p>
              
              <h4>Hotel Policy</h4>
              <ul>
                <li>No smoking in rooms</li>
                <li>Pets not allowed</li>
                <li>Extra beds available upon request</li>
              </ul>
            </div>
          )}
        </div>

        <div className="summary-actions">
          <button className="btn-secondary" onClick={onPrint}>
            🖨️ Print Receipt
          </button>
          <button className="btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
