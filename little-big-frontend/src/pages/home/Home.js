import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const services = [
    { title: 'Audio', icon: 'bi-file-earmark-music' },
    { title: 'Image', icon: 'bi-image'},
    { title: 'Video', icon: 'bi-camera-reels'}
  ];

  const navigate = useNavigate();
  const handleNavigation = (serviceTitle) => {
    // Navigate to a different route based on the service title
    navigate(`/${serviceTitle.toLowerCase()}`);
  };
  return (
    <div>
      <h1 className='text-muted'>Home Page</h1>
      <div className='custom-card-container'>
        {services.map((service, index) => (
          <div
            key={index}
            className='card-btn'
            onClick={() => handleNavigation(service.title)}
          >
            <i className={"bi " + service.icon}></i>
            <span>{service.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;