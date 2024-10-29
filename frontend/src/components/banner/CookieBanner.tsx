"use client"

import { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted the notice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    // Set cookie consent in local storage
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    // <div className='fixed bottom-0 left-0 w-full bg-custom-gray-900 text-center p-2 z-50 py-8 border-t-2 border-custom-gray-500 text-custom-gray-400'>
      
    //     <div className='absolute w-screen h-screen top-0 left-0 bg-red-100'></div>

    //   <p>This is a roulette simulator, and no real money is involved. By continuing to use the site, you agree that this is for simulation purposes only.</p>
    //   <button onClick={handleAccept} className='bg-custom-gray-600 p-2 mt-2 cursosr-pointer px-4 hover:bg-custom-gray-800
    //   rounded ml-2'>
    //     I Understand
    //   </button>
    //   {/* <div className='fixed top-0 left-0 w-screen bg-white opacity-50 h-screen backdrop-blur'></div> */}

    // </div>

    <div className='fixed top-0 left-0 w-screen h-screen bg-custom-gray-900 z-50 backdrop-blur-sm bg-opacity-50'>
        <div className='fixed bottom-0 left-0 w-full bg-custom-gray-900 text-center p-2 z-50 py-8 border-t-2 border-custom-gray-500 text-custom-gray-400'>
    
  
    <p>This is a roulette simulator, and no real money is involved. By continuing to use the site, you agree that this is for simulation purposes only.</p>
    <button onClick={handleAccept} className='bg-custom-gray-600 p-2 mt-2 cursosr-pointer px-4 hover:bg-custom-gray-800
    rounded ml-2'>
      I Understand
    </button>
    {/* <div className='fixed top-0 left-0 w-screen bg-white opacity-50 h-screen backdrop-blur'></div> */}
  
  </div>
    </div>
  );
};

const bannerStyles = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
  zIndex: 1000,
};

const buttonStyles = {
  backgroundColor: '#ff9900',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  borderRadius: '5px',
  marginLeft: '10px',
};

export default CookieBanner;
