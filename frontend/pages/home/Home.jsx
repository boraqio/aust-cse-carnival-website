import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import styles from './Home.module.css';

// Import images properly for Vite
import titleSponsor from '../../assets/images/title_sponsor.jpg';
import heroImg1 from '../../assets/images/event page hero image gallery/carnival_1_img_13.jpg';
import heroImg2 from '../../assets/images/event page hero image gallery/carnival_2_img_2.jpg';
import heroImg3 from '../../assets/images/event page hero image gallery/carnival_3_img_17.jpg';
import heroImg4 from '../../assets/images/event page hero image gallery/carnival_5_img_32.jpg';
import organizerLogo from '../../assets/images/organizer and co-organizer/organizer_operand.png';
import coOrganizerLogo from '../../assets/images/organizer and co-organizer/co_organizer_perceptron.jpg';

const Home = () => {
  console.log('Home component rendering...'); // Debug log

  return (
    <div className={styles.home}>
      {/* Use existing Header component */}
      <Header />

      {/* Enhanced Hero Section with Image Carousel */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Experience the Thrilling AUST CSE Carnival
            </h1>
            <p className={styles.heroSubtitle}>
              Join us for a day of innovation, competition, and fun!
            </p>
            <div className={styles.heroButtons}>
              <Link to="/event" className={styles.btnPrimary}>Learn More</Link>
              <Link to="/contact" className={styles.btnSecondary}>Register Now</Link>
            </div>
          </div>

          <div className={styles.heroImageSection}>
            <div className={styles.heroImageGrid}>
              <img src={heroImg1} alt="Carnival Event 1" className={styles.heroImg} />
              <img src={heroImg2} alt="Carnival Event 2" className={styles.heroImg} />
              <img src={heroImg3} alt="Carnival Event 3" className={styles.heroImg} />
              <img src={heroImg4} alt="Carnival Event 4" className={styles.heroImg} />
            </div>
          </div>
        </div>
      </section>

      {/* Discover Section WITHOUT React Icons */}
      <section className={styles.discover}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Experience the Thrills of AUST CSE Carnival
          </h2>
          <p className={styles.sectionDescription}>
            Immerse yourself in a world of technology, innovation, and competition. Our carnival brings together the brightest minds in computer science for an unforgettable experience.
          </p>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                📅
              </div>
              <h3 className={styles.featureTitle}>Main Events</h3>
              <p className={styles.featureDescription}>Experience exciting programming contests, hackathons, and technical competitions that challenge your skills.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                🎓
              </div>
              <h3 className={styles.featureTitle}>Workshops</h3>
              <p className={styles.featureDescription}>Learn from industry experts through hands-on workshops covering latest technologies and best practices.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                🏆
              </div>
              <h3 className={styles.featureTitle}>Activities</h3>
              <p className={styles.featureDescription}>Participate in fun activities, networking sessions, and cultural events throughout the carnival.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>
            Join the exciting CSE Carnival!
          </h2>
          <div className={styles.ctaButtons}>
            <Link to="/event" className={styles.btnPrimary}>Explore Events</Link>
            <Link to="/contact" className={styles.btnOutline}>Get Involved</Link>
          </div>
        </div>
      </section>

      {/* Title Sponsor Section - CORRECTED */}
      <section className={styles.titleSponsor}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Our Title Sponsor Habit
          </h2>
          <div className={styles.sponsorContent}>
            <div className={styles.sponsorLogo}>
              <img src={titleSponsor} alt="Habit Logo" />
            </div>
            <div className={styles.sponsorInfo}>
              <h3>Habit - Digital Solutions Partner</h3>
              <p>
                Habit is a leading digital solutions provider committed to empowering educational institutions and fostering technological innovation. Their partnership with AUST CSE Carnival demonstrates their dedication to supporting the next generation of computer science professionals and promoting excellence in technology education.
              </p>
              <Link to="/sponsor" className={styles.btnSecondary}>Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Event Organizer Section - CORRECTED */}
      <section className={styles.organizer}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Event Organizers
          </h2>
          <div className={styles.organizerGrid}>
            <div className={styles.organizerCard}>
              <div className={styles.organizerLogo}>
                <img src={organizerLogo} alt="Operand Logo" />
              </div>
              <div className={styles.organizerContent}>
                <h3>Main Organizer</h3>
                <h4>Operand Programming Club</h4>
                <p>
                  Operand is the premier programming and technology club at AUST, dedicated to fostering computational thinking, problem-solving skills, and technical excellence among students. We organize regular programming contests, workshops, hackathons, and educational events to build a vibrant tech community.
                </p>
                <Link to="/contact" className={styles.btnSecondary}>Learn More</Link>
              </div>
            </div>

            <div className={styles.organizerCard}>
              <div className={styles.organizerLogo}>
                <img src={coOrganizerLogo} alt="Perceptron Logo" />
              </div>
              <div className={styles.organizerContent}>
                <h3>Co-Organizer</h3>
                <h4>Perceptron Tech Community</h4>
                <p>
                  Perceptron is an innovative tech community focused on artificial intelligence, machine learning, and cutting-edge technologies. They bring expertise in modern development practices and help create engaging workshops, competitions, and learning opportunities for participants.
                </p>
                <Link to="/contact" className={styles.btnSecondary}>Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use existing Footer component */}
      <Footer />
    </div>
  );
};

export default Home;
