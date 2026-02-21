import express from 'express';
import { body, validationResult } from 'express-validator';
import Stripe from 'stripe';
import db from '../config/database.js';

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

const validatePaymentRequest = [
  body('bookingId').isUUID().withMessage('Invalid booking ID')
];

const validateConfirmPayment = [
  body('bookingId').isUUID().withMessage('Invalid booking ID'),
  body('paymentIntentId').notEmpty().withMessage('Payment intent ID required')
];

router.post('/create-payment-intent', validatePaymentRequest, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const { bookingId } = req.body;
    
    const booking = db.getBookingById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({ error: 'Booking already processed' });
    }

    if (booking.totalPrice <= 0 || booking.totalPrice > 1000000) {
      return res.status(400).json({ error: 'Invalid booking amount' });
    }

    const allowedCurrencies = ['usd', 'eur', 'gbp', 'ghs'];
    const currency = (booking.currency || 'USD').toLowerCase();
    
    if (!allowedCurrencies.includes(currency)) {
      return res.status(400).json({ error: 'Currency not supported' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.totalPrice * 100),
      currency: currency,
      metadata: {
        bookingId: booking.id,
        guestName: booking.guestName,
        roomId: booking.roomId.toString()
      },
      automatic_payment_methods: {
        enabled: true
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: booking.totalPrice,
      currency: booking.currency
    });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

router.post('/confirm-payment', validateConfirmPayment, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const { bookingId, paymentIntentId } = req.body;
    
    const booking = db.getBookingById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      db.updateBookingStatus(bookingId, 'confirmed');
      res.json({ success: true, message: 'Payment confirmed, booking confirmed' });
    } else {
      res.status(400).json({ error: 'Payment not completed' });
    }
  } catch (error) {
    console.error('Error confirming payment:', error.message);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';
  
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const bookingId = paymentIntent.metadata.bookingId;
        if (bookingId) {
          db.updateBookingStatus(bookingId, 'confirmed');
          console.log(`Booking ${bookingId} confirmed via webhook`);
        }
        break;
      }
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object.id);
        break;
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

export default router;
