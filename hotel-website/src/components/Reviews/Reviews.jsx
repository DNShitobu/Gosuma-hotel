import { useState, useEffect } from 'react';
import './Reviews.css';

const API_URL = 'http://localhost:3001/api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="reviews" id="reviews">
        <div className="container">
          <h2 className="section-title">Guest Reviews</h2>
          <p className="loading">Loading reviews...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <h2 className="section-title">Guest Reviews</h2>
        
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-rating">
                {'★'.repeat(review.rating || 5)}
              </div>
              <div className="review-icon">"</div>
              <p className="review-text">{review.text}</p>
              <div className="review-author">
                <span className="author-name">{review.name}</span>
                <span className="author-role">{review.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
