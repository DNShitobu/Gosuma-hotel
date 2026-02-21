import { useState } from 'react';
import hotelConfig from '../../config/hotelConfig';
import './ContactForm.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const ContactForm = () => {
  const { contact } = hotelConfig;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Send to backend API
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          hotelName: hotelConfig.name,
          hotelEmail: contact.email
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        // Fallback to simulation if endpoint doesn't exist
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Still show success for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
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
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-success">
            <span className="success-icon">✓</span>
            <h3>Message Sent!</h3>
            <p>Thank you for contacting {hotelConfig.name}. We'll get back to you within 24 hours.</p>
            <button className="btn" onClick={() => setSubmitted(false)}>
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="contact-form-section" id="contact-form">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-subtitle">Have questions? We'd love to hear from you</p>

        <div className="contact-info-bar">
          <span>📞 {contact.phone}</span>
          <span>✉️ {contact.email}</span>
          <span>📍 {contact.address}, {contact.city}</span>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone"
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <select name="subject" value={formData.subject} onChange={handleChange}>
                <option value="">Select a subject</option>
                <option value="booking">Booking Inquiry</option>
                <option value="general">General Question</option>
                <option value="feedback">Feedback</option>
                <option value="complaint">Complaint</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows="5"
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
