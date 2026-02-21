import express from 'express';
import { body, param, validationResult } from 'express-validator';
import db from '../config/database.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

const sanitizeInput = (value) => {
  if (typeof value === 'string') {
    return value.replace(/[<>]/g, '').trim();
  }
  return value;
};

const validateReview = [
  body('name').trim().notEmpty().isLength({ max: 100 }).withMessage('Name required'),
  body('text').trim().notEmpty().isLength({ max: 1000 }).withMessage('Review text required'),
  body('role').optional().trim().isLength({ max: 50 }).withMessage('Role too long'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5')
];

const validateId = [
  param('id').isInt().withMessage('Invalid review ID')
];

router.get('/', (req, res) => {
  try {
    const reviews = db.getReviews();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

router.post('/', authMiddleware, validateReview, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(e => ({ field: e.path, message: e.msg })) });
  }

  try {
    const { name, role, text, rating } = req.body;
    
    const sanitizedName = sanitizeInput(name);
    const sanitizedText = sanitizeInput(text);
    const sanitizedRole = role ? sanitizeInput(role) : 'Guest';

    const review = db.createReview({
      name: sanitizedName,
      role: sanitizedRole,
      text: sanitizedText,
      rating: Math.min(Math.max(parseInt(rating) || 5, 1), 5)
    });

    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

router.delete('/:id', authMiddleware, validateId, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Invalid review ID' });
  }

  try {
    const success = db.deleteReview(parseInt(req.params.id));
    
    if (!success) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

export default router;
