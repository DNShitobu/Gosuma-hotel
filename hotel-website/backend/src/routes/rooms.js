import express from 'express';
import db from '../config/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const rooms = db.getRooms().map(room => {
      const bookedToday = db.getBookedCount(room.id, new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0]);
      return {
        ...room,
        available: room.totalCount - bookedToday
      };
    });

    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const room = db.getRoomById(req.params.id);
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const bookedToday = db.getBookedCount(room.id, new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0]);

    res.json({
      ...room,
      available: room.totalCount - bookedToday
    });
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ error: 'Failed to fetch room' });
  }
});

export default router;
