import { useState } from 'react';
import './VirtualTour.css';

const VirtualTour = () => {
  const [activeView, setActiveView] = useState(0);

  const views = [
    { 
      id: 1, 
      name: 'Grand Deluxe Room', 
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      description: 'Experience luxury in our Grand Deluxe Room with panoramic city views'
    },
    { 
      id: 2, 
      name: 'Pool Area', 
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      description: 'Take a refreshing dip in our outdoor swimming pool'
    },
    { 
      id: 3, 
      name: 'Restaurant', 
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      description: 'Dine in style at our award-winning restaurant'
    },
    { 
      id: 4, 
      name: 'Lobby', 
      image: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800',
      description: 'Enter our welcoming lobby with elegant decor'
    },
    { 
      id: 5, 
      name: 'Gym', 
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      description: 'Stay fit at our fully equipped fitness center'
    },
    { 
      id: 6, 
      name: 'Conference Hall', 
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
      description: 'Host events in our modern conference facilities'
    }
  ];

  return (
    <section className="virtual-tour-section" id="virtual-tour">
      <div className="container">
        <h2 className="section-title">Virtual Tour</h2>
        <p className="section-subtitle">Explore our hotel from anywhere</p>

        <div className="tour-viewer">
          <div className="main-view">
            <img src={views[activeView].image} alt={views[activeView].name} />
            <div className="view-info">
              <h3>{views[activeView].name}</h3>
              <p>{views[activeView].description}</p>
            </div>
            <div className="tour-controls">
              <button 
                className="nav-btn prev"
                onClick={() => setActiveView(prev => (prev - 1 + views.length) % views.length)}
              >
                ❮
              </button>
              <span className="counter">{activeView + 1} / {views.length}</span>
              <button 
                className="nav-btn next"
                onClick={() => setActiveView(prev => (prev + 1) % views.length)}
              >
                ❯
              </button>
            </div>
          </div>

          <div className="thumbnail-strip">
            {views.map((view, index) => (
              <button
                key={view.id}
                className={`thumbnail ${index === activeView ? 'active' : ''}`}
                onClick={() => setActiveView(index)}
              >
                <img src={view.image} alt={view.name} />
                <span>{view.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="tour-features">
          <div className="feature">
            <span className="icon">🖱️</span>
            <h4>360° Views</h4>
            <p>Click and drag to explore</p>
          </div>
          <div className="feature">
            <span className="icon">📱</span>
            <h4>Mobile Friendly</h4>
            <p>View on any device</p>
          </div>
          <div className="feature">
            <span className="icon">🎯</span>
            <h4>VR Ready</h4>
            <p>Experience in virtual reality</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;
