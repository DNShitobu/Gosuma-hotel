import Offers from '../components/Offers/Offers';
import PackageDeals from '../components/PackageDeals/PackageDeals';
import PriceAlert from '../components/PriceAlert/PriceAlert';

const OffersPage = () => {
  return (
    <>
      <section style={{ paddingTop: '100px' }}>
        <Offers />
      </section>
      <PackageDeals />
      <section style={{ minHeight: '100vh', paddingBottom: '40px' }}>
        <PriceAlert />
      </section>
    </>
  );
};

export default OffersPage;
