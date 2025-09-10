import React from 'react';

function Hero() {
  return (
    <section className="hero container">
      <div className="hero-text">
        <h1><span>See</span> everything with <span>Clarity</span></h1>
        <p>
          Buying eyewear should leave you happy and good-looking, with money in
          your pocket. Glasses, sunglasses, and contacts—we've got your eyes
          covered.
        </p>
        <button>Shop Now →</button>
      </div>
      <div className="hero-img">
        <img src="assets/banner-girl.png" alt="Woman wearing glasses" />
      </div>
    </section>
  );
}

export default Hero;