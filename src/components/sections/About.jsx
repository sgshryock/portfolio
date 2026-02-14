import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import portrait from '../../img/portrait.jpg';
import './About.css';

const About = () => {
  const { ref, visible } = useScrollAnimation();

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className={`about-grid ${visible ? 'fade-in' : 'fade-in-hidden'}`} ref={ref}>
          <div className="about-image-wrapper">
            <div className="about-image glass">
              <img src={portrait} alt="Gordon Shryock" />
            </div>
          </div>
          <div className="about-text">
            <h2 className="section-title">About Me</h2>
            <p className="about-bio">
              I lead development teams in the financial services industry,
              building enterprise systems that automate operations and scale
              with the business. Over the past 8+ years, I've grown from
              writing code to leading the people who write it — and I still
              get my hands dirty with SQL, PowerShell, and whatever tool gets
              the job done.
            </p>
            <p className="about-bio">
              Outside of work, I'm pursuing a degree in software development,
              running a homelab, 3D printing, and always picking up something new.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
