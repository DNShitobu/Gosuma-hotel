import Reviews from '../components/Reviews/Reviews';
import GuestReview from '../components/GuestReview/GuestReview';

const ReviewsPage = () => {
  return (
    <section style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <Reviews />
      <GuestReview />
    </section>
  );
};

export default ReviewsPage;
