import './Gallery.css';

const Gallery = () => {
  const images = [
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&q=80',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&q=80',
  ];

  return (
    <section className="gallery" id="facilities">
      <div className="container">
        <h2 className="section-title">Leisure Facilities</h2>
        <p className="section-subtitle">Experience Accra in a whole new light</p>
        
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div className="gallery-item" key={index}>
              <img src={image} alt={`Gallery ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
