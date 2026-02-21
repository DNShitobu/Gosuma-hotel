import Hero from '../components/Hero/Hero';
import Booking from '../components/Booking/Booking';
import BookingCalendar from '../components/BookingCalendar/BookingCalendar';
import About from '../components/About/About';
import Newsletter from '../components/Newsletter/Newsletter';
import PriceAlert from '../components/PriceAlert/PriceAlert';

const HomePage = () => {
  return (
    <>
      <div className="hero-booking-row">
        <Hero />
        <BookingCalendar />
      </div>
      <div id="booking-section">
        <Booking />
      </div>
      <About />
      <Newsletter />
      <PriceAlert />
    </>
  );
};

export default HomePage;
