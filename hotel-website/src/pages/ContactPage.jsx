import ContactForm from '../components/ContactForm/ContactForm';
import Location from '../components/Location/Location';

const ContactPage = () => {
  return (
    <>
      <section style={{ paddingTop: '100px' }}>
        <ContactForm />
      </section>
      <Location />
      <section style={{ minHeight: '50vh', paddingBottom: '40px' }}></section>
    </>
  );
};

export default ContactPage;
