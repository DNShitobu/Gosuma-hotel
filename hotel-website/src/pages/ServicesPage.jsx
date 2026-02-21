import Services from '../components/Services/Services';
import RoomService from '../components/RoomService/RoomService';
import Conference from '../components/Conference/Conference';

const ServicesPage = () => {
  return (
    <>
      <section style={{ paddingTop: '100px' }}>
        <Services />
      </section>
      <RoomService />
      <Conference />
      <section style={{ minHeight: '50vh', paddingBottom: '40px' }}></section>
    </>
  );
};

export default ServicesPage;
