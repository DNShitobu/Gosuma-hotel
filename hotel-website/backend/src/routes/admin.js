import express from 'express';
import { body, param, validationResult, query } from 'express-validator';
import db from '../config/database.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

const validateStatus = [
  body('status').isIn(['pending', 'confirmed', 'cancelled', 'completed']).withMessage('Invalid status')
];

const validateId = [
  param('id').isUUID().withMessage('Invalid ID format')
];

router.get('/verify', authMiddleware, (req, res) => {
  res.json({ authenticated: true });
});

router.get('/bookings', authMiddleware, [
  query('status').optional().isIn(['pending', 'confirmed', 'cancelled', 'completed']).withMessage('Invalid status'),
  query('date').optional().isISO8601().withMessage('Invalid date format')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }

  try {
    const { status, date } = req.query;
    
    let bookings = db.getBookings();
    
    if (status) {
      bookings = bookings.filter(b => b.status === status);
    }
    
    if (date) {
      bookings = bookings.filter(b => b.checkIn <= date && b.checkOut >= date);
    }
    
    const formattedBookings = bookings.map(b => {
      const room = db.getRoomById(b.roomId);
      return {
        id: b.id,
        roomId: b.roomId,
        roomName: room?.name,
        roomType: room?.type,
        guestName: b.guestName,
        guestEmail: b.guestEmail,
        guestPhone: b.guestPhone,
        checkIn: b.checkIn,
        checkOut: b.checkOut,
        guests: b.guests,
        totalPrice: b.totalPrice,
        currency: b.currency,
        status: b.status,
        specialRequests: b.specialRequests,
        createdAt: b.createdAt
      };
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json(formattedBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

router.get('/bookings/:id', authMiddleware, validateId, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Invalid booking ID' });
  }

  try {
    const booking = db.getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const room = db.getRoomById(booking.roomId);

    res.json({
      id: booking.id,
      roomId: booking.roomId,
      roomName: room?.name,
      roomType: room?.type,
      roomPrice: room?.price,
      guestName: booking.guestName,
      guestEmail: booking.guestEmail,
      guestPhone: booking.guestPhone,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests,
      totalPrice: booking.totalPrice,
      currency: booking.currency,
      status: booking.status,
      specialRequests: booking.specialRequests,
      createdAt: booking.createdAt
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

router.put('/bookings/:id/status', authMiddleware, [...validateId, ...validateStatus], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const { status } = req.body;
    
    const booking = db.getBookingById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    db.updateBookingStatus(req.params.id, status);

    res.json({ success: true, message: `Booking status updated to ${status}` });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

router.delete('/bookings/:id', authMiddleware, validateId, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Invalid booking ID' });
  }

  try {
    const booking = db.getBookingById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    db.cancelBooking(req.params.id);

    res.json({ success: true, message: 'Booking cancelled' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

router.get('/stats', authMiddleware, (req, res) => {
  try {
    const stats = db.getStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

router.get('/public-stats', (req, res) => {
  try {
    const stats = db.getStats();
    res.json({
      totalBookings: stats.totalBookings,
      confirmedBookings: stats.confirmedBookings
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
