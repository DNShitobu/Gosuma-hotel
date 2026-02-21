import Restaurants from '../components/Restaurants/Restaurants';
import RoomService from '../components/RoomService/RoomService';

const DiningPage = () => {
  return (
    <>
      <section style={{ paddingTop: '100px' }}>
        <Restaurants />
      </section>
      <RoomService />
      <section style={{ minHeight: '50vh', paddingBottom: '40px' }}></section>
    </>
  );
};

export default DiningPage;
