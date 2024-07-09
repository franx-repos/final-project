import React from 'react';
import NavigationTop from '../../NavigationTop';
import ParticlesBackground from '../../ParticlesBackground';
// import Footer from '../../Footer';

const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      fontSize: '2em',
      marginBottom: '20px',
    },
    text: {
      fontSize: '1.2em',
      lineHeight: '1.6',
      marginBottom: '15px',
    },
  };

const About = () => {
  return (
    <>
    
    <div style={styles.container} className='flex flex-col justify-center bg-slate-200/80 dark:bg-gray-900/80  '>
        <ParticlesBackground />
        <NavigationTop />
        <div className='flex justify-center'>
        <div className='w-[50%] '>
      <h2 style={styles.header} className='font-bold text-2xl mt-5 text-gray-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300 text-enter'>About Us</h2>
      <p style={styles.text} className=' text-left font-semibold text-gray-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300 text-enter'>
        Welcome to TAXMAX, your trusted partner for all your tax declaration needs. 
        Our mission is to simplify the tax filing process for individuals and businesses 
        by providing an easy-to-use platform that guides you through every step.
      </p>
      <p style={styles.text} className='text-left font-semibold text-gray-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300 text-enter'>
        With years of experience in the field, our team of experts is dedicated to ensuring 
        that you get the most out of your tax returns. We keep up with the latest tax laws 
        and regulations to provide you with accurate and up-to-date information.
      </p>
      <p style={styles.text} className='text-left font-semibold text-gray-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300 text-enter'>
        At TAXMAX, we value your time and peace of mind. That's why we've designed 
        our service to be intuitive, efficient, and secure. Whether you're filing your 
        taxes for the first time or you're a seasoned filer, we're here to help.
      </p>
      <p style={styles.text} className='text-left font-semibold text-gray-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300 text-enter'>
        Thank you for choosing TAXMAX. We look forward to helping you navigate your 
        tax journey with confidence and ease.
      </p>
      </div>
      </div>
    </div>
      {/* <Footer /> */}
    </>
  );
};


export default About;
