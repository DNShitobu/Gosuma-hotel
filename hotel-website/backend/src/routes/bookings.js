import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { body, param, validationResult, query } from 'express-validator';
import db from '../config/database.js';

const router = express.Router();

const sanitizeInput = (value) => {
  if (typeof value === 'string') {
    return value.replace(/[<>\"\'%;()&+]/g, '').trim();
  }
  return value;
};

const validateBooking = [
  body('roomId').isInt({ min: 1 }).withMessage('Valid room ID required').trim(),
  body('guestName').trim().notEmpty().isLength({ max: 100 }).withMessage('Guest name required').escape(),
  body('guestEmail').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('guestPhone').trim().notEmpty().isLength({ max: 20 }).withMessage('Phone number required'),
  body('checkIn').notEmpty().withMessage('Check-in date required').isISO8601().withMessage('Invalid date format'),
  body('checkOut').notEmpty().withMessage('Check-out date required').isISO8601().withMessage('Invalid date format'),
  body('guests').isInt({ min: 1, max: 10 }).withMessage('Number of guests must be between 1 and 10'),
  body('specialRequests').optional().isLength({ max: 500 }).withMessage('Special requests too long')
];

const calculateNights = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

router.post('/', validateBooking, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(e => ({ field: e.path, message: e.msg })) });
  }

  try {
    const { roomId, guestName, guestEmail, guestPhone, checkIn, checkOut, guests, currency, specialRequests } = req.body;

    const sanitizedName = sanitizeInput(guestName);
    const sanitizedPhone = sanitizeInput(guestPhone);
    const sanitizedRequests = specialRequests ? sanitizeInput(specialRequests) : null;

    const nights = calculateNights(checkIn, checkOut);
    if (nights < 1) {
      return res.status(400).json({ error: 'Check-out must be after check-in' });
    }

    if (nights > 365) {
      return res.status(400).json({ error: 'Maximum stay is 365 nights' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkInDate = new Date(checkIn);
    if (checkInDate < today) {
      return res.status(400).json({ error: 'Check-in date cannot be in the past' });
    }

    const room = db.getRoomById(parseInt(roomId));
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const bookedCount = db.getBookedCount(parseInt(roomId), checkIn, checkOut);
    const available = room.totalCount - bookedCount;
    
    if (available < 1) {
      return res.status(400).json({ error: 'No rooms available for selected dates' });
    }

    const totalPrice = room.price * nights;
    const bookingId = uuidv4();

    const booking = db.createBooking({
      id: bookingId,
      roomId: parseInt(roomId),
      guestName: sanitizedName,
      guestEmail,
      guestPhone: sanitizedPhone,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      currency: currency || 'USD',
      status: 'pending',
      specialRequests: sanitizedRequests
    });

    res.status(201).json({
      success: true,
      booking: {
        id: booking.id,
        roomId: booking.roomId,
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
        totalPrice: booking.totalPrice,
        currency: booking.currency,
        status: booking.status
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

router.get('/confirmation/:id', [
  param('id').isUUID().withMessage('Invalid booking ID')
], (req, res) => {
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
      roomName: room?.name,
      roomType: room?.type,
      roomImage: room?.imageUrl,
      guestName: booking.guestName,
      guestEmail: booking.guestEmail,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests,
      totalPrice: booking.totalPrice,
      currency: booking.currency,
      status: booking.status,
      specialRequests: booking.specialRequests
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

export default router;
