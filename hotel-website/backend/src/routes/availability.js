import express from 'express';
import db from '../config/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const { checkIn, checkOut, roomType } = req.query;

    if (!checkIn || !checkOut) {
      return res.status(400).json({ error: 'Check-in and check-out dates required' });
    }

    let rooms = db.getRooms();

    if (roomType) {
      rooms = rooms.filter(r => r.type === roomType);
    }

    const availableRooms = rooms.map(room => {
      const bookedCount = db.getBookedCount(room.id, checkIn, checkOut);
      return {
        ...room,
        available: room.totalCount - bookedCount
      };
    }).filter(room => room.available > 0);

    res.json(availableRooms);
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ error: 'Failed to check availability' });
  }
});

router.get('/calendar/:roomId', (req, res) => {
  try {
    const { roomId } = req.params;
    const { month, year } = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const room = db.getRoomById(roomId);
    const bookings = db.getBookings().filter(b => 
      parseInt(roomId) === b.roomId &&
      ['pending', 'confirmed'].includes(b.status) &&
      b.checkIn <= endDate.toISOString().split('T')[0] &&
      b.checkOut >= startDate.toISOString().split('T')[0]
    );

    const calendar = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const bookedOnDate = bookings.filter(b => b.checkIn <= dateStr && b.checkOut > dateStr);
      
      calendar.push({
        date: dateStr,
        available: bookedOnDate.length < (room?.totalCount || 1),
        bookedCount: bookedOnDate.length
      });
    }

    res.json(calendar);
  } catch (error) {
    console.error('Error fetching calendar:', error);
    res.status(500).json({ error: 'Failed to fetch calendar' });
  }
});

export default router;
