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
            Have a question or want to work together? Feel free to reach out.
          </p>
          <a href="mailto:gordon@shryock.io" className="contact-email-btn">
            Say Hello
          </a>
          <div className="contact-socials">
            <a href="https://github.com/sgshryock" target="_blank" rel="noreferrer" className="contact-social-link">
              GitHub
            </a>
            <a href="https://linkedin.com/in/gordonshryock" target="_blank" rel="noreferrer" className="contact-social-link">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
