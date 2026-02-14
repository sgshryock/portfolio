import './ProjectCard.css';

const ProjectCard = ({ title, description, image, link, github, tags }) => {
  return (
    <div className="project-card glass">
      <div className="project-card-image">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="project-card-placeholder">
            <span>{title[0]}</span>
          </div>
        )}
        <div className="project-card-overlay">
          {link && (
            <a href={link} target="_blank" rel="noreferrer" className="project-link">
              Live
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="project-link">
              GitHub
            </a>
          )}
        </div>
      </div>
      <div className="project-card-content">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-desc">{description}</p>
        <div className="project-card-tags">
          {tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
        {(link || github) && (
          <div className="project-card-links">
            {link && (
              <a href={link} target="_blank" rel="noreferrer" className="project-link-visible">
                Live
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className="project-link-visible">
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
