import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = join(__dirname, '../data');
const dataFile = join(dataDir, 'data.json');

if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const defaultData = {
  rooms: [
    {
      id: 1,
      name: 'Standard Room',
      type: 'standard',
      price: 80,
      capacity: 2,
      description: 'Comfortable and affordable accommodation with essential amenities',
      amenities: ['WiFi', 'TV', 'AC', 'Safe', 'Coffee Maker'],
      imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
      totalCount: 30
    },
    {
      id: 2,
      name: 'Deluxe Room',
      type: 'deluxe',
      price: 120,
      capacity: 3,
      description: 'Spacious rooms with modern amenities and work desk',
      amenities: ['WiFi', 'TV', 'AC', 'Safe', 'Minibar', 'Work Desk'],
      imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
      totalCount: 50
    },
    {
      id: 3,
      name: 'Executive Suite',
      type: 'suite',
      price: 180,
      capacity: 4,
      description: 'Luxury suite with premium features, living area and bathtub',
      amenities: ['WiFi', 'TV', 'AC', 'Safe', 'Minibar', 'Living Area', 'Bathtub'],
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
      totalCount: 21
    }
  ],
  bookings: [],
  reviews: [
    {
      id: 1,
      name: 'Samapent',
      role: 'Guest',
      text: 'I like everything at the hotel, the neat and beautiful rooms, variety of food at the restaurant, cool bar and a nice swimming pool, the professionalism, cheerfulness and humility of the staff and the excellent security.',
      rating: 5
    },
    {
      id: 2,
      name: 'Adventure',
      role: 'Guest',
      text: 'I enjoy my stay at this hotel in Accra and would love to comeback to this place again. The personnel is friendly and caring.',
      rating: 5
    },
    {
      id: 3,
      name: 'Victor G',
      role: 'Guest',
      text: 'Conveniently located close to the airport and malls, this hotel is great. The rooms are well cleaned and spacious and reasonably affordable.',
      rating: 4
    }
  ],
  auditLog: []
};

let data;

try {
  if (existsSync(dataFile)) {
    const fileContent = readFileSync(dataFile, 'utf-8');
    data = JSON.parse(fileContent);
    if (!data.rooms || data.rooms.length === 0) {
      data = defaultData;
      saveData();
    }
  } else {
    data = defaultData;
    saveData();
  }
} catch (error) {
  console.error('Error loading data:', error);
  data = defaultData;
  saveData();
}

function saveData() {
  try {
    writeFileSync(dataFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

export const db = {
  getRooms: () => data.rooms,
  
  getRoomById: (id) => data.rooms.find(r => r.id === parseInt(id)),
  
  getBookings: () => data.bookings,
  
  getBookingById: (id) => data.bookings.find(b => b.id === id),
  
  createBooking: (booking) => {
    const newBooking = {
      ...booking,
      createdAt: new Date().toISOString()
    };
    data.bookings.push(newBooking);
    saveData();
    return newBooking;
  },
  
  updateBookingStatus: (id, status) => {
    const booking = data.bookings.find(b => b.id === id);
    if (booking) {
      const oldStatus = booking.status;
      booking.status = status;
      data.auditLog.push({
        bookingId: id,
        action: 'status_change',
        oldStatus,
        newStatus: status,
        createdAt: new Date().toISOString()
      });
      saveData();
      return booking;
    }
    return null;
  },
  
  cancelBooking: (id) => {
    const booking = data.bookings.find(b => b.id === id);
    if (booking) {
      const oldStatus = booking.status;
      booking.status = 'cancelled';
      data.auditLog.push({
        bookingId: id,
        action: 'cancelled',
        oldStatus,
        newStatus: 'cancelled',
        createdAt: new Date().toISOString()
      });
      saveData();
      return booking;
    }
    return null;
  },
  
  getBookedCount: (roomId, checkIn, checkOut) => {
    return data.bookings.filter(b => 
      b.roomId === parseInt(roomId) &&
      ['pending', 'confirmed'].includes(b.status) &&
      b.checkIn < checkOut &&
      b.checkOut > checkIn
    ).length;
  },
  
  getStats: () => {
    const now = new Date().toISOString().split('T')[0];
    return {
      totalBookings: data.bookings.length,
      pendingBookings: data.bookings.filter(b => b.status === 'pending').length,
      confirmedBookings: data.bookings.filter(b => b.status === 'confirmed').length,
      totalRevenue: data.bookings
        .filter(b => ['confirmed', 'completed'].includes(b.status))
        .reduce((sum, b) => sum + b.totalPrice, 0),
      todayCheckIns: data.bookings.filter(b => b.checkIn === now && b.status === 'confirmed').length,
      todayCheckOuts: data.bookings.filter(b => b.checkOut === now && b.status === 'confirmed').length
    };
  },

  getReviews: () => data.reviews,

  createReview: (review) => {
    const newReview = {
      id: Date.now(),
      ...review,
      createdAt: new Date().toISOString()
    };
    data.reviews.push(newReview);
    saveData();
    return newReview;
  },

  deleteReview: (id) => {
    const index = data.reviews.findIndex(r => r.id === parseInt(id));
    if (index > -1) {
      data.reviews.splice(index, 1);
      saveData();
      return true;
    }
    return false;
  }
};

export default db;
