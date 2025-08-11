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
import boraq from '../../assets/images/boraq.png';

const partners = [
  { id: 1, name: 'Partner 1', logo: partner1 },
  { id: 2, name: 'Partner 2', logo: partner2 },
  { id: 3, name: 'Partner 3', logo: partner3 },
  { id: 4, name: 'Partner 4', logo: partner4 },
  { id: 5, name: 'Partner 5', logo: partner5 },
  { id: 6, name: 'Partner 6', logo: partner6 },
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
      </div>
    </section>
  );
}

function ItGraphicsPartnership() {
  return (
    <section className={styles.ItGraphicsPartnershipButton}>
      <h2 className={styles.sectionTitle}>IT & Graphics Partner</h2>
      <img src={boraq} alt="Boraq Logo" className={styles.boraqLogo} />
      <p className={styles.ctaDescription}>
        Boraq combines advanced technologies and modern solutions to streamline operations and enhance user experiences. We deliver innovative services that foster growth and digital transformation.
      </p>
      <Link to="https://boraq.io" className={styles.ctaButton}>
        Visit Boraq
      </Link>
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
          <h3 className={styles.companyName}>Havit Bangladesh</h3>
          <p className={styles.companyDescription}>
            Founded in 1998, HAVIT is a global consumer tech brand that integrates R&D, industrial design, large-scale production, and global omnichannel marketing. It encompasses audio devices, gaming gears, mobile accessories, and smart life electronic products.
            <br/><br/>
            Welcome to Havit Bangladesh. Our vision is Exploring innovative technology and providing smart, aesthetic and functional products to service users in Bangladesh. Applying innovative technology to empower everyone to become fun creators of a better life. Explore and Innovate; Strive and Undertake.
          </p>
        </div>
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
        <ItGraphicsPartnership />
        <TitleSponsorSection />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
