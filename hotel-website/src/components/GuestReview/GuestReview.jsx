import { useState } from 'react';
import './GuestReview.css';

const API_URL = 'http://localhost:3001/api';

const GuestReview = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookingId: '',
    rating: 5,
    text: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.text.trim()) newErrors.text = 'Review text is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', bookingId: '', rating: 5, text: '' });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  if (submitted) {
    return (
      <section className="guest-review" id="review">
        <div className="container">
          <div className="review-success">
            <span className="success-icon">✓</span>
            <h3>Thank you for your review!</h3>
            <p>Your feedback helps us improve our service.</p>
            <button className="btn" onClick={() => setSubmitted(false)}>
              Write Another Review
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="guest-review" id="review">
      <div className="container">
        <h2 className="section-title">Share Your Experience</h2>
        <p className="section-subtitle">We value your feedback</p>

        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Booking ID (Optional)</label>
              <input
                type="text"
                name="bookingId"
                value={formData.bookingId}
                onChange={handleChange}
                placeholder="Enter your booking ID"
              />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <div className="rating-select">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    className={`star ${star <= formData.rating ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Your Review</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              placeholder="Tell us about your experience..."
              rows="5"
            />
            {errors.text && <span className="error">{errors.text}</span>}
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default GuestReview;
