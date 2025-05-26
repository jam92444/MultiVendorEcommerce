// components/Hero/Hero.jsx
import React from 'react';
import '../Styles/components/_hero.scss'
import asset from '../Utility/asset';

const Hero = () => {
  return (
    <div className="heroWrapper">
      {/* Left */}
      <div className="left">
        <div className="content">
          <div className="bestseller">
            <p className="line"></p>
            <p className="label">OUR BESTSELLER</p>
          </div>
          <h1 className="title">Latest Arrivals</h1>
          <div className="shopNow">
            <p className="shopText">SHOP NOW</p>
            <p className="line"></p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="right">
        <img src={asset.heroImg} alt="Hero" className="heroImage" />
      </div>
    </div>
  );
};

export default Hero;
