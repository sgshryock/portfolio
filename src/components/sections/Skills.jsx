import { useState, useRef, useEffect, useCallback } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { skillsData } from '../../data/skillsData';
import './Skills.css';

// Per-line animation timing (seconds)
const STEP_DELAY = 0.12; // time between each line starting
const ENERGY_OFFSET = 0.06; // energy pulse starts after line draw begins
const BADGE_OFFSET = 0.1; // badge appears after line draw begins

const CIRCLE_SIZE_DESKTOP = 180;
const CIRCLE_SIZE_MOBILE = 80;
const isMobile = () => window.innerWidth <= 768;

const getBadgeDims = () => {
  const mobile = isMobile();
  return {
    halfH: mobile ? 14 : 22,
    padX: mobile ? 20 : 36,
    charW: mobile ? 5.5 : 8.5,
    gap: mobile ? 4 : 8,
  };
};

const Skills = () => {
  const { ref, visible } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState(null);
  const [phase, setPhase] = useState('idle');
  const [badgePositions, setBadgePositions] = useState([]);
  const [lineEndpoints, setLineEndpoints] = useState([]);
  const [cardStartPos, setCardStartPos] = useState(null);
  const gridRef = useRef(null);
  const cardRefs = useRef({});
  const floatingCardRef = useRef(null);
  const activeCategoryRef = useRef(null);

  const categories = Object.entries(skillsData);

  const calculatePositions = useCallback((category) => {
    const skills = skillsData[category];
    const count = skills.length;
    const mobile = isMobile();
    // On mobile, cap radius so longest badge stays on screen
    const radius = mobile
      ? Math.min(window.innerWidth / 2 - 65, 150)
      : Math.min(window.innerWidth * 0.28, 280);
    const dims = getBadgeDims();

    const positions = skills.map((_, i) => {
      const offset = count === 4 ? Math.PI / 4 : 0;
      const angle = (2 * Math.PI * i) / count - Math.PI / 2 + offset;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      };
    });

    // Shorten each line so it stops at the badge edge, not the center
    const endpoints = positions.map((pos, i) => {
      const dist = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
      if (dist === 0) return { x: 0, y: 0 };
      const badgeHalfW = (skills[i].length * dims.charW + dims.padX) / 2;
      const ux = pos.x / dist;
      const uy = pos.y / dist;
      const absUx = Math.abs(ux);
      const absUy = Math.abs(uy);
      const edgeDist = absUx < 0.001 ? dims.halfH
        : absUy < 0.001 ? badgeHalfW
        : Math.min(badgeHalfW / absUx, dims.halfH / absUy);
      const shortenBy = Math.min(edgeDist, dist * 0.8) + dims.gap;
      const ratio = Math.max(0, (dist - shortenBy) / dist);
      return { x: pos.x * ratio, y: pos.y * ratio };
    });

    return { positions, endpoints };
  }, []);

  const closingRef = useRef(false);

  const closeCategory = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    // Safety timeout — if the chain stalls on a slow device, force-reset
    const safetyTimer = setTimeout(() => {
      setPhase('idle');
      setActiveCategory(null);
      activeCategoryRef.current = null;
      setCardStartPos(null);
      closingRef.current = false;
    }, 2500);

    // Reverse: badges fade → lines fade → unmorph → slide back → cards fade in
    setPhase('closing-badges');
    setTimeout(() => {
      setPhase('closing-lines');
      setTimeout(() => {
        setPhase('closing-morph');
        setTimeout(() => {
          setPhase('closing-slide');
          setTimeout(() => {
            setPhase('closing-fade');
            const closingCategory = activeCategoryRef.current;
            setTimeout(() => {
              clearTimeout(safetyTimer);
              setPhase('idle');
              setActiveCategory(null);
              activeCategoryRef.current = null;
              setCardStartPos(null);
              // Wait for layout to settle, then scroll to the closed card
              setTimeout(() => {
                const cardEl = cardRefs.current[closingCategory];
                if (cardEl) {
                  cardEl.scrollIntoView({ behavior: 'smooth', block: isMobile() ? 'start' : 'center' });
                }
                closingRef.current = false;
              }, 50);
            }, 250);
          }, 400);
        }, 350);
      }, 200);
    }, 150);
  }, []);

  const handleSelect = useCallback((category) => {
    if (activeCategory) {
      closeCategory();
      return;
    }

    const cardEl = cardRefs.current[category];
    if (!cardEl || !gridRef.current) return;

    // On mobile, anchor the section in view before animating
    if (isMobile()) {
      gridRef.current.closest('.skills-section')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }

    const gridRect = gridRef.current.getBoundingClientRect();
    const cardRect = cardEl.getBoundingClientRect();

    const startLeft = cardRect.left - gridRect.left;
    const startTop = cardRect.top - gridRect.top;
    const centerLeft = (gridRect.width - cardRect.width) / 2;
    const centerTop = (gridRect.height - cardRect.height) / 2;
    // Ensure grid is tall enough; use minHeight if grid is shorter
    const minH = isMobile() ? 400 : 600;
    const effectiveCenterTop = Math.max(centerTop, (minH - cardRect.height) / 2);

    setCardStartPos({
      startLeft,
      startTop,
      centerLeft,
      centerTop: effectiveCenterTop,
      width: cardRect.width,
      height: cardRect.height,
    });

    setActiveCategory(category);
    activeCategoryRef.current = category;
    const { positions, endpoints } = calculatePositions(category);
    setBadgePositions(positions);
    setLineEndpoints(endpoints);
    setPhase('fading');

    setTimeout(() => {
      setPhase('moving');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('sliding');
          setTimeout(() => {
            // Scroll grid center into view after card reaches position
            if (gridRef.current) {
              gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            setPhase('morphing');
            setTimeout(() => {
              setPhase('animating');
            }, 500);
          }, 650);
        });
      });
    }, 350);
  }, [activeCategory, calculatePositions, closeCategory]);

  useEffect(() => {
    if (!activeCategory) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeCategory();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeCategory, closeCategory]);

  useEffect(() => {
    if (phase === 'animating' && floatingCardRef.current) {
      floatingCardRef.current.focus();
    }
  }, [phase]);

  useEffect(() => {
    if (!activeCategory) return;
    const handleResize = () => {
      const { positions, endpoints } = calculatePositions(activeCategory);
      setBadgePositions(positions);
      setLineEndpoints(endpoints);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeCategory, calculatePositions]);

  const isExpanded = activeCategory && phase !== 'idle';
  const isClosing = phase.startsWith('closing-');
  const circleSize = isMobile() ? CIRCLE_SIZE_MOBILE : CIRCLE_SIZE_DESKTOP;

  // Which phases show the card as a circle
  const isCircle = phase === 'morphing' || phase === 'animating'
    || phase === 'closing-badges' || phase === 'closing-lines' || phase === 'closing-morph';

  // Which phases position the card at center
  const isAtCenter = !['fading', 'moving', 'closing-slide', 'closing-fade'].includes(phase);

  // Which phases position card at circle height
  const isCircleHeight = isCircle;

  // Which phases show lines
  const showLines = phase === 'animating'
    || phase === 'closing-badges' || phase === 'closing-lines';

  // Which phases show badges
  const showBadges = phase === 'animating' || phase === 'closing-badges';

  // Which phases show badge glow
  const showBadgeGlow = phase === 'animating' || phase === 'closing-badges';

  // Cards hidden during open phases, visible during closing-fade
  const cardsHidden = isExpanded && phase !== 'closing-fade';

  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center' }}>Skills &amp; Tech Stack</h2>
        <p className="section-subtitle" style={{ textAlign: 'center' }} aria-live="polite">
          {activeCategory ? 'Click card or press Escape to close' : 'Click a category to explore'}
        </p>
        <div
          className={`skills-grid ${visible ? 'fade-in' : 'fade-in-hidden'}`}
          ref={(el) => { ref.current = el; gridRef.current = el; }}
          style={isExpanded && phase !== 'fading' && phase !== 'closing-slide' && phase !== 'closing-fade' ? { position: 'relative', minHeight: isMobile() ? 400 : 600 } : isExpanded ? { position: 'relative' } : {}}
        >
          {/* Default card grid */}
          {categories.map(([category]) => {
            const isActive = activeCategory === category;

            return (
              <div
                key={category}
                ref={(el) => { cardRefs.current[category] = el; }}
                className={`skill-card glass ${isActive && cardsHidden ? 'skill-card-active' : cardsHidden ? 'skill-card-hidden' : ''}`}
                onClick={() => !cardsHidden && handleSelect(category)}
                role="button"
                tabIndex={cardsHidden ? -1 : 0}
                aria-hidden={cardsHidden ? true : undefined}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(category);
                  }
                }}
              >
                <h3 className="skill-card-title">{category}</h3>
              </div>
            );
          })}

          {/* Expanded state: floating card + mindmap */}
          {isExpanded && activeCategory && cardStartPos && (
            <>
              {/* Floating card */}
              <div
                ref={floatingCardRef}
                className={`skill-card glass skill-card-floating ${phase === 'closing-fade' ? 'skill-card-closing' : ''} ${isCircle ? 'skill-card-circle' : ''}`}
                style={{
                  position: 'absolute',
                  width: isCircleHeight ? circleSize : cardStartPos.width,
                  height: isCircleHeight
                    ? circleSize
                    : cardStartPos.height,
                  opacity: phase === 'closing-fade' ? 0 : 1,
                  left: isAtCenter
                    ? isCircleHeight
                      ? cardStartPos.centerLeft + (cardStartPos.width - circleSize) / 2
                      : cardStartPos.centerLeft
                    : cardStartPos.startLeft,
                  top: !isAtCenter
                    ? cardStartPos.startTop
                    : isCircleHeight
                      ? cardStartPos.centerTop - (circleSize - cardStartPos.height) / 2
                      : cardStartPos.centerTop,
                  transition: phase === 'moving' ? 'none' : undefined,
                }}
                onClick={() => handleSelect(activeCategory)}
                role="button"
                tabIndex={0}
                aria-label={activeCategory}
              >
                <h3 className={`skill-card-title ${phase === 'morphing' || phase === 'closing-badges' || phase === 'closing-lines' || phase === 'closing-morph' || phase === 'closing-slide' ? 'skill-card-title-morphing' : ''}`}>{activeCategory}</h3>
              </div>

              {/* Mindmap */}
              <div className="skill-expanded-wrapper">
                <div className="skill-mindmap">
                  <svg className="skill-mindmap-lines" viewBox="-400 -400 800 800">
                    {lineEndpoints.map((end, i) => (
                      <line
                        key={`line-${i}`}
                        x1="0"
                        y1="0"
                        x2={end.x}
                        y2={end.y}
                        className={`skill-line ${showLines ? 'skill-line-visible' : ''}`}
                        style={isClosing ? {} : { animationDelay: `${i * STEP_DELAY}s` }}
                      />
                    ))}
                    {phase === 'animating' && lineEndpoints.map((end, i) => (
                      <line
                        key={`energy-${i}`}
                        x1="0"
                        y1="0"
                        x2={end.x}
                        y2={end.y}
                        className="skill-line-energy"
                        style={{ animationDelay: `${i * STEP_DELAY + ENERGY_OFFSET}s` }}
                      />
                    ))}
                  </svg>
                  <div className="skill-mindmap-nodes" role="list">
                  {skillsData[activeCategory].map((skill, i) => (
                    <span
                      role="listitem"
                      key={skill}
                      className={`skill-node ${showBadges ? 'skill-node-visible' : ''} ${showBadgeGlow ? 'skill-node-glow' : ''}`}
                      style={{
                        left: badgePositions[i]?.x || 0,
                        top: badgePositions[i]?.y || 0,
                        transitionDelay: isClosing ? '0s' : `${i * STEP_DELAY + BADGE_OFFSET}s`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
