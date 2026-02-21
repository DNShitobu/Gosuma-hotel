import Gallery from '../components/Gallery/Gallery';
import VirtualTour from '../components/VirtualTour/VirtualTour';

const GalleryPage = () => {
  return (
    <section style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <Gallery />
      <VirtualTour />
    </section>
  );
};

export default GalleryPage;
