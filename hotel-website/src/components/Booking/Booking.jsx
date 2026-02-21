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

  if (step === 3 && bookingResult) {
    return (
      <section className="booking" id="book">
        <div className="container">
          <div className="booking-box booking-success">
            <div className="success-icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p className="booking-id">Booking ID: {bookingResult.id}</p>
            <div className="booking-summary">
              <p><strong>Check-in:</strong> {bookingResult.checkIn}</p>
              <p><strong>Check-out:</strong> {bookingResult.checkOut}</p>
              <p><strong>Total:</strong> {format(bookingResult.totalPrice)}</p>
              <p><strong>Status:</strong> {bookingResult.status}</p>
            </div>
            <p className="success-message">
              A confirmation email has been sent to {bookingResult.guestEmail}
            </p>
            <button className="btn" onClick={() => {
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
        </div>
      </section>
    );
  }

  return (
    <section className="booking" id="book">
      <div className="container">
        <div className="booking-box">
          <h2>{step === 1 ? 'Book Your Stay' : 'Guest Details'}</h2>
          
          {step === 1 && (
            <>
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
                  {errors.checkIn && <span className="error">{errors.checkIn}</span>}
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
                  {errors.checkOut && <span className="error">{errors.checkOut}</span>}
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

              <div className="form-group">
                <label htmlFor="roomId">Select Room</label>
                <select 
                  id="roomId"
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleChange}
                  aria-invalid={!!errors.roomId}
                >
                  <option value="">-- Select a Room --</option>
                  {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                      {room.name} - From {format(room.price)}/night ({room.available} available)
                    </option>
                  ))}
                </select>
                {errors.roomId && <span className="error">{errors.roomId}</span>}
              </div>

              {selectedRoom && nights > 0 && (
                <div className="price-summary">
                  <p><strong>Room:</strong> {selectedRoom.name}</p>
                  <p><strong>{nights} night{nights > 1 ? 's' : ''}:</strong> {format(selectedRoom.price * nights)}</p>
                </div>
              )}

              <button className="btn" onClick={handleNext} disabled={loading}>
                {loading ? 'Processing...' : 'Continue'}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label htmlFor="guestName">Full Name</label>
                <input 
                  type="text"
                  id="guestName"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleChange}
                  aria-invalid={!!errors.guestName}
                  placeholder="Enter your full name"
                />
                {errors.guestName && <span className="error">{errors.guestName}</span>}
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
                  placeholder="Enter your email"
                />
                {errors.guestEmail && <span className="error">{errors.guestEmail}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="guestPhone">Phone Number</label>
                <input 
                  type="tel"
                  id="guestPhone"
                  name="guestPhone"
                  value={formData.guestPhone}
                  onChange={handleChange}
                  aria-invalid={!!errors.guestPhone}
                  placeholder="Enter your phone number"
                />
                {errors.guestPhone && <span className="error">{errors.guestPhone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="specialRequests">Special Requests (Optional)</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requests?"
                  rows="3"
                />
              </div>

              {selectedRoom && nights > 0 && (
                <div className="price-summary">
                  <p><strong>Room:</strong> {selectedRoom.name}</p>
                  <p><strong>Check-in:</strong> {formData.checkIn}</p>
                  <p><strong>Check-out:</strong> {formData.checkOut}</p>
                  <p><strong>{nights} night{nights > 1 ? 's' : ''}:</strong> {format(selectedRoom.price * nights)}</p>
                </div>
              )}

              {errors.submit && <div className="error submit-error">{errors.submit}</div>}

              <div className="button-group">
                <button className="btn btn-outline" onClick={handleBack} disabled={loading}>
                  Back
                </button>
                <button className="btn" onClick={handleNext} disabled={loading}>
                  {loading ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Booking;
