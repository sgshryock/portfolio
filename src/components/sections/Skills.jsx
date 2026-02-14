import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { skillsData } from '../../data/skillsData';
import SkillBadge from '../ui/SkillBadge';
import './Skills.css';

const Skills = () => {
  const { ref, visible } = useScrollAnimation();

  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center' }}>Skills &amp; Tech Stack</h2>
        <div className={`skills-grid ${visible ? 'fade-in' : 'fade-in-hidden'}`} ref={ref}>
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="skills-category glass">
              <h3 className="skills-category-title">{category}</h3>
              <div className="skills-badges">
                {skills.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
