import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sponsor.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

// Import logos
import austCseLogo from '../../assets/images/aust-cse-society-logo.png';
import titleSponsorLogo from '../../assets/images/title_sponsor.jpg';
import partner1 from '../../assets/images/partners/partner_1.png';
import partner2 from '../../assets/images/partners/partner_2.png';
import partner3 from '../../assets/images/partners/partner_3.png';
import partner4 from '../../assets/images/partners/partner_4.png';
import partner5 from '../../assets/images/partners/partner_5.png';
import partner6 from '../../assets/images/partners/partner_6.png';

const partners = [
  { id: 1, name: 'Partner 1', logo: partner1 },
  { id: 2, name: 'Partner 2', logo: partner2 },
  { id: 3, name: 'Partner 3', logo: partner3 },
  { id: 4, name: 'Partner 4', logo: partner4 },
  { id: 5, name: 'Partner 5', logo: partner5 },
  { id: 6, name: 'Partner 6', logo: partner6 },
];

const faqs = [
  {
    id: 1,
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 30-day free trial for all our sponsorship packages. During this period, you can explore all the benefits and features of being a sponsor."
  },
  {
    id: 2,
    question: "Can I change my plan later?",
    answer: "Absolutely! You can upgrade or modify your sponsorship package at any time. Our team will work with you to ensure a smooth transition."
  },
  {
    id: 3,
    question: "What is your cancellation policy?",
    answer: "We have a flexible cancellation policy. You can cancel your sponsorship with a 30-day notice. Any pre-paid amount will be refunded on a pro-rata basis."
  },
  {
    id: 4,
    question: "Can other info be added to an invoice?",
    answer: "Yes, we can customize invoices to include additional information such as PO numbers, department codes, or specific contact details as required."
  },
  {
    id: 5,
    question: "How does billing work?",
    answer: "Billing is handled on a quarterly basis. We accept various payment methods including bank transfer, credit cards, and digital payments."
  },
  {
    id: 6,
    question: "How do I change my account email?",
    answer: "You can update your account email through your sponsor dashboard or by contacting our support team for immediate assistance."
  }
];

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            AUST CSE Society is the host of CSE Carnival
          </h1>
          <p className={styles.heroDescription}>
            Join us in celebrating technology and innovation at AUST CSE Carnival.
            As a sponsor, you'll be part of an event that brings together the brightest
            minds in computer science and engineering.
          </p>
        </div>
        <div className={styles.heroLogo}>
          <img src={austCseLogo} alt="AUST CSE Society" />
        </div>
      </div>
    </section>
  );
}

function SponsorsSection() {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);

  // Create extended array for seamless infinite scrolling
  const extendedPartners = [...partners, ...partners, ...partners];

  return (
    <section className={styles.sponsors}>
      <div className={styles.sponsorsContainer}>
        <h2 className={styles.sectionTitle}>Our Valued Partners</h2>
        <p className={styles.sectionSubtitle}>
          Trusted organizations that support our mission to advance technology education
        </p>

        <div
          className={styles.sponsorsTrack}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={trackRef}
        >
          <div className={`${styles.sponsorsInner} ${isPaused ? styles.paused : ''}`}>
            {extendedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className={styles.sponsorLogo}
                aria-label={`${partner.name} logo`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sponsorshipCTA}>
          <h3 className={styles.ctaHeading}>Become a Partner</h3>
          <p className={styles.ctaDescription}>
            Join our community of forward-thinking organizations supporting the next generation of tech innovators
          </p>
          <button className={styles.partnershipButton}>
            Partnership Opportunities
          </button>
        </div>
      </div>
    </section>
  );
}

function TitleSponsorSection() {
  return (
    <section className={styles.titleSponsor}>
      <h2 className={styles.sectionTitle}>Meet our Title Sponsor</h2>
      <div className={styles.titleSponsorContent}>
        <div className={styles.titleSponsorLogo}>
          <img src={titleSponsorLogo} alt="Title Sponsor" />
        </div>
        <div className={styles.titleSponsorInfo}>
          <h3 className={styles.companyName}>HABIT</h3>
          <p className={styles.companyDescription}>
            A leading innovator in technology solutions, HABIT has been at the forefront
            of digital transformation. As our title sponsor, they bring their expertise
            and commitment to fostering tech talent in Bangladesh.
          </p>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [expandedId, setExpandedId] = useState(1);

  const toggleFAQ = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className={styles.faq}>
      <div className={styles.faqHeader}>
        <h2 className={styles.sectionTitle}>Frequently asked questions</h2>
        <p className={styles.sectionSubtitle}>
          Everything you need to know about the sponsorship and billing.
        </p>
      </div>
      <div className={styles.faqList}>
        {faqs.map(faq => (
          <div
            key={faq.id}
            className={`${styles.faqItem} ${expandedId === faq.id ? styles.expanded : ''}`}
          >
            <button
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(faq.id)}
              aria-expanded={expandedId === faq.id}
            >
              {faq.question}
              <span className={styles.faqIcon}>{expandedId === faq.id ? '−' : '+'}</span>
            </button>
            <div className={styles.faqAnswer}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className={styles.contactCta}>
      <h2 className={styles.ctaTitle}>Still have questions?</h2>
      <p className={styles.ctaText}>
        Can't find the answer you're looking for? Please chat to our friendly team.
      </p>
      <Link to="/contact" className={styles.ctaButton}>
        Get in touch
      </Link>
    </section>
  );
}

export default function Sponsor() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <HeroSection />
        <SponsorsSection />
        <TitleSponsorSection />
        <FAQSection />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
