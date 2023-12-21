import { useState, useEffect } from 'react';
import Background from '../assets/images/Car.jpg';

function Home() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: windowWidth > 100 ? 'cover' : 'contain', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      className='flex flex-row justify-center items-center h-screen bg-fixed'
    >
    </div>
  );
}

export default Home;
