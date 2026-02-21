import { useState, useEffect } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import './Booking.css';

const API_URL = 'http://localhost:3001/api';

const Booking = () => {
  const today = new Date().toISOString().split('T')[0];
  const { currency, format } = useCurrency();
  
  const [step, setStep] = useState(1);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1',
    roomId: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: ''
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${API_URL}/rooms`);
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.checkIn) {
      newErrors.checkIn = 'Check-in date is required';
    } else if (formData.checkIn < today) {
      newErrors.checkIn = 'Check-in cannot be in the past';
    }
    
    if (!formData.checkOut) {
      newErrors.checkOut = 'Check-out date is required';
    } else if (formData.checkOut <= formData.checkIn) {
      newErrors.checkOut = 'Check-out must be after check-in';
    }
    
    if (!formData.roomId) {
      newErrors.roomId = 'Please select a room';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.guestName.trim()) {
      newErrors.guestName = 'Name is required';
    }
    
    if (!formData.guestEmail.trim()) {
      newErrors.guestEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.guestEmail)) {
      newErrors.guestEmail = 'Invalid email format';
    }
    
    if (!formData.guestPhone.trim()) {
      newErrors.guestPhone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          roomId: parseInt(formData.roomId),
          guestName: formData.guestName,
          guestEmail: formData.guestEmail,
          guestPhone: formData.guestPhone,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: parseInt(formData.guests),
          currency: currency,
          specialRequests: formData.specialRequests
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setBookingResult(data.booking);
        setStep(3);
      } else {
        setErrors({ submit: data.error || 'Failed to create booking' });
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      setErrors({ submit: 'Failed to create booking. Please try again.' });
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'checkIn' || name === 'checkOut') {
      const sanitized = value.replace(/[^0-9-]/g, '');
      if (sanitized.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: sanitized }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const selectedRoom = rooms.find(r => r.id === parseInt(formData.roomId));
  const nights = formData.checkIn && formData.checkOut 
    ? Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <section className="booking" id="book">
      <div className="container">
        <h2 className="booking-title">Book Your Perfect Stay</h2>
        
        {/* Step Indicator */}
        <div className="booking-steps">
          <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Details</div>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Guest Info</div>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Confirm</div>
          </div>
        </div>
        
        <div className="booking-box">
          {step === 1 && (
            <div className="step-content">
              <h3>When are you planning to stay?</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="checkIn">Check In</label>
                  <input 
                    type="date" 
                    id="checkIn"
                    name="checkIn"
                    min={today}
                    value={formData.checkIn}
                    onChange={handleChange}
                    aria-invalid={!!errors.checkIn}
                  />
                  {errors.checkIn && <span className="error-message">{errors.checkIn}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="checkOut">Check Out</label>
                  <input 
                    type="date" 
                    id="checkOut"
                    name="checkOut"
                    min={formData.checkIn || today}
                    value={formData.checkOut}
                    onChange={handleChange}
                    aria-invalid={!!errors.checkOut}
                  />
                  {errors.checkOut && <span className="error-message">{errors.checkOut}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="guests">Guests</label>
                  <select 
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4+ Guests</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="roomId">Select Your Room</label>
                <div className="rooms-grid">
                  {rooms.map(room => (
                    <div 
                      key={room.id} 
                      className={`room-card ${formData.roomId === String(room.id) ? 'selected' : ''}`}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, roomId: String(room.id) }));
                        if (errors.roomId) {
                          setErrors(prev => ({ ...prev, roomId: '' }));
                        }
                      }}
                    >
                      <div className="room-card-header">
                        <h4>{room.name}</h4>
                        <div className="room-price">{format(room.price)}<span>/night</span></div>
                      </div>
                      <p className="room-type">{room.type}</p>
                      <p className="room-available">
                        <span className="badge">{room.available} available</span>
                      </p>
                      <div className="room-card-footer">
                        <input 
                          type="radio" 
                          name="roomId" 
                          value={room.id}
                          checked={formData.roomId === String(room.id)}
                          onChange={() => {}}
                        />
                        <span>Select</span>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.roomId && <span className="error-message">{errors.roomId}</span>}
              </div>

              {selectedRoom && nights > 0 && (
                <div className="price-preview">
                  <div className="price-preview-row">
                    <span>{selectedRoom.name}</span>
                    <strong>{format(selectedRoom.price)}/night</strong>
                  </div>
                  <div className="price-preview-row">
                    <span>×{nights} night{nights > 1 ? 's' : ''}</span>
                    <strong>{format(selectedRoom.price * nights)}</strong>
                  </div>
                  <div className="price-preview-total">
                    <span>Total</span>
                    <strong>{format(selectedRoom.price * nights)}</strong>
                  </div>
                </div>
              )}

              <button className="btn btn-primary" onClick={handleNext} disabled={loading}>
                {loading ? 'Processing...' : 'Continue to Guest Info'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h3>Tell us about yourself</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="guestName">Full Name</label>
                  <input 
                    type="text"
                    id="guestName"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleChange}
                    aria-invalid={!!errors.guestName}
                    placeholder="John Doe"
                  />
                  {errors.guestName && <span className="error-message">{errors.guestName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="guestEmail">Email Address</label>
                  <input 
                    type="email"
                    id="guestEmail"
                    name="guestEmail"
                    value={formData.guestEmail}
                    onChange={handleChange}
                    aria-invalid={!!errors.guestEmail}
                    placeholder="john@example.com"
                  />
                  {errors.guestEmail && <span className="error-message">{errors.guestEmail}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="guestPhone">Phone Number</label>
                  <input 
                    type="tel"
                    id="guestPhone"
                    name="guestPhone"
                    value={formData.guestPhone}
                    onChange={handleChange}
                    aria-invalid={!!errors.guestPhone}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.guestPhone && <span className="error-message">{errors.guestPhone}</span>}
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="specialRequests">Special Requests (Optional)</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requests? Let us know..."
                  rows="4"
                />
              </div>

              {selectedRoom && nights > 0 && (
                <div className="booking-summary">
                  <h4>Booking Summary</h4>
                  <div className="summary-row">
                    <span>Room:</span>
                    <strong>{selectedRoom.name}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Check-in:</span>
                    <strong>{new Date(formData.checkIn).toLocaleDateString()}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Check-out:</span>
                    <strong>{new Date(formData.checkOut).toLocaleDateString()}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Duration:</span>
                    <strong>{nights} night{nights > 1 ? 's' : ''}</strong>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row total">
                    <span>Total Price:</span>
                    <strong>{format(selectedRoom.price * nights)}</strong>
                  </div>
                </div>
              )}

              {errors.submit && <div className="error-box">{errors.submit}</div>}

              <div className="button-group">
                <button className="btn btn-outline" onClick={handleBack} disabled={loading}>
                  ← Back
                </button>
                <button className="btn btn-primary" onClick={handleNext} disabled={loading}>
                  {loading ? 'Processing...' : 'Confirm Booking →'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && bookingResult && (
            <div className="step-content success-content">
              <div className="success-icon">✓</div>
              <h3>Booking Confirmed!</h3>
              <p className="booking-id">Booking ID: <strong>{bookingResult.id}</strong></p>
              
              <div className="booking-summary">
                <div className="summary-row">
                  <span>Room:</span>
                  <strong>{selectedRoom?.name}</strong>
                </div>
                <div className="summary-row">
                  <span>Check-in:</span>
                  <strong>{new Date(bookingResult.checkIn).toLocaleDateString()}</strong>
                </div>
                <div className="summary-row">
                  <span>Check-out:</span>
                  <strong>{new Date(bookingResult.checkOut).toLocaleDateString()}</strong>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <strong>{format(bookingResult.totalPrice)}</strong>
                </div>
                <div className="summary-row">
                  <span>Status:</span>
                  <strong>{bookingResult.status}</strong>
                </div>
              </div>
              
              <p className="success-message">
                A confirmation email has been sent to <strong>{bookingResult.guestEmail}</strong>
              </p>

              <button className="btn btn-primary" onClick={() => {
                setStep(1);
                setFormData({
                  checkIn: '',
                  checkOut: '',
                  guests: '1',
                  roomId: '',
                  guestName: '',
                  guestEmail: '',
                  guestPhone: '',
                  specialRequests: ''
                });
                setBookingResult(null);
              }}>
                Make Another Booking
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Booking;
