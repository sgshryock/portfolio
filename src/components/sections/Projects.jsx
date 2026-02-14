import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { projectsData } from '../../data/projectsData';
import ProjectCard from '../ui/ProjectCard';
import './Projects.css';

const Projects = () => {
  const { ref, visible } = useScrollAnimation();

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center' }}>Projects</h2>
        <p className="section-subtitle" style={{ textAlign: 'center' }}>
          A selection of things I've built.
        </p>
        <div className={`projects-grid ${visible ? 'fade-in' : 'fade-in-hidden'}`} ref={ref}>
          {projectsData.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
