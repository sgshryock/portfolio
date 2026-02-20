import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Contact.css';

const Contact = () => {
  const { ref, visible } = useScrollAnimation();

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className={`contact-card glass ${visible ? 'fade-in' : 'fade-in-hidden'}`} ref={ref}>
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-desc">
            Open to conversations about engineering leadership, platform modernization, and enterprise delivery.
          </p>
          <a href="mailto:gordon@shryock.io" className="contact-email-btn">
            Let's Connect
          </a>
          <div className="contact-socials">
            <a href="https://github.com/sgshryock" target="_blank" rel="noreferrer" className="contact-social-link">
              GitHub
            </a>
            <a href="https://linkedin.com/in/gordonshryock" target="_blank" rel="noreferrer" className="contact-social-link">
              LinkedIn
            </a>
            <a href="/Shryock_VP_Resume.pdf" target="_blank" rel="noreferrer" className="contact-social-link">
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
