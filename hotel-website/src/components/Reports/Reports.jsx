import { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import './Reports.css';

const Reports = () => {
  const { format } = useCurrency();
  const [dateRange, setDateRange] = useState('month');
  const [activeReport, setActiveReport] = useState('revenue');

  const revenueData = [
    { month: 'Jan', revenue: 45000, occupancy: 72 },
    { month: 'Feb', revenue: 52000, occupancy: 78 },
    { month: 'Mar', revenue: 48000, occupancy: 75 },
    { month: 'Apr', revenue: 61000, occupancy: 82 },
    { month: 'May', revenue: 55000, occupancy: 79 },
    { month: 'Jun', revenue: 68000, occupancy: 88 }
  ];

  const dailyStats = [
    { date: '2026-02-15', checkIns: 12, checkOuts: 8, revenue: 4200, occupancy: 85 },
    { date: '2026-02-16', checkIns: 15, checkOuts: 10, revenue: 5100, occupancy: 88 },
    { date: '2026-02-17', checkIns: 8, checkOuts: 12, revenue: 3800, occupancy: 82 },
    { date: '2026-02-18', checkIns: 18, checkOuts: 14, revenue: 6200, occupancy: 91 },
    { date: '2026-02-19', checkIns: 10, checkOuts: 9, revenue: 4500, occupancy: 86 },
    { date: '2026-02-20', checkIns: 14, checkOuts: 11, revenue: 5400, occupancy: 89 }
  ];

  const roomPerformance = [
    { type: 'Standard', booked: 45, revenue: 36000, occupancy: 75 },
    { type: 'Deluxe', booked: 38, revenue: 45600, occupancy: 82 },
    { type: 'Suite', booked: 22, revenue: 44000, occupancy: 71 },
    { type: 'Executive', booked: 15, revenue: 37500, occupancy: 65 }
  ];

  const sourceBookings = [
    { source: 'Direct Website', count: 156, percentage: 45, revenue: 78000 },
    { source: 'Booking.com', count: 89, percentage: 25, revenue: 44500 },
    { source: 'Expedia', count: 54, percentage: 15, revenue: 27000 },
    { source: 'Walk-in', count: 35, percentage: 10, revenue: 17500 },
    { source: 'Other', count: 18, percentage: 5, revenue: 9000 }
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const avgOccupancy = Math.round(revenueData.reduce((sum, d) => sum + d.occupancy, 0) / revenueData.length);
  const totalBookings = roomPerformance.reduce((sum, r) => sum + r.booked, 0);
  const avgDailyRate = Math.round(totalRevenue / totalBookings);

  return (
    <section className="reports-section" id="reports">
      <div className="container">
        <h2 className="section-title">Reports & Analytics</h2>
        <p className="section-subtitle">Hotel performance insights</p>

        <div className="reports-toolbar">
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>

        <div className="kpi-cards">
          <div className="kpi-card">
            <span className="kpi-label">Total Revenue</span>
            <span className="kpi-value">{format(totalRevenue)}</span>
            <span className="kpi-change positive">+12.5%</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Avg. Occupancy</span>
            <span className="kpi-value">{avgOccupancy}%</span>
            <span className="kpi-change positive">+5.2%</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Total Bookings</span>
            <span className="kpi-value">{totalBookings}</span>
            <span className="kpi-change positive">+8.3%</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Avg. Daily Rate</span>
            <span className="kpi-value">{format(avgDailyRate)}</span>
            <span className="kpi-change negative">-2.1%</span>
          </div>
        </div>

        <div className="report-tabs">
          <button className={activeReport === 'revenue' ? 'active' : ''} onClick={() => setActiveReport('revenue')}>Revenue</button>
          <button className={activeReport === 'occupancy' ? 'active' : ''} onClick={() => setActiveReport('occupancy')}>Occupancy</button>
          <button className={activeReport === 'sources' ? 'active' : ''} onClick={() => setActiveReport('sources')}>Booking Sources</button>
          <button className={activeReport === 'rooms' ? 'active' : ''} onClick={() => setActiveReport('rooms')}>Room Performance</button>
        </div>

        {activeReport === 'revenue' && (
          <div className="report-content">
            <div className="chart-container">
              <h3>Revenue Trend</h3>
              <div className="bar-chart">
                {revenueData.map((data, i) => (
                  <div key={i} className="bar-group">
                    <div className="bar" style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}>
                      <span className="bar-value">{format(data.revenue)}</span>
                    </div>
                    <span className="bar-label">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeReport === 'occupancy' && (
          <div className="report-content">
            <div className="chart-container">
              <h3>Occupancy Rate</h3>
              <div className="line-chart">
                {revenueData.map((data, i) => (
                  <div key={i} className="line-point">
                    <div className="point" style={{ bottom: `${data.occupancy}%` }}>
                      <span className="point-value">{data.occupancy}%</span>
                    </div>
                    <span className="point-label">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeReport === 'sources' && (
          <div className="report-content">
            <h3>Booking Sources</h3>
            <div className="sources-grid">
              {sourceBookings.map((source, i) => (
                <div key={i} className="source-card">
                  <div className="source-header">
                    <h4>{source.source}</h4>
                    <span className="percentage">{source.percentage}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${source.percentage}%` }}></div>
                  </div>
                  <div className="source-stats">
                    <span>{source.count} bookings</span>
                    <span>{format(source.revenue)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeReport === 'rooms' && (
          <div className="report-content">
            <h3>Room Type Performance</h3>
            <table className="performance-table">
              <thead>
                <tr>
                  <th>Room Type</th>
                  <th>Bookings</th>
                  <th>Occupancy</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {roomPerformance.map((room, i) => (
                  <tr key={i}>
                    <td>{room.type}</td>
                    <td>{room.booked}</td>
                    <td>
                      <div className="occupancy-cell">
                        <div className="mini-progress">
                          <div className="mini-bar" style={{ width: `${room.occupancy}%` }}></div>
                        </div>
                        <span>{room.occupancy}%</span>
                      </div>
                    </td>
                    <td>{format(room.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="daily-operations">
          <h3>Daily Operations</h3>
          <table className="daily-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check-ins</th>
                <th>Check-outs</th>
                <th>Occupancy</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {dailyStats.map((day, i) => (
                <tr key={i}>
                  <td>{day.date}</td>
                  <td><span className="check-in">{day.checkIns}</span></td>
                  <td><span className="check-out">{day.checkOuts}</span></td>
                  <td>{day.occupancy}%</td>
                  <td>{format(day.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Reports;
