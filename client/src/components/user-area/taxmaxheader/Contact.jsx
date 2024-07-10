import React from 'react'
import NavigationTop from '../../NavigationTop';
import ParticlesBackground from '../../ParticlesBackground';


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


function Contact() {
  return (
    <>
    <div style={styles.container} className='flex flex-col justify-center bg-slate-200/80 dark:bg-gray-900/80   '>
    <ParticlesBackground />
        <NavigationTop />
        <div className='flex justify-center '>
        
    <div className=' text-center'>
    <h2 style={styles.header} className='font-bold text-2xl mt-5 text-gray-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300 text-enter'>Contact</h2>

      <p style={styles.text} className=' text-left font-semibold text-gray-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300 text-enter'>
        Do you have questions, problems or suggestions regarding our app or your tax return? <br />
        Our support team is there for you throughout the working week and is happy to listen to your concerns!
      </p>
      <a href="" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-gray-900  hover:bg-gray-100 rounded focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
        Support Center <span className="arrow">➔</span>
      </a>
    </div>

    
    {/* <div className=" bg-[url('./public/kontakt_desk.webp')] bg-right h-auto bg-no-repeat mt-28 relative"></div> */}
    {/* <div className=" max-w-full ">
    <img src=".\public\kontakt_desk.webp" alt="Contact" /> 
    </div> */}
    </div>
  </div>
  </>
);
};


export default Contact