import './Hero.css';
import heroImg from '../../img/florida-palms-hero.jpg';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroImg})` }} />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-name">Gordon Shryock</h1>
        <p className="hero-tagline">
          Enterprise DevOps, Platform Modernization &amp; AI-Augmented Delivery
        </p>
      </div>
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
