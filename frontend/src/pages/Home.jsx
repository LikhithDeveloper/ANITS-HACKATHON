import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Services />
      <Testimonials />
    </div>
  );
};

export default Home;
