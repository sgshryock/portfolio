import { useRef } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './TimelineItem.css';

const TimelineItem = ({ type, title, organization, organizationUrl, period, description, highlights, expanded, onToggle }) => {
  const { ref, visible } = useScrollAnimation();
  const cardRef = useRef(null);
  const hasHighlights = highlights && highlights.length > 0;

  const handleClick = (e) => {
    if (e.target.closest('a')) return;
    if (!hasHighlights) return;

    if (expanded) {
      onToggle();
      return;
    }

    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const scrollOffset = cardCenter - viewportCenter;

      // If already centered (no scroll needed), toggle immediately
      if (Math.abs(scrollOffset) < 2) {
        onToggle();
        return;
      }

      window.scrollBy({ top: scrollOffset, behavior: 'smooth' });

      // Always use a timeout fallback — scrollend can silently fail
      // on Android when the scroll is interrupted by touch
      let toggled = false;
      const doToggle = () => {
        if (toggled) return;
        toggled = true;
        onToggle();
      };

      const fallbackTimer = setTimeout(doToggle, 600);

      if ('onscrollend' in window) {
        window.addEventListener('scrollend', () => {
          clearTimeout(fallbackTimer);
          doToggle();
        }, { once: true });
      }
    } else {
      onToggle();
    }
  };

  return (
    <div className={`timeline-item ${visible ? 'fade-in' : 'fade-in-hidden'} ${expanded ? 'marker-filled' : ''}`} ref={ref}>
      <div className={`timeline-marker ${type}`} />
      <div
        ref={cardRef}
        className={`timeline-content glass ${hasHighlights ? 'expandable' : ''}`}
        onClick={handleClick}
        {...(hasHighlights ? {
          role: 'button',
          tabIndex: 0,
          'aria-expanded': expanded,
          onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick(e);
            }
          },
        } : {})}
      >
        <span className="timeline-period">{period}</span>
        <h3 className="timeline-title">{title}</h3>
        <p className="timeline-org">
          {organizationUrl ? (
            <a href={organizationUrl} target="_blank" rel="noreferrer">{organization}</a>
          ) : (
            organization
          )}
        </p>
        <p className="timeline-desc">{description}</p>
        {hasHighlights && (
          <div className="timeline-expand-indicator">
            <span className="timeline-expand-text">{expanded ? 'Click to collapse' : 'Click to view highlights'}</span>
          </div>
        )}
        <span className={`timeline-type-badge ${type}`}>
          {type === 'work' ? 'Work' : 'Education'}
        </span>
      </div>
      {hasHighlights && (
        <div className={`timeline-branches-wrapper ${expanded ? 'branches-visible' : ''}`}>
          <div className="timeline-branches">
            {highlights.map((item, i) => (
              <div
                key={i}
                className="branch-node"
                style={{ transitionDelay: expanded ? `${i * 0.08}s` : '0s' }}
              >
                <div className="branch-arm" />
                <div className="branch-dot" />
                <div className="branch-card glass">
                  <p>{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineItem;
