import { useState, useEffect, useCallback } from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import './Navigation.css';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'What I Build', href: '#what-i-build' },
  { label: 'Skills', href: '#skills' },
  // { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Scroll handler with RAF throttle
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);

        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
        if (atBottom) {
          setActiveSection(navLinks[navLinks.length - 1].href.slice(1));
          ticking = false;
          return;
        }

        const sections = navLinks.map((l) => l.href.slice(1));
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.getBoundingClientRect().top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">GS</a>
        {menuOpen && <div className="nav-backdrop" onClick={closeMenu} />}
        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`} role="menubar">
          {navLinks.map(({ label, href }) => (
            <li key={href} role="none">
              <a
                href={href}
                className={`nav-link ${activeSection === href.slice(1) ? 'active' : ''}`}
                onClick={closeMenu}
                role="menuitem"
              >
                {label}
              </a>
            </li>
          ))}
          <li role="none">
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
