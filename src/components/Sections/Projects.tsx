import React, { useState } from 'react';
import { ExternalLink, Github, Calendar, Code, Star, ArrowRight } from 'lucide-react';
import { ProjectsModal } from '../Modals/ProjectsModal';
import { useLanguage } from '../../contexts/LanguageContext';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [showAllProjects, setShowAllProjects] = useState(false);

  const featuredProjects = t.projects.items.filter(project => project.featured);

  return (
    <>
      <section id="projects" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-6">
              {t.projects.title}
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {t.projects.subTitle}
            </p>
            <div className="w-24 h-1 mb-5 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className={`group fade-in-${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="card p-8 hover:shadow-glow transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-accent-500 to-success-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      <Star size={12} />
                      <span>FEATURED</span>
                    </div>
                  </div>

                  {/* Project Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-3 group-hover:text-primary-500 dark:group-hover:text-secondary-500 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                      <Calendar size={16} />
                      <span className="font-mono">{project.duration}</span>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Code size={16} className="text-primary-500 dark:text-secondary-500" />
                      <span className="font-semibold text-neutral-700 dark:text-neutral-300">Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 
                                   text-primary-600 dark:text-secondary-400 text-sm font-medium rounded-full border border-primary-200 dark:border-secondary-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Responsibilities Preview */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Key Highlights:</h4>
                    <ul className="space-y-1">
                      {project.responsibilities.slice(0, 2).map((resp, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Project Links */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-primary-500 dark:text-secondary-500 hover:text-primary-600 dark:hover:text-secondary-600 transition-colors"
                        >
                          <ExternalLink size={16} />
                          <span className="text-sm font-medium">View Project</span>
                        </a>
                      )}
                    </div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12 fade-in-up">
            <button
              onClick={() => setShowAllProjects(true)}
              className="inline-flex btn-secondary group"
            >
              <span>{t.projects.viewAll}</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform px-1 w-10"/>
            </button>
          </div>
        </div>
      </section>

      {/* Projects Modal */}
      <ProjectsModal
        isOpen={showAllProjects}
        onClose={() => setShowAllProjects(false)}
      />
    </>
  );
};