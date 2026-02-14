import { useContext } from 'react';
import { ThemeContext } from '../../context';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <button
      className="theme-toggle"
      onClick={() => theme.dispatch({ type: 'TOGGLE' })}
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
    >
      <div className="toggle-track">
        <span className="toggle-icon toggle-icon-sun">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
        <span className="toggle-icon toggle-icon-moon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        </span>
        <div
          className="toggle-thumb"
          className={`toggle-thumb ${darkMode ? 'thumb-right' : ''}`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
