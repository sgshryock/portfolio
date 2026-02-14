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
        <span className="toggle-icon">&#9788;</span>
        <span className="toggle-icon">&#9789;</span>
        <div
          className="toggle-thumb"
          style={{ transform: darkMode ? 'translateX(0)' : 'translateX(26px)' }}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
