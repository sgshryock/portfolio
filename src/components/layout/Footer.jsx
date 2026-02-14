import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Gordon Shryock. Built with React &amp; Vite.
        </p>
        <p className="footer-text footer-credit">
          With assistance from Claude Opus 4.6
        </p>
      </div>
    </footer>
  );
};

export default Footer;
