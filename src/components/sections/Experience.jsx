import { useState } from 'react';
import { experienceData } from '../../data/experienceData';
import TimelineItem from '../ui/TimelineItem';
import './Experience.css';

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center' }}>Experience</h2>
        <div className="timeline">
          {experienceData.map((item, index) => (
            <TimelineItem
              key={index}
              {...item}
              expanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
