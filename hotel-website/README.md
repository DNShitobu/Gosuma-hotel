# Airport View Hotel

A modern hotel booking website with full-stack functionality, featuring international white and army blue brand colors.

## Features

- **Room Booking**: Real-time room availability and booking system
- **Multi-currency Support**: USD, EUR, GBP, GHS, NGN, ZAR
- **Responsive Design**: Works on all devices
- **Admin Panel**: Manage bookings and view statistics

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: JSON file storage

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. **Install Frontend Dependencies**
   ```bash
   cd hotel-website
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd hotel-website/backend
   npm install
   ```

### Running the Application

1. **Start the Backend Server** (Terminal 1)
   ```bash
   cd hotel-website/backend
   npm start
   ```
   Backend runs on http://localhost:3001

2. **Start the Frontend** (Terminal 2)
   ```bash
   cd hotel-website
   npm run dev
   ```
   Frontend runs on http://localhost:5173

### Building for Production

```bash
cd hotel-website
npm run build
```

The built files will be in the `dist` folder.

## Project Structure

```
hotel-website/
├── src/
│   ├── components/      # React components
│   ├── context/        # React context (currency)
│   ├── App.jsx         # Main app component
│   └── index.css       # Global styles
├── backend/
│   ├── src/
│   │   ├── routes/     # API routes
│   │   ├── config/     # Database config
│   │   └── index.js    # Server entry
│   └── data/           # JSON database
└── dist/               # Production build
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rooms` | List all rooms |
| GET | `/api/rooms/:id` | Get room details |
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings/confirmation/:id` | Get booking confirmation |
| GET | `/api/availability` | Check availability |
| GET | `/api/admin/bookings` | List all bookings (admin) |
| PUT | `/api/admin/bookings/:id/status` | Update booking status |
| GET | `/api/admin/stats` | Get hotel statistics |

## Room Types

| Room | Price (USD) | Capacity |
|------|-------------|----------|
| Standard Room | $80/night | 2 Adults |
| Deluxe Room | $120/night | 2 Adults, 1 Child |
| Executive Suite | $180/night | 2 Adults, 2 Children |

## Currency Support

- USD - US Dollar
- EUR - Euro
- GBP - British Pound
- GHS - Ghana Cedis
- NGN - Nigerian Naira
- ZAR - South African Rand

## License

MIT
