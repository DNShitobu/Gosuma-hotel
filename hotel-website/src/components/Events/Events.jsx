import './Events.css';

const Events = () => {
  const events = [
    {
      title: 'Aframoah Hall',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80',
      capacity: '525',
    },
    {
      title: 'Antwi Hall',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',
      capacity: '300',
    },
    {
      title: 'Nyamekye Board Room',
      image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&q=80',
      capacity: '20',
    },
  ];

  return (
    <section className="events" id="events">
      <div className="container">
        <h2 className="section-title">Events at Airport View</h2>
        <p className="section-subtitle">Conferencing in a Serene Atmosphere</p>
        
        <div className="events-grid">
          {events.map((event, index) => (
            <div className="event-card" key={index}>
              <div className="event-image">
                <img src={event.image} alt={event.title} />
              </div>
              <div className="event-content">
                <h3>{event.title}</h3>
                <p>Maximum capacity: {event.capacity} guests</p>
                <a href="#contact" className="btn-outline">View Details</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
