import Location from '../components/Location/Location';
import LocalAttractions from '../components/LocalAttractions/LocalAttractions';
import WeatherWidget from '../components/WeatherWidget/WeatherWidget';

const LocationPage = () => {
  return (
    <>
      <section style={{ paddingTop: '100px' }}>
        <Location />
      </section>
      <LocalAttractions />
      <section style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="container">
          <WeatherWidget />
        </div>
      </section>
    </>
  );
};

export default LocationPage;
