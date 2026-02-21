import { useState } from 'react';
import './SpecialRequests.css';

const SpecialRequests = ({ onSave, onCancel }) => {
  const [requests, setRequests] = useState({
    dietary: '',
    earlyCheckIn: false,
    lateCheckOut: false,
    airportTransfer: false,
    extraBed: false,
    babyC cot: false,
    airportPickupTime: '',
    flightNumber: '',
    additionalNotes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(requests);
  };

  return (
    <div className="special-requests-overlay">
      <div className="special-requests-modal">
        <button className="close-btn" onClick={onCancel}>×</button>
        
        <h2>Special Requests</h2>
        <p className="subtitle">Let us know your preferences</p>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h4>Accommodation Preferences</h4>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={requests.earlyCheckIn}
                onChange={(e) => setRequests({...requests, earlyCheckIn: e.target.checked})}
              />
              Early Check-in (before 2 PM) - $20
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={requests.lateCheckOut}
                onChange={(e) => setRequests({...requests, lateCheckOut: e.target.checked})}
              />
              Late Check-out (after 12 PM) - $20
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={requests.extraBed}
                onChange={(e) => setRequests({...requests, extraBed: e.target.checked})}
              />
              Extra Bed - $15/night
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={requests.babyC cot}
                onChange={(e) => setRequests({...requests, babyC cot: e.target.checked})}
              />
              Baby Cot (free)
            </label>
          </div>

          <div className="form-section">
            <h4>Transportation</h4>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={requests.airportTransfer}
                onChange={(e) => setRequests({...requests, airportTransfer: e.target.checked})}
              />
              Airport Transfer
            </label>

            {requests.airportTransfer && (
              <>
                <div className="form-group">
                  <label>Flight Number</label>
                  <input
                    type="text"
                    value={requests.flightNumber}
                    onChange={(e) => setRequests({...requests, flightNumber: e.target.value})}
                    placeholder="e.g., KQ123"
                  />
                </div>
                <div className="form-group">
                  <label>Pickup Time</label>
                  <input
                    type="time"
                    value={requests.airportPickupTime}
                    onChange={(e) => setRequests({...requests, airportPickupTime: e.target.value})}
                  />
                </div>
              </>
            )}
          </div>

          <div className="form-section">
            <h4>Dietary Requirements</h4>
            <select
              value={requests.dietary}
              onChange={(e) => setRequests({...requests, dietary: e.target.value})}
            >
              <option value="">None</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="halal">Halal</option>
              <option value="kosher">Kosher</option>
              <option value="gluten-free">Gluten Free</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-section">
            <h4>Additional Notes</h4>
            <textarea
              value={requests.additionalNotes}
              onChange={(e) => setRequests({...requests, additionalNotes: e.target.value})}
              placeholder="Any other special requests..."
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Requests
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpecialRequests;
