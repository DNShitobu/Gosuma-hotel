import Rooms from '../components/Rooms/Rooms';
import RoomModal from '../components/RoomModal/RoomModal';
import RoomComparison from '../components/RoomComparison/RoomComparison';
import { useState } from 'react';

const RoomsPage = () => {
  const [showComparison, setShowComparison] = useState(false);
  const [rooms, setRooms] = useState([]);

  return (
    <>
      <section style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="container">
          <Rooms />
          <button 
            className="compare-rooms-btn"
            onClick={() => setShowComparison(true)}
            style={{
              position: 'relative',
              margin: '30px auto',
              padding: '15px 25px',
              background: 'var(--primary)',
              color: '#fff',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'block',
              boxShadow: '0 4px 15px rgba(75, 83, 32, 0.4)'
            }}
          >
            Compare Rooms
          </button>
          
          {showComparison && (
            <RoomComparison 
              rooms={rooms} 
              onClose={() => setShowComparison(false)} 
            />
          )}
        </div>
      </section>
      <RoomModal />
    </>
  );
};

export default RoomsPage;
