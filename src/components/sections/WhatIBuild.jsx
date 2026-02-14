import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { accomplishmentsData } from '../../data/accomplishmentsData';
import './WhatIBuild.css';

const WhatIBuild = () => {
  const { ref, visible } = useScrollAnimation();

  return (
    <section className="section what-i-build-section" id="what-i-build">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center' }}>What I Build</h2>
        <p className="section-subtitle" style={{ textAlign: 'center' }}>
          Enterprise systems and solutions I've delivered — built to last, not to demo.
        </p>
        <div className={`wib-grid ${visible ? 'fade-in' : 'fade-in-hidden'}`} ref={ref}>
          {accomplishmentsData.map((item) => (
            <div key={item.id} className="wib-card glass">
              <h3 className="wib-card-title">{item.title}</h3>
              <p className="wib-card-desc">{item.description}</p>
              <div className="wib-card-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="wib-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIBuild;
