import { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What are the check-in and check-out times?',
      answer: 'Check-in is from 2:00 PM and check-out is until 12:00 PM. Early check-in and late check-out can be arranged upon availability.'
    },
    {
      question: 'Is breakfast included in the room rate?',
      answer: 'Yes, a complimentary buffet breakfast is included for all guests at our on-site restaurant.'
    },
    {
      question: 'Do you offer airport shuttle service?',
      answer: 'Yes, we provide 24/7 airport shuttle service to and from Kotoka International Airport. Please contact our reservations team to arrange pickup.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Free cancellation is allowed up to 24 hours before check-in. Cancellations made less than 24 hours before arrival will be charged one night\'s stay.'
    },
    {
      question: 'Do you have parking facilities?',
      answer: 'Yes, we offer free secure on-site parking for all guests.'
    },
    {
      question: 'Is WiFi available at the hotel?',
      answer: 'Yes, complimentary high-speed WiFi is available throughout the hotel property.'
    },
    {
      question: 'What room amenities are provided?',
      answer: 'All rooms include air conditioning, flat-screen TV, minibar, safe, coffee/tea maker, and en-suite bathroom with toiletries.'
    },
    {
      question: 'Do you allow pets?',
      answer: 'We regret that pets are not allowed at the hotel, with the exception of service animals.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq" id="faq">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Find answers to common questions</p>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              className={`faq-item ${openIndex === index ? 'active' : ''}`} 
              key={index}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                {faq.question}
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
