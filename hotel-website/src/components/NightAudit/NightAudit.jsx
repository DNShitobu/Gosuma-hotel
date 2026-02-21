import { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import './NightAudit.css';

const NightAudit = () => {
  const { format } = useCurrency();
  const [auditDate, setAuditDate] = useState('2026-02-20');
  const [isRunning, setIsRunning] = useState(false);

  const auditData = {
    rooms: { total: 101, occupied: 87, vacant: 12, maintenance: 2 },
    arrivals: 15,
    departures: 8,
    revenue: {
      rooms: 12400,
      fnb: 3200,
      spa: 890,
      other: 450,
      total: 16940
    },
    payments: {
      cash: 2400,
      card: 12300,
      credit: 2240
    },
    adjustments: [
      { type: 'Refund', amount: -150, reason: 'Service complaint' },
      { type: 'Correction', amount: 80, reason: 'Rate adjustment' },
      { type: 'Charge', amount: 45, reason: 'Late checkout fee' }
    ]
  };

  const runAudit = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      alert('Night audit completed successfully!');
    }, 2000);
  };

  return (
    <section className="nightaudit-section" id="nightaudit">
      <div className="container">
        <h2 className="section-title">Night Audit</h2>
        <p className="section-subtitle">Daily financial reconciliation</p>

        <div className="audit-header">
          <div className="date-selector">
            <label>Audit Date:</label>
            <input type="date" value={auditDate} onChange={(e) => setAuditDate(e.target.value)} />
          </div>
          <button className="btn-run" onClick={runAudit} disabled={isRunning}>
            {isRunning ? 'Running Audit...' : 'Run Night Audit'}
          </button>
        </div>

        <div className="audit-grid">
          <div className="audit-card">
            <h3>Room Status</h3>
            <div className="room-status">
              <div className="status-item">
                <span className="value">{auditData.rooms.total}</span>
                <span className="label">Total</span>
              </div>
              <div className="status-item occupied">
                <span className="value">{auditData.rooms.occupied}</span>
                <span className="label">Occupied</span>
              </div>
              <div className="status-item vacant">
                <span className="value">{auditData.rooms.vacant}</span>
                <span className="label">Vacant</span>
              </div>
              <div className="status-item maint">
                <span className="value">{auditData.rooms.maintenance}</span>
                <span className="label">Maintenance</span>
              </div>
            </div>
            <p className="occupancy-rate">Occupancy: {Math.round((auditData.rooms.occupied / auditData.rooms.total) * 100)}%</p>
          </div>

          <div className="audit-card">
            <h3>Guest Movements</h3>
            <div className="movements">
              <div className="movement arrival">
                <span className="icon">⬇️</span>
                <span className="count">{auditData.arrivals}</span>
                <span className="label">Arrivals</span>
              </div>
              <div className="movement departure">
                <span className="icon">⬆️</span>
                <span className="count">{auditData.departures}</span>
                <span className="label">Departures</span>
              </div>
            </div>
          </div>

          <div className="audit-card wide">
            <h3>Revenue Summary</h3>
            <table className="revenue-table">
              <tbody>
                <tr>
                  <td>Room Revenue</td>
                  <td>{format(auditData.revenue.rooms)}</td>
                </tr>
                <tr>
                  <td>Food & Beverage</td>
                  <td>{format(auditData.revenue.fnb)}</td>
                </tr>
                <tr>
                  <td>Spa & Wellness</td>
                  <td>{format(auditData.revenue.spa)}</td>
                </tr>
                <tr>
                  <td>Other</td>
                  <td>{format(auditData.revenue.other)}</td>
                </tr>
                <tr className="total">
                  <td>Total Revenue</td>
                  <td>{format(auditData.revenue.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="audit-card">
            <h3>Payment Methods</h3>
            <div className="payment-breakdown">
              {Object.entries(auditData.payments).map(([method, amount]) => (
                <div key={method} className="payment-item">
                  <span className="method">{method}</span>
                  <span className="amount">{format(amount)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="audit-card">
            <h3>Adjustments</h3>
            <div className="adjustments-list">
              {auditData.adjustments.map((adj, i) => (
                <div key={i} className="adjustment">
                  <span className="type">{adj.type}</span>
                  <span className={`amount ${adj.amount < 0 ? 'negative' : 'positive'}`}>
                    {adj.amount > 0 ? '+' : ''}{format(adj.amount)}
                  </span>
                  <span className="reason">{adj.reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="audit-actions">
          <button className="btn-secondary">Print Report</button>
          <button className="btn-secondary">Email to GM</button>
          <button className="btn-primary">Finalize & Close Day</button>
        </div>
      </div>
    </section>
  );
};

export default NightAudit;
