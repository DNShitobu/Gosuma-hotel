import { useState } from 'react';
import './LoyaltyProgram.css';

const LoyaltyProgram = () => {
  const [isMember, setIsMember] = useState(false);
  const [points, setPoints] = useState(0);
  const [tier, setTier] = useState('bronze');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const tiers = [
    { name: 'Bronze', min: 0, color: '#CD7F32', perks: ['5% discount', 'Late checkout'] },
    { name: 'Silver', min: 1000, color: '#C0C0C0', perks: ['10% discount', 'Room upgrade', 'Free breakfast'] },
    { name: 'Gold', min: 5000, color: '#FFD700', perks: ['15% discount', 'Suite upgrade', 'Free spa', 'Airport transfer'] },
    { name: 'Platinum', min: 10000, color: '#E5E4E2', perks: ['20% discount', 'Butler service', 'All inclusive', 'VIP lounge'] }
  ];

  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsMember(true);
    setPoints(500);
    setTier('bronze');
    setLoading(false);
  };

  const currentTier = tiers.find(t => t.name.toLowerCase() === tier);
  const nextTier = tiers.find(t => t.min > points);
  const progress = nextTier ? ((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

  return (
    <section className="loyalty-section" id="loyalty">
      <div className="container">
        <h2 className="section-title">Rewards Club</h2>
        <p className="section-subtitle">Earn points with every stay</p>

        {!isMember ? (
          <div className="join-program">
            <div className="program-info">
              <h3>Join Our Rewards Club</h3>
              <p>Earn 10 points for every dollar spent. Redeem for free nights, upgrades, and more!</p>
              <ul className="perks-list">
                <li>✓ Instant 500 bonus points on sign up</li>
                <li>✓ Member-only rates</li>
                <li>✓ Free room upgrades</li>
                <li>✓ Late checkout privileges</li>
                <li>✓ Birthday rewards</li>
              </ul>
            </div>
            <form className="join-form" onSubmit={handleJoin}>
              <h4>Sign Up Free</h4>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Joining...' : 'Join Now'}
              </button>
            </form>
          </div>
        ) : (
          <div className="member-dashboard">
            <div className="member-card" style={{ borderColor: currentTier?.color }}>
              <div className="card-header">
                <span className="tier-badge" style={{ background: currentTier?.color }}>{tier.toUpperCase()}</span>
                <h3>{formData.name || 'Member'}</h3>
              </div>
              <div className="points-display">
                <span className="points">{points.toLocaleString()}</span>
                <span className="label">Points</span>
              </div>
              {nextTier && (
                <div className="progress-section">
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%`, background: nextTier.color }}></div>
                  </div>
                  <p>{nextTier.min - points} points to {nextTier.name}</p>
                </div>
              )}
            </div>

            <div className="tiers-overview">
              <h4>Membership Tiers</h4>
              <div className="tiers-grid">
                {tiers.map(t => (
                  <div key={t.name} className={`tier-card ${tier === t.name.toLowerCase() ? 'current' : ''}`}>
                    <span className="tier-color" style={{ background: t.color }}></span>
                    <h5>{t.name}</h5>
                    <p className="tier-points">{t.min.toLocaleString()} pts</p>
                    <ul>
                      {t.perks.map((perk, i) => <li key={i}>{perk}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rewards-catalogue">
              <h4>Redeem Points</h4>
              <div className="rewards-grid">
                <div className="reward">
                  <span className="icon">🛏️</span>
                  <h5>Free Night</h5>
                  <p>10,000 points</p>
                  <button className="btn-small">Redeem</button>
                </div>
                <div className="reward">
                  <span className="icon">⬆️</span>
                  <h5>Room Upgrade</h5>
                  <p>3,000 points</p>
                  <button className="btn-small">Redeem</button>
                </div>
                <div className="reward">
                  <span className="icon">🍳</span>
                  <h5>Breakfast</h5>
                  <p>500 points</p>
                  <button className="btn-small">Redeem</button>
                </div>
                <div className="reward">
                  <span className="icon">🧖</span>
                  <h5>Spa Treatment</h5>
                  <p>2,000 points</p>
                  <button className="btn-small">Redeem</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoyaltyProgram;
