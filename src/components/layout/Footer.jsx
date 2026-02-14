import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Gordon Shryock. Built with React &amp; Vite.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
