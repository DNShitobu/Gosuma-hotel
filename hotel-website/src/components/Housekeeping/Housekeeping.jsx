import { useState, useEffect } from 'react';
import './Housekeeping.css';

const API_URL = 'http://localhost:3001/api';

const Housekeeping = () => {
  const [rooms, setRooms] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [staff, setStaff] = useState([
    { id: 1, name: 'Mary Johnson', shift: 'Morning', roomsAssigned: 8 },
    { id: 2, name: 'Grace Smith', shift: 'Morning', roomsAssigned: 7 },
    { id: 3, name: 'Jane Doe', shift: 'Evening', roomsAssigned: 6 },
    { id: 4, name: 'Sarah Williams', shift: 'Evening', roomsAssigned: 5 }
  ]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeTab, setActiveTab] = useState('rooms');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${API_URL}/rooms`);
      const data = await res.json();
      setRooms(data.map(room => ({
        ...room,
        status: getRandomStatus(),
        lastCleaned: getRandomDate(),
        assignedTo: staff[Math.floor(Math.random() * staff.length)]?.name
      })));
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const getRandomStatus = () => {
    const statuses = ['clean', 'dirty', 'inspected', 'in-progress', 'vacant'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getRandomDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 7));
    return date.toLocaleDateString();
  };

  const updateRoomStatus = (roomId, newStatus) => {
    setRooms(rooms.map(r => r.id === roomId ? { ...r, status: newStatus } : r));
  };

  const statusColors = {
    clean: '#27ae60',
    dirty: '#e74c3c',
    inspected: '#3498db',
    'in-progress': '#f39c12',
    vacant: '#9b59b6'
  };

  const totalRooms = rooms.length;
  const cleanRooms = rooms.filter(r => r.status === 'clean').length;
  const dirtyRooms = rooms.filter(r => r.status === 'dirty').length;
  const inProgress = rooms.filter(r => r.status === 'in-progress').length;

  return (
    <section className="housekeeping-section" id="housekeeping">
      <div className="container">
        <h2 className="section-title">Housekeeping Management</h2>
        <p className="section-subtitle">Track room status and cleaning schedules</p>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">{totalRooms}</span>
            <span className="stat-label">Total Rooms</span>
          </div>
          <div className="stat-card clean">
            <span className="stat-number">{cleanRooms}</span>
            <span className="stat-label">Clean</span>
          </div>
          <div className="stat-card dirty">
            <span className="stat-number">{dirtyRooms}</span>
            <span className="stat-label">Dirty</span>
          </div>
          <div className="stat-card progress">
            <span className="stat-number">{inProgress}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>

        <div className="housekeeping-tabs">
          <button 
            className={`tab ${activeTab === 'rooms' ? 'active' : ''}`}
            onClick={() => setActiveTab('rooms')}
          >
            Room Status
          </button>
          <button 
            className={`tab ${activeTab === 'staff' ? 'active' : ''}`}
            onClick={() => setActiveTab('staff')}
          >
            Staff Schedule
          </button>
          <button 
            className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            Task Queue
          </button>
        </div>

        {activeTab === 'rooms' && (
          <div className="rooms-grid">
            {rooms.map(room => (
              <div key={room.id} className="room-status-card">
                <div className="room-header">
                  <h4>Room {room.id}</h4>
                  <span 
                    className="status-badge"
                    style={{ background: statusColors[room.status] }}
                  >
                    {room.status}
                  </span>
                </div>
                <p className="room-type">{room.name}</p>
                <p className="assigned-to">Assigned: {room.assignedTo}</p>
                <p className="last-cleaned">Last cleaned: {room.lastCleaned}</p>
                <div className="room-actions">
                  <select 
                    value={room.status}
                    onChange={(e) => updateRoomStatus(room.id, e.target.value)}
                  >
                    <option value="clean">Clean</option>
                    <option value="dirty">Dirty</option>
                    <option value="in-progress">In Progress</option>
                    <option value="inspected">Inspected</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="staff-grid">
            {staff.map(member => (
              <div key={member.id} className="staff-card">
                <div className="staff-avatar">
                  {member.name.charAt(0)}
                </div>
                <h4>{member.name}</h4>
                <p className="shift">{member.shift} Shift</p>
                <p className="rooms-assigned">{member.roomsAssigned} rooms assigned</p>
                <button className="btn-small">View Schedule</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="tasks-list">
            {rooms.filter(r => r.status !== 'clean').map(room => (
              <div key={room.id} className="task-item">
                <div className="task-info">
                  <h4>Room {room.id} - {room.name}</h4>
                  <p>{room.status === 'dirty' ? 'Deep cleaning required' : 'Finish cleaning'}</p>
                </div>
                <div className="task-assignee">
                  <span>{room.assignedTo}</span>
                </div>
                <div className="task-priority">
                  <span className={`priority ${room.status === 'dirty' ? 'high' : 'normal'}`}>
                    {room.status === 'dirty' ? 'High' : 'Normal'}
                  </span>
                </div>
                <button className="btn-complete">Complete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Housekeeping;
