import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { getSegmentById } from '../../data/carnivalSegments';
import styles from './SegmentDetails.module.css';

const SegmentDetails = () => {
  const { id } = useParams();
  const [segment, setSegment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundSegment = getSegmentById(id);
    setSegment(foundSegment);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!segment) {
    return <Navigate to="/event" replace />;
  }

  const formatDate = (dateString) => {
    if (dateString.includes(' - ')) {
      const [startDate, endDate] = dateString.split(' - ');
      const start = new Date(startDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const end = new Date(endDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      return `${start} - ${end}`;
    }
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>{segment.title} - AUST CSE Carnival 2025</title>
        <meta name="description" content={segment.description} />
      </Helmet>

      <div className={styles.segmentDetails}>
        <Header />

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroImage}>
            <img src={segment.image} alt={segment.title} />
            <div className={styles.heroOverlay}>
              <div className={styles.container}>
                <div className={styles.heroContent}>
                  <div className={styles.eventMeta}>
                    <span className={styles.eventType}>{segment.type}</span>
                    <span className={styles.eventCategory}>{segment.category}</span>
                  </div>
                  <h1 className={styles.heroTitle}>{segment.title}</h1>
                  <p className={styles.heroDescription}>{segment.description}</p>
                  <div className={styles.eventDate}>
                    <strong>{formatDate(segment.date)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className={styles.details}>
          <div className={styles.container}>
            <div className={styles.detailsGrid}>

              {/* Main Information */}
              <div className={styles.mainInfo}>
                <h2>Event Details</h2>

                <div className={styles.infoCard}>
                  <h3>About This Event</h3>
                  <p>{segment.description}</p>
                </div>

                <div className={styles.infoCard}>
                  <h3>Event Information</h3>
                  <div className={styles.infoList}>
                    <div className={styles.infoItem}>
                      <strong>Date:</strong> {formatDate(segment.date)}
                    </div>
                    <div className={styles.infoItem}>
                      <strong>Time:</strong> {segment.time}
                    </div>
                    <div className={styles.infoItem}>
                      <strong>Format:</strong> {segment.type}
                    </div>
                    <div className={styles.infoItem}>
                      <strong>Category:</strong> {segment.category}
                    </div>
                    {segment.duration && (
                      <div className={styles.infoItem}>
                        <strong>Duration:</strong> {segment.duration}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Registration Sidebar */}
              <div className={styles.sidebar}>
                <div className={styles.registrationCard}>
                  <h3>Registration Information</h3>

                  <div className={styles.regDetails}>
                    <div className={styles.regItem}>
                      <strong>Team Size:</strong>
                      <span>{segment.registration.teamSize}</span>
                    </div>

                    <div className={styles.regItem}>
                      <strong>Registration Fee:</strong>
                      <span>{segment.registration.fee}</span>
                    </div>

                    <div className={styles.regItem}>
                      <strong>Registration Deadline:</strong>
                      <span>{new Date(segment.registration.deadline).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                    </div>
                  </div>

                  <div className={styles.actionButtons}>
                    <Link to="/contact" className={styles.registerBtn}>
                      Register Now
                    </Link>
                    <Link to="/event" className={styles.backBtn}>
                      ← Back to Events
                    </Link>
                  </div>
                </div>

                {/* Quick Info */}
                <div className={styles.quickInfo}>
                  <h4>Quick Info</h4>
                  <div className={styles.quickInfoGrid}>
                    <div className={styles.quickInfoItem}>
                      <span className={styles.quickInfoLabel}>Type</span>
                      <span className={styles.quickInfoValue}>{segment.type}</span>
                    </div>
                    <div className={styles.quickInfoItem}>
                      <span className={styles.quickInfoLabel}>Category</span>
                      <span className={styles.quickInfoValue}>{segment.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default SegmentDetails;
