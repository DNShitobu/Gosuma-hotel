import FAQ from '../components/FAQ/FAQ';
import ContactForm from '../components/ContactForm/ContactForm';

const FAQPage = () => {
  return (
    <>
      <section style={{ paddingTop: '100px' }}>
        <FAQ />
      </section>
      <ContactForm />
      <section style={{ minHeight: '50vh', paddingBottom: '40px' }}></section>
    </>
  );
};

export default FAQPage;
