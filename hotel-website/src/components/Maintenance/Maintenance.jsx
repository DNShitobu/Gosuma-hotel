import { useState } from 'react';
import './Maintenance.css';

const Maintenance = () => {
  const [requests, setRequests] = useState([
    { id: 1, room: 301, issue: 'AC not cooling', priority: 'high', status: 'pending', reported: '2026-02-20', assignedTo: null },
    { id: 2, room: 205, issue: 'Leaking faucet', priority: 'medium', status: 'in-progress', reported: '2026-02-19', assignedTo: 'John Tech' },
    { id: 3, room: 412, issue: 'TV no signal', priority: 'low', status: 'completed', reported: '2026-02-18', assignedTo: 'Mike Tech' },
    { id: 4, room: 108, issue: 'Door lock malfunction', priority: 'high', status: 'in-progress', reported: '2026-02-20', assignedTo: 'Sam Tech' },
    { id: 5, room: 506, issue: 'WiFi not working', priority: 'medium', status: 'pending', reported: '2026-02-21', assignedTo: null }
  ]);

  const [newRequest, setNewRequest] = useState({ room: '', issue: '', priority: 'medium' });
  const [activeFilter, setActiveFilter] = useState('all');

  const technicians = [
    { id: 1, name: 'John Tech', specialty: 'HVAC', tasks: 3, status: 'busy' },
    { id: 2, name: 'Mike Tech', specialty: 'Electrical', tasks: 2, status: 'available' },
    { id: 3, name: 'Sam Tech', specialty: 'Plumbing', tasks: 4, status: 'busy' },
    { id: 4, name: 'Joe Tech', specialty: 'General', tasks: 1, status: 'available' }
  ];

  const addRequest = () => {
    if (!newRequest.room || !newRequest.issue) return;
    setRequests([{
      id: Date.now(),
      ...newRequest,
      status: 'pending',
      reported: new Date().toISOString().split('T')[0],
      assignedTo: null
    }, ...requests]);
    setNewRequest({ room: '', issue: '', priority: 'medium' });
  };

  const updateStatus = (id, status) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
  };

  const filteredRequests = activeFilter === 'all' 
    ? requests 
    : requests.filter(r => r.status === activeFilter);

  const priorityColors = { high: '#e74c3c', medium: '#f39c12', low: '#3498db' };
  const statusColors = { pending: '#f39c12', 'in-progress': '#3498db', completed: '#27ae60' };

  return (
    <section className="maintenance-section" id="maintenance">
      <div className="container">
        <h2 className="section-title">Maintenance Management</h2>
        <p className="section-subtitle">Track and resolve hotel maintenance issues</p>

        <div className="maintenance-stats">
          <div className="stat">
            <span className="value">{requests.length}</span>
            <span className="label">Total Requests</span>
          </div>
          <div className="stat pending">
            <span className="value">{requests.filter(r => r.status === 'pending').length}</span>
            <span className="label">Pending</span>
          </div>
          <div className="stat progress">
            <span className="value">{requests.filter(r => r.status === 'in-progress').length}</span>
            <span className="label">In Progress</span>
          </div>
          <div className="stat completed">
            <span className="value">{requests.filter(r => r.status === 'completed').length}</span>
            <span className="label">Completed</span>
          </div>
        </div>

        <div className="add-request-form">
          <h3>Report New Issue</h3>
          <div className="form-row">
            <input
              type="text"
              placeholder="Room Number"
              value={newRequest.room}
              onChange={(e) => setNewRequest({...newRequest, room: e.target.value})}
            />
            <input
              type="text"
              placeholder="Describe the issue..."
              value={newRequest.issue}
              onChange={(e) => setNewRequest({...newRequest, issue: e.target.value})}
            />
            <select
              value={newRequest.priority}
              onChange={(e) => setNewRequest({...newRequest, priority: e.target.value})}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button className="btn" onClick={addRequest}>Submit</button>
          </div>
        </div>

        <div className="filter-tabs">
          {['all', 'pending', 'in-progress', 'completed'].map(filter => (
            <button
              key={filter}
              className={activeFilter === filter ? 'active' : ''}
              onClick={() => setActiveFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="requests-list">
          {filteredRequests.map(request => (
            <div key={request.id} className="request-card">
              <div className="request-header">
                <span className="room">Room {request.room}</span>
                <span className="priority" style={{ background: priorityColors[request.priority] }}>
                  {request.priority}
                </span>
              </div>
              <p className="issue">{request.issue}</p>
              <div className="request-footer">
                <span className="reported">Reported: {request.reported}</span>
                <span className="assigned">
                  {request.assignedTo ? `Assigned: ${request.assignedTo}` : 'Unassigned'}
                </span>
                <select
                  value={request.status}
                  onChange={(e) => updateStatus(request.id, e.target.value)}
                  style={{ color: statusColors[request.status] }}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="technicians-section">
          <h3>Technical Staff</h3>
          <div className="technicians-grid">
            {technicians.map(tech => (
              <div key={tech.id} className="tech-card">
                <div className="tech-avatar">{tech.name.charAt(0)}</div>
                <h4>{tech.name}</h4>
                <p className="specialty">{tech.specialty}</p>
                <p className="tasks">{tech.tasks} active tasks</p>
                <span className={`status ${tech.status}`}>{tech.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Maintenance;
