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
              I'm a credit union technology executive with 8+ years in the
              industry, including 5+ years in management. I've grown from
              writing code to leading the development and computer operations
              teams that build and support regulated systems — owning enterprise
              data governance, data warehouse disaster recovery, and reporting
              for NCUA and internal audits. Along the way I've driven CI/CD
              that cut deployment cycles by 40% and prevented 278 production
              defects in year one, and validation controls that improved data
              accuracy by 30%.
            </p>
            <p className="about-bio">
              Outside of work, I'm finishing my BS in Information Systems
              Technology (expected May 2027),
              running a homelab, 3D printing, and always picking up something new.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
