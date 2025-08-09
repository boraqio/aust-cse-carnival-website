import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  console.log('Home component is rendering'); // Debug log

  return (
    <div className={styles.home}>
      <h1 style={{color: '#2ec095', padding: '100px 20px', textAlign: 'center'}}>
        AUST CSE Carnival Home Page
      </h1>
      <p style={{textAlign: 'center', fontSize: '18px'}}>
        If you can see this text, the Home component is working!
      </p>
    </div>
  );
};

export default Home;
