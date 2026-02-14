import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { educationData } from '../../data/educationData';
import './Education.css';

const Education = () => {
  const { ref, visible } = useScrollAnimation();

  return (
    <section className="section education-section" id="education">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center' }}>Education</h2>
        <div className={`education-grid ${visible ? 'fade-in' : 'fade-in-hidden'}`} ref={ref}>
          {educationData.map((item, index) => (
            <div key={index} className="education-card glass">
              <div className="education-card-header">
                <span className="education-period">{item.period}</span>
                <span className="education-status">
                  {item.status === 'In Progress' ? 'Bachelors - In Progress' : `${item.status} — Awarded`}
                </span>
              </div>
              <h3 className="education-title">{item.title}</h3>
              <p className="education-org">
                {item.organizationUrl ? (
                  <a href={item.organizationUrl} target="_blank" rel="noreferrer">{item.organization}</a>
                ) : (
                  item.organization
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
