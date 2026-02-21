import { useState, useEffect } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import hotelConfig from '../../config/hotelConfig';
import './Rooms.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const Rooms = () => {
  const { format, currency } = useCurrency();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [capacityFilter, setCapacityFilter] = useState('all');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${API_URL}/rooms`);
        const data = await response.json();
        
        // Merge API data with hotelConfig room types
        const mergedRooms = data.map((room, index) => {
          const configRoom = hotelConfig.roomTypes.find(r => r.id === room.id) || hotelConfig.roomTypes[index];
          return {
            ...room,
            name: configRoom?.name || room.name,
            description: configRoom?.description || room.description,
            capacity: configRoom?.capacity || room.capacity,
            amenities: configRoom?.amenities || room.amenities
          };
        });
        
        setRooms(mergedRooms);
        setFilteredRooms(mergedRooms);
      } catch (error) {
        // Fallback to hotelConfig if API fails
        setRooms(hotelConfig.roomTypes);
        setFilteredRooms(hotelConfig.roomTypes);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    let filtered = [...rooms];

    if (searchTerm) {
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceFilter !== 'all') {
      const [min, max] = priceFilter.split('-').map(Number);
      filtered = filtered.filter(room => room.price >= min && room.price <= max);
    }

    if (capacityFilter !== 'all') {
      filtered = filtered.filter(room => room.capacity >= parseInt(capacityFilter));
    }

    setFilteredRooms(filtered);
  }, [searchTerm, priceFilter, capacityFilter, rooms]);

  const getPriceLabel = () => {
    switch(currency) {
      case 'TZS': return '/night';
      case 'USD': return '/night';
      case 'EUR': return '/night';
      default: return '/night';
    }
  };

  if (loading) {
    return (
      <section className="rooms" id="rooms">
        <div className="container">
          <h2 className="section-title">Our Rooms</h2>
          <p className="section-subtitle">Find Comfort in our Rooms</p>
          <p className="loading">Loading rooms...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="rooms" id="rooms">
      <div className="container">
        <h2 className="section-title">Our Rooms</h2>
        <p className="section-subtitle">Find Comfort in our Rooms</p>
        
        <div className="rooms-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
              <option value="all">All Prices</option>
              <option value="0-200000">Under 200,000 {hotelConfig.settings.currencySymbol}</option>
              <option value="200000-350000">200,000 - 350,000 {hotelConfig.settings.currencySymbol}</option>
              <option value="350000-500000">350,000 - 500,000 {hotelConfig.settings.currencySymbol}</option>
              <option value="500000-9999999">500,000+ {hotelConfig.settings.currencySymbol}</option>
            </select>
            <select value={capacityFilter} onChange={(e) => setCapacityFilter(e.target.value)}>
              <option value="all">Any Capacity</option>
              <option value="2">2+ Guests</option>
              <option value="3">3+ Guests</option>
              <option value="4">4+ Guests</option>
            </select>
          </div>
        </div>

        {filteredRooms.length === 0 ? (
          <p className="no-results">No rooms match your criteria</p>
        ) : (
          <div className="rooms-grid">
            {filteredRooms.map((room) => (
              <div className="room-card" key={room.id}>
                <div className="room-image">
                  <img src={room.imageUrl} alt={room.name} />
                </div>
                <div className="room-content">
                  <h3>{room.name}</h3>
                  <p className="room-description">{room.description}</p>
                  <p className="room-price">From {format(room.price)}{getPriceLabel()}</p>
                  <p className="room-availability">
                    {room.available > 0 ? `${room.available} rooms available` : 'Sold out'}
                  </p>
                  <p className="room-capacity">👤 Up to {room.capacity} guests</p>
                  {room.amenities && (
                    <div className="room-amenities">
                      {room.amenities.slice(0, 4).map((amenity, i) => (
                        <span key={i} className="amenity-tag">{amenity}</span>
                      ))}
                    </div>
                  )}
                  <a href="#book" className="btn-outline">Book Now</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Rooms;
