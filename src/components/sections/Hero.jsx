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
          I build systems, automate operations, and lead teams that deliver.
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
