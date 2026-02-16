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
              I'm an enterprise engineering leader with 9+ years of progressive
              experience modernizing financial and operational systems within
              regulated environments. I've grown from writing code to leading
              the teams that write it — driving DevOps transformation that
              cut deployment cycles by 40%, CI/CD initiatives that prevented
              278 production defects in year one, and data frameworks that
              improved financial accuracy by 30%.
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
