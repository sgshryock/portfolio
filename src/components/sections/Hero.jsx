import './Hero.css';
import heroImg from '../../img/nightmountainsheader.jpeg';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroImg})` }} />
      <div className="hero-overlay" />
      <div className="hero-content glass-strong">
        <p className="hero-greeting">Hello, my name is</p>
        <h1 className="hero-name">Gordon Shryock</h1>
        <div className="hero-titles">
          <span>VP of Development</span>
          <span className="hero-dot">&middot;</span>
          <span>SQL Developer</span>
          <span className="hero-dot">&middot;</span>
          <span>Team Leader</span>
        </div>
        <p className="hero-desc">
          Development leader in the financial services sector with a passion for building scalable solutions, automating operations, and empowering teams.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="hero-btn hero-btn-primary">View My Work</a>
          <a href="#contact" className="hero-btn hero-btn-secondary">Get In Touch</a>
        </div>
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
