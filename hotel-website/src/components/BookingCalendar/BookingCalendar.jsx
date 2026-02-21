import { useState, useEffect, useCallback } from 'react';
import './BookingCalendar.css';

const API_URL = 'http://localhost:3001/api';

const BookingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [rooms, setRooms] = useState([]);

  const fetchRooms = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/rooms`);
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  }, []);

  const fetchCalendar = useCallback(async () => {
    try {
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const response = await fetch(
        `${API_URL}/availability/calendar/${selectedRoom}?month=${month}&year=${year}`
      );
      const data = await response.json();
      setCalendarData(data);
    } catch (error) {
      console.error('Error fetching calendar:', error);
    }
  }, [currentDate, selectedRoom]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    fetchCalendar();
  }, [fetchCalendar]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDay; i++) {
      days.push({ day: null, empty: true });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayData = calendarData.find(d => d.date === dateStr);
      days.push({
        day: i,
        date: dateStr,
        available: dayData?.available ?? true,
        bookedCount: dayData?.bookedCount ?? 0
      });
    }
    
    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentDate);

  return (
    <section className="booking-calendar" id="calendar">
      <div className="container">
        <h2 className="section-title">Check Availability</h2>
        <p className="section-subtitle">View our room availability calendar</p>

        <div className="calendar-controls">
          <select 
            value={selectedRoom} 
            onChange={(e) => setSelectedRoom(Number(e.target.value))}
          >
            {rooms.map(room => (
              <option key={room.id} value={room.id}>{room.name}</option>
            ))}
          </select>
        </div>

        <div className="calendar-wrapper">
          <div className="calendar-header">
            <button onClick={goToPrevMonth} className="nav-btn">←</button>
            <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
            <button onClick={goToNextMonth} className="nav-btn">→</button>
          </div>

          <div className="calendar-weekdays">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>

          <div className="calendar-days">
            {days.map((day, index) => (
              <div 
                key={index} 
                className={`calendar-day ${day.empty ? 'empty' : ''} ${day.available ? 'available' : 'unavailable'}`}
              >
                {day.day && (
                  <>
                    <span className="day-number">{day.day}</span>
                    {!day.available && <span className="booked-indicator">Full</span>}
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="calendar-legend">
            <span className="legend-item">
              <span className="legend-dot available"></span> Available
            </span>
            <span className="legend-item">
              <span className="legend-dot unavailable"></span> Unavailable
            </span>
          </div>
        </div>

        <div className="calendar-cta">
          <a href="#book" className="btn">Book Now</a>
        </div>
      </div>
    </section>
  );
};

export default BookingCalendar;
