import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agreeToPrivacy: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = useState('');

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      newErrors.firstName = 'First name can only contain letters';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last name can only contain letters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional)
    if (formData.phone && !/^(\+880|880)?[1-9][0-9]{8,10}$/.test(formData.phone.replace(/[\s()-]/g, ''))) {
      newErrors.phone = 'Please enter a valid Bangladesh phone number';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message cannot exceed 1000 characters';
    }

    // Privacy policy validation
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to our privacy policy';
    }

    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setSubmitStatus(null);
    setErrors({});

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.');

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          agreeToPrivacy: false
        });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');

      if (error.message.includes('Too many')) {
        setSubmitMessage('Too many submissions. Please try again later.');
      } else if (error.message.includes('Network')) {
        setSubmitMessage('Unable to send message. Please check your connection and try again.');
      } else {
        setSubmitMessage('Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Contact Form Section */}
          <section className={styles.contactSection}>
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <h1 className={styles.title}>Get in touch</h1>
                <p className={styles.subtitle}>
                  We'd love to hear from you. Please fill out this form.
                </p>
              </div>

              {/* Success/Error Messages */}
              {submitStatus && (
                <div className={`${styles.statusMessage} ${styles[submitStatus]}`}>
                  {submitStatus === 'success' ? (
                    <div className={styles.successIcon}>✓</div>
                  ) : (
                    <div className={styles.errorIcon}>!</div>
                  )}
                  <p>{submitMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.contactForm}>
                {/* Name Fields Row */}
                <div className={styles.nameRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="firstName" className={styles.label}>
                      First name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                      disabled={isLoading}
                    />
                    {errors.firstName && (
                      <span className={styles.errorText}>{errors.firstName}</span>
                    )}
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="lastName" className={styles.label}>
                      Last name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                      disabled={isLoading}
                    />
                    {errors.lastName && (
                      <span className={styles.errorText}>{errors.lastName}</span>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@aust.edu"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <span className={styles.errorText}>{errors.email}</span>
                  )}
                </div>

                {/* Phone Field */}
                <div className={styles.inputGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone number
                  </label>
                  <div className={styles.phoneInput}>
                    <select className={styles.countryCode} disabled>
                      <option value="+880">BD</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(+880) 0000-000000"
                      className={`${styles.input} ${styles.phoneNumber} ${errors.phone ? styles.inputError : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.phone && (
                    <span className={styles.errorText}>{errors.phone}</span>
                  )}
                </div>

                {/* Message Field */}
                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Leave us a message..."
                    rows="6"
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    disabled={isLoading}
                  />
                  <div className={styles.charCount}>
                    {formData.message.length}/1000
                  </div>
                  {errors.message && (
                    <span className={styles.errorText}>{errors.message}</span>
                  )}
                </div>

                {/* Privacy Policy Checkbox */}
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onChange={handleChange}
                      className={styles.checkbox}
                      disabled={isLoading}
                    />
                    <span className={styles.checkmark}></span>
                    You agree to our{' '}
                    <Link to="/privacy" className={styles.privacyLink}>
                      privacy policy
                    </Link>
                  </label>
                  {errors.agreeToPrivacy && (
                    <span className={styles.errorText}>{errors.agreeToPrivacy}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className={styles.spinner}></div>
                      Sending...
                    </>
                  ) : (
                    'Send message'
                  )}
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
