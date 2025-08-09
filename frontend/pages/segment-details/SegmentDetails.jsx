import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Icon from '../../components/common/Icon';
import { getSegmentById, getAllSegments } from '../../data/carnivalSegments';
import styles from './SegmentDetails.module.css';

const SegmentDetails = () => {
  const { id } = useParams();
  const [segment, setSegment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const foundSegment = getSegmentById(id);
    setSegment(foundSegment);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading event details...</p>
      </div>
    );
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

  const getEventRules = (eventId) => {
    const commonRules = [
      "Participants must register before the deadline",
      "Valid student ID required for verification",
      "Late submissions will not be accepted",
      "Plagiarism will result in immediate disqualification"
    ];

    const specificRules = {
      'uiux-competition': [
        "Design must be original and created during the competition",
        "Use any design tool (Figma, Adobe XD, Sketch, etc.)",
        "Submit wireframes, mockups, and prototype",
        "Present your design solution in 5 minutes"
      ],
      'hackathon': [
        "Teams of 3-4 members maximum",
        "Use any programming language or framework",
        "Code must be written during the event",
        "Working demo required for final presentation"
      ],
      'programming-contest': [
        "Individual participation only",
        "Use C++, Java, Python, or JavaScript",
        "Standard competitive programming rules apply",
        "No external libraries allowed"
      ],
      'math-olympiad': [
        "Individual participation only",
        "No calculators or external aids allowed",
        "Show all working steps clearly",
        "Time limit strictly enforced"
      ],
      'capture-the-flag': [
        "Teams of 2-4 members",
        "No attacking competition infrastructure",
        "Flag sharing between teams prohibited",
        "Document your solution approach"
      ],
      'quiz-competition': [
        "Teams of 3-4 members",
        "Multiple rounds with increasing difficulty",
        "No mobile phones or internet access",
        "Answers must be submitted within time limit"
      ],
      'chess-competition': [
        "Individual participation only",
        "Standard FIDE rules apply",
        "Time control: 15 minutes per player",
        "No external assistance allowed"
      ],
      'esports-tournaments': [
        "Teams vary by game type",
        "Stable internet connection required",
        "Use designated game versions only",
        "Fair play and sportsmanship expected"
      ]
    };

    return [...commonRules, ...(specificRules[eventId] || [])];
  };

  const getEventPrizes = (eventId) => {
    const basePrizes = {
      first: "Certificate + Trophy + Cash Prize",
      second: "Certificate + Medal + Cash Prize",
      third: "Certificate + Medal"
    };

    const specialPrizes = {
      'hackathon': {
        ...basePrizes,
        special: ["Best Innovation Award", "Best UI/UX Design", "Best Technical Implementation"]
      },
      'uiux-competition': {
        ...basePrizes,
        special: ["Most Creative Design", "Best User Experience"]
      },
      'programming-contest': {
        ...basePrizes,
        special: ["Fastest Solution Award"]
      }
    };

    return specialPrizes[eventId] || basePrizes;
  };

  const getEventTimeline = (eventId) => {
    const baseTimeline = [
      { time: "Registration Opens", desc: "2 weeks before event", status: "completed" },
      { time: "Registration Deadline", desc: segment.registration.deadline, status: "upcoming" },
      { time: "Event Day", desc: segment.date, status: "upcoming" },
      { time: "Results Announcement", desc: "Same day", status: "upcoming" }
    ];

    const specificTimelines = {
      'hackathon': [
        ...baseTimeline,
        { time: "Team Formation", desc: "1 hour before start", status: "upcoming" },
        { time: "Problem Statement Release", desc: "Event start", status: "upcoming" },
        { time: "Submission Deadline", desc: "24 hours after start", status: "upcoming" },
        { time: "Presentation Round", desc: "After submission", status: "upcoming" }
      ]
    };

    return specificTimelines[eventId] || baseTimeline;
  };

  const getFAQ = (eventId) => {
    const commonFAQ = [
      {
        question: "How do I register for this event?",
        answer: "Registration will be available through our official website. Follow the registration link and fill out the required information."
      },
      {
        question: "Is there a registration fee?",
        answer: `Registration fee: ${segment.registration.fee}. Payment details will be provided during registration.`
      },
      {
        question: "Can I participate if I'm not from AUST?",
        answer: "Yes! This event is open to students from all universities. Valid student ID is required for verification."
      }
    ];

    const specificFAQ = {
      'hackathon': [
        {
          question: "Can I participate alone?",
          answer: "Teams of 3-4 members are required. You can find team members during the team formation session."
        },
        {
          question: "What should I bring?",
          answer: "Bring your laptop, charger, and any development tools you prefer. WiFi and refreshments will be provided."
        }
      ],
      'programming-contest': [
        {
          question: "What programming languages are allowed?",
          answer: "C++, Java, Python, and JavaScript are supported. Choose the one you're most comfortable with."
        },
        {
          question: "Can I use my own IDE?",
          answer: "Yes, you can use any IDE or text editor you prefer, but no external libraries or plugins are allowed."
        }
      ]
    };

    return [...commonFAQ, ...(specificFAQ[eventId] || [])];
  };

  const relatedEvents = getAllSegments().filter(event =>
    event.id !== segment.id && event.category === segment.category
  ).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{segment.title} - AUST CSE Carnival 2025</title>
        <meta name="description" content={segment.description} />
        <meta name="keywords" content={`${segment.title}, AUST, CSE Carnival, ${segment.category}, ${segment.type}`} />
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
                  <div className={styles.heroMeta}>
                    <span className={styles.eventType}>{segment.type}</span>
                    <span className={styles.eventCategory}>{segment.category}</span>
                  </div>
                  <h1 className={styles.heroTitle}>{segment.title}</h1>
                  <p className={styles.heroDescription}>{segment.description}</p>
                  <div className={styles.heroActions}>
                    <div className={styles.eventDate}>
                      <Icon type="calendar" />
                      <strong>{formatDate(segment.date)}</strong>
                    </div>
                    <Link to="/contact" className={styles.registerBtn}>
                      Register Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className={styles.tabNavigation}>
          <div className={styles.container}>
            <div className={styles.tabs}>
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'rules', label: 'Rules & Guidelines' },
                { id: 'timeline', label: 'Timeline' },
                { id: 'prizes', label: 'Prizes' },
                { id: 'faq', label: 'FAQ' }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.contentGrid}>

              {/* Main Content */}
              <div className={styles.mainContent}>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className={styles.tabContent}>
                    <h2>Event Overview</h2>
                    <div className={styles.overviewGrid}>
                      <div className={styles.overviewCard}>
                        <Icon type="calendar" />
                        <h3>Event Date</h3>
                        <p>{formatDate(segment.date)}</p>
                      </div>
                      <div className={styles.overviewCard}>
                        <Icon type="graduation" />
                        <h3>Category</h3>
                        <p>{segment.category}</p>
                      </div>
                      <div className={styles.overviewCard}>
                        <Icon type="location" />
                        <h3>Format</h3>
                        <p>{segment.type}</p>
                      </div>
                      <div className={styles.overviewCard}>
                        <Icon type="graduation" />
                        <h3>Team Size</h3>
                        <p>{segment.registration.teamSize}</p>
                      </div>
                    </div>

                    <div className={styles.description}>
                      <h3>About This Event</h3>
                      <p>{segment.description}</p>
                      <p>This event is designed to challenge participants and showcase their skills in {segment.category.toLowerCase()}. Whether you're a beginner or an expert, this competition offers a great opportunity to learn, compete, and network with like-minded individuals.</p>
                    </div>

                    <div className={styles.objectives}>
                      <h3>Event Objectives</h3>
                      <ul>
                        <li>Foster innovation and creative thinking</li>
                        <li>Encourage collaborative problem-solving</li>
                        <li>Provide networking opportunities</li>
                        <li>Recognize and reward excellence</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Rules Tab */}
                {activeTab === 'rules' && (
                  <div className={styles.tabContent}>
                    <h2>Rules & Guidelines</h2>
                    <div className={styles.rulesSection}>
                      <h3>General Rules</h3>
                      <ul className={styles.rulesList}>
                        {getEventRules(segment.id).map((rule, index) => (
                          <li key={index}>{rule}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.eligibility}>
                      <h3>Eligibility Criteria</h3>
                      <ul>
                        <li>Must be a current university student</li>
                        <li>Valid student ID required</li>
                        <li>Team size: {segment.registration.teamSize}</li>
                        <li>Registration deadline: {segment.registration.deadline}</li>
                      </ul>
                    </div>

                    <div className={styles.submission}>
                      <h3>Submission Guidelines</h3>
                      <ul>
                        <li>Submit before the specified deadline</li>
                        <li>Include all required documentation</li>
                        <li>Follow naming conventions</li>
                        <li>Ensure file formats are supported</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Timeline Tab */}
                {activeTab === 'timeline' && (
                  <div className={styles.tabContent}>
                    <h2>Event Timeline</h2>
                    <div className={styles.timeline}>
                      {getEventTimeline(segment.id).map((item, index) => (
                        <div key={index} className={`${styles.timelineItem} ${styles[item.status]}`}>
                          <div className={styles.timelineMarker}></div>
                          <div className={styles.timelineContent}>
                            <h4>{item.time}</h4>
                            <p>{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prizes Tab */}
                {activeTab === 'prizes' && (
                  <div className={styles.tabContent}>
                    <h2>Prizes & Recognition</h2>
                    <div className={styles.prizesGrid}>
                      <div className={styles.prizeCard}>
                        <div className={styles.prizeIcon}>🥇</div>
                        <h3>1st Place</h3>
                        <p>{getEventPrizes(segment.id).first}</p>
                      </div>
                      <div className={styles.prizeCard}>
                        <div className={styles.prizeIcon}>🥈</div>
                        <h3>2nd Place</h3>
                        <p>{getEventPrizes(segment.id).second}</p>
                      </div>
                      <div className={styles.prizeCard}>
                        <div className={styles.prizeIcon}>🥉</div>
                        <h3>3rd Place</h3>
                        <p>{getEventPrizes(segment.id).third}</p>
                      </div>
                    </div>

                    {getEventPrizes(segment.id).special && (
                      <div className={styles.specialPrizes}>
                        <h3>Special Awards</h3>
                        <ul>
                          {getEventPrizes(segment.id).special.map((prize, index) => (
                            <li key={index}>{prize}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                  <div className={styles.tabContent}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {getFAQ(segment.id).map((faq, index) => (
                        <div key={index} className={styles.faqItem}>
                          <h4>{faq.question}</h4>
                          <p>{faq.answer}</p>
                        </div>
                      ))}
                    </div>

                    <div className={styles.contactInfo}>
                      <h3>Still Have Questions?</h3>
                      <p>Feel free to reach out to our organizing team for any additional information.</p>
                      <Link to="/contact" className={styles.contactBtn}>Contact Us</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className={styles.sidebar}>
                <div className={styles.registrationCard}>
                  <h3>Registration Details</h3>
                  <div className={styles.regDetails}>
                    <div className={styles.regItem}>
                      <Icon type="graduation" />
                      <div>
                        <strong>Team Size</strong>
                        <span>{segment.registration.teamSize}</span>
                      </div>
                    </div>
                    <div className={styles.regItem}>
                      <Icon type="calendar" />
                      <div>
                        <strong>Deadline</strong>
                        <span>{new Date(segment.registration.deadline).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                    </div>
                    <div className={styles.regItem}>
                      <Icon type="web" />
                      <div>
                        <strong>Fee</strong>
                        <span>{segment.registration.fee}</span>
                      </div>
                    </div>
                  </div>
                  <Link to="/contact" className={styles.registerButton}>
                    Register Now
                  </Link>
                </div>

                {relatedEvents.length > 0 && (
                  <div className={styles.relatedEvents}>
                    <h3>Related Events</h3>
                    {relatedEvents.map(event => (
                      <Link key={event.id} to={`/segment/${event.id}`} className={styles.relatedEvent}>
                        <img src={event.image} alt={event.title} />
                        <div>
                          <h4>{event.title}</h4>
                          <p>{event.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                <div className={styles.shareSection}>
                  <h3>Share This Event</h3>
                  <div className={styles.shareButtons}>
                    <button className={styles.shareBtn}>Facebook</button>
                    <button className={styles.shareBtn}>Twitter</button>
                    <button className={styles.shareBtn}>LinkedIn</button>
                    <button className={styles.shareBtn}>Copy Link</button>
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
