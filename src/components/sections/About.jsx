import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import realMe from '../../img/realme.jpg';
import './About.css';

const About = () => {
  const { ref, visible } = useScrollAnimation();

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className={`about-grid ${visible ? 'fade-in' : 'fade-in-hidden'}`} ref={ref}>
          <div className="about-image-wrapper">
            <div className="about-image glass">
              <img src={realMe} alt="Gordon Shryock" />
            </div>
          </div>
          <div className="about-text">
            <h2 className="section-title">About Me</h2>
            <p className="about-bio">
              I'm the VP of Development at Florida Credit Union, where I lead a
              team focused on building scalable financial solutions and driving
              operational excellence. Over 8+ years at FCU, I've grown from
              Developer to AVP to VP, working hands-on with MSSQL, PowerShell,
              PowerOn, SSRS, Crystal Reports, and OpCon.
            </p>
            <p className="about-bio">
              Outside of work, I'm continuing my education in software development
              and computer science, and spending time with 3D printing, homelab
              projects, and picking up new technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
