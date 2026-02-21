import { useState, useEffect } from 'react';
import './RoomModal.css';

const API_URL = 'http://localhost:3001/api';

const RoomModal = ({ roomId, onClose }) => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`${API_URL}/rooms/${roomId}`);
        const data = await response.json();
        setRoom(data);
      } catch (error) {
        console.error('Error fetching room:', error);
      } finally {
        setLoading(false);
      }
    };
    if (roomId) fetchRoom();
  }, [roomId]);

  if (!roomId) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="room-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        {loading ? (
          <div className="modal-loading">Loading...</div>
        ) : (
          <>
            <div className="modal-image">
              <img src={room.imageUrl} alt={room.name} />
            </div>
            <div className="modal-content">
              <h2>{room.name}</h2>
              <p className="room-type">{room.type} Room</p>
              <p className="room-desc">{room.description}</p>
              
              <div className="room-details">
                <div className="detail-item">
                  <span className="label">Price</span>
                  <span className="value">${room.price}/night</span>
                </div>
                <div className="detail-item">
                  <span className="label">Capacity</span>
                  <span className="value">Up to {room.capacity} guests</span>
                </div>
                <div className="detail-item">
                  <span className="label">Available</span>
                  <span className="value">{room.available} rooms</span>
                </div>
              </div>

              <div className="room-amenities">
                <h4>Amenities</h4>
                <div className="amenities-list">
                  {room.amenities.map((amenity, index) => (
                    <span key={index} className="amenity-tag">{amenity}</span>
                  ))}
                </div>
              </div>

              <a href="#book" className="btn" onClick={onClose}>
                Book Now - ${room.price}/night
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoomModal;
