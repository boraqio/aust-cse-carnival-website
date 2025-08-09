import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Event.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

// Import images with correct paths
import heroImg1 from '../../assets/images/event page hero image gallery/carnival_1_img_13.jpg';
import heroImg2 from '../../assets/images/event page hero image gallery/carnival_3_img_17.jpg';
import heroImg3 from '../../assets/images/event page hero image gallery/carnival_5_img_32.jpg';

// Import partner logos
import partner1 from '../../assets/images/partners/partner_1.png';
import partner2 from '../../assets/images/partners/partner_2.png';
import partner3 from '../../assets/images/partners/partner_3.png';
import partner4 from '../../assets/images/partners/partner_4.png';
import partner5 from '../../assets/images/partners/partner_5.png';
import partner6 from '../../assets/images/partners/partner_6.png';

// Import timeline event images
import uiuxCompetition from '../../assets/images/segments/23 UIUX Competition.jpg';
import mathOlympiad from '../../assets/images/segments/24 Math Olympiad Competition.jpg';
import captureTheFlag from '../../assets/images/segments/25 Capture The Flag Competition.jpg';
import quizCompetition from '../../assets/images/segments/26 Quiz Competition.jpg';
import hackathon from '../../assets/images/segments/27 Hackathon.jpg';
import chess from '../../assets/images/segments/28 Chess Competition.jpg';
import eSports from '../../assets/images/segments/28 E-Sports Tournaments.jpg';
import programming from '../../assets/images/segments/28 Programming Contest.jpg';
import userAvatar from '../../assets/images/user-placeholder.jpg';

const partners = [
  { id: 1, name: 'Partner 1', logo: partner1 },
  { id: 2, name: 'Partner 2', logo: partner2 },
  { id: 3, name: 'Partner 3', logo: partner3 },
  { id: 4, name: 'Partner 4', logo: partner4 },
  { id: 5, name: 'Partner 5', logo: partner5 },
  { id: 6, name: 'Partner 6', logo: partner6 },
];

const heroImages = [heroImg1, heroImg2, heroImg3];

const timelineEvents = [
  {
    id: 1,
    time: '8:00 AM',
    title: 'Quiz Competition',
    description: 'Test your knowledge in various domains of computer science.',
    image: quizCompetition,
    status: 'upcoming'
  },
  {
    id: 2,
    time: '9:30 AM',
    title: 'UI/UX Competition',
    description: 'Showcase your design skills and creative problem-solving abilities.',
    image: uiuxCompetition,
    status: 'upcoming'
  },
  {
    id: 3,
    time: '11:00 AM',
    title: 'Math Olympiad',
    description: 'Challenge yourself with complex mathematical problems.',
    image: mathOlympiad,
    status: 'upcoming'
  },
  {
    id: 4,
    time: '1:00 PM',
    title: 'Capture The Flag',
    description: 'Compete in cybersecurity challenges and find hidden flags.',
    image: captureTheFlag,
    status: 'upcoming'
  },
  {
    id: 5,
    time: '2:30 PM',
    title: 'Hackathon',
    description: 'Build innovative solutions in a time-constrained environment.',
    image: hackathon,
    status: 'upcoming'
  },
  {
    id: 6,
    time: '4:00 PM',
    title: 'Programming Contest',
    description: 'Solve algorithmic problems against the clock.',
    image: programming,
    status: 'upcoming'
  },
  {
    id: 7,
    time: '5:00 PM',
    title: 'Chess Tournament',
    description: 'Strategic battles on the checkered board.',
    image: chess,
    status: 'upcoming'
  },
  {
    id: 8,
    time: '6:00 PM',
    title: 'E-Sports Tournament',
    description: 'Compete in various gaming championships.',
    image: eSports,
    status: 'upcoming'
  }
];

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroCarousel}>
        <img
          src={heroImages[currentSlide]}
          alt="Event highlight"
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Experience the Thrilling AUST CSE</h1>
          <p className={styles.heroSubtitle}>
            Join us for a day of excitement, innovation, and fun!
          </p>
          <Link to="/gallery" className={styles.heroButton}>
            Gallery <span className={styles.arrowIcon}>→</span>
          </Link>
        </div>
        <div className={styles.carouselDots}>
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section className={styles.partners}>
      <h2 className={styles.sectionTitle}>Partners</h2>
      <div className={styles.partnerGrid}>
        {partners.map(partner => (
          <div key={partner.id} className={styles.partnerLogo}>
            <img src={partner.logo} alt={partner.name} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ExcitementSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Ahmed',
      comment: 'The workshops were incredibly informative and engaging. Learned so much!',
      avatar: userAvatar
    },
    {
      id: 2,
      name: 'Rahul Khan',
      comment: 'Amazing experience at the hackathon. Great organization and challenging problems.',
      avatar: userAvatar
    },
    {
      id: 3,
      name: 'Fatima Hassan',
      comment: 'The programming contest was tough but really fun. Looking forward to next year!',
      avatar: userAvatar
    }
  ];

  return (
    <section className={styles.excitement}>
      <div className={styles.excitementContent}>
        <span className={styles.label}>Excitement</span>
        <h2 className={styles.excitementTitle}>Experience of AUST CSE Carnival</h2>
        <p className={styles.excitementDescription}>
          Join us for an unforgettable journey through technology, innovation, and
          creativity. Experience workshops, competitions, and networking opportunities
          that will shape your future in tech.
        </p>
        <Link to="/gallery" className={styles.excitementButton}>
          View Gallery <span className={styles.arrowIcon}>→</span>
        </Link>
      </div>
      <div className={styles.commentsSection}>
        <div className={styles.commentThread}>
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className={styles.comment}>
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className={styles.userAvatar}
              />
              <div className={styles.commentContent}>
                <h4>{testimonial.name}</h4>
                <p>{testimonial.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className={styles.timeline}>
      <h2 className={styles.timelineTitle}>Timeline!</h2>
      <p className={styles.timelineSubtext}>
        Experience the thrill of the AUST CSE Carnival and register now!
      </p>
      <div className={styles.timelineContainer}>
        {timelineEvents.map((event, index) => (
          <div
            key={event.id}
            className={`${styles.timelineEvent} ${
              index % 2 === 0 ? styles.eventLeft : styles.eventRight
            }`}
          >
            <div className={styles.timelineCard}>
              <img src={event.image} alt={event.title} className={styles.eventImage} />
              <div className={styles.eventContent}>
                <span className={styles.eventTime}>{event.time}</span>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDescription}>{event.description}</p>
                <div className={`${styles.statusDot} ${styles[event.status]}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Update the Event component to include Header and Footer
export default function Event() {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <HeroSection />
        <PartnersSection />
        <ExcitementSection />
        <TimelineSection />
      </main>
      <Footer />
    </div>
  );
}
