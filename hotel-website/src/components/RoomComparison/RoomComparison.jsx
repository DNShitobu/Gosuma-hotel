import { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import './RoomComparison.css';

const RoomComparison = ({ rooms, onClose }) => {
  const { format } = useCurrency();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [showAllRooms, setShowAllRooms] = useState(false);

  const toggleRoom = (room) => {
    if (selectedRooms.find(r => r.id === room.id)) {
      setSelectedRooms(selectedRooms.filter(r => r.id !== room.id));
    } else if (selectedRooms.length < 3) {
      setSelectedRooms([...selectedRooms, room]);
    }
  };

  const displayRooms = showAllRooms ? rooms : rooms.slice(0, 6);

  return (
    <div className="room-comparison-overlay" onClick={onClose}>
      <div className="room-comparison-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>Compare Rooms</h2>
        <p className="subtitle">Select up to 3 rooms to compare</p>

        {!showAllRooms && rooms.length > 6 && (
          <button className="show-more-btn" onClick={() => setShowAllRooms(true)}>
            Show all {rooms.length} rooms
          </button>
        )}

        <div className="room-selection-grid">
          {displayRooms.map(room => (
            <div 
              key={room.id}
              className={`selection-card ${selectedRooms.find(r => r.id === room.id) ? 'selected' : ''}`}
              onClick={() => toggleRoom(room)}
            >
              <img src={room.imageUrl} alt={room.name} />
              <div className="selection-info">
                <h4>{room.name}</h4>
                <p className="price">{format(room.price)}/night</p>
              </div>
              <div className="check-mark">
                {selectedRooms.find(r => r.id === room.id) && '✓'}
              </div>
            </div>
          ))}
        </div>

        {selectedRooms.length > 0 && (
          <div className="comparison-table">
            <h3>Comparison</h3>
            <table>
              <tbody>
                <tr>
                  <th>Price</th>
                  {selectedRooms.map(room => (
                    <td key={room.id}>{format(room.price)}/night</td>
                  ))}
                </tr>
                <tr>
                  <th>Capacity</th>
                  {selectedRooms.map(room => (
                    <td key={room.id}>Up to {room.capacity} guests</td>
                  ))}
                </tr>
                <tr>
                  <th>Description</th>
                  {selectedRooms.map(room => (
                    <td key={room.id}>{room.description}</td>
                  ))}
                </tr>
                <tr>
                  <th>Amenities</th>
                  {selectedRooms.map(room => (
                    <td key={room.id}>
                      <div className="amenities-list">
                        {room.amenities.map((a, i) => <span key={i}>{a}</span>)}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Available</th>
                  {selectedRooms.map(room => (
                    <td key={room.id}>{room.available} rooms</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomComparison;
