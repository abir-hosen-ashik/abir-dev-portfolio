import React, { useState } from 'react';
import { ExternalLink, Github, Calendar, Code } from 'lucide-react';
import { TerminalWindow } from '../Terminal/TerminalWindow';
import { ProjectsModal } from '../Modals/ProjectsModal';
import { useLanguage } from '../../contexts/LanguageContext';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const featuredProjects = t.projects.items.filter(project => project.featured);

  return (
    <>
      <section id="projects" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white dark:text-green-300 mb-6 font-mono">
              {t.projects.title}
            </h2>
            <div className="w-24 h-1 bg-green-500 dark:bg-green-600 mx-auto rounded"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="group">
                <TerminalWindow title={`project_${index + 1}.json`}>
                  <div className="space-y-4">
                    {/* Project Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white dark:text-green-300 mb-2">
                          {project.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-400 dark:text-gray-500 mb-3">
                          <Calendar size={16} />
                          <span className="font-mono">{project.duration}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 text-green-400 dark:text-green-500 hover:text-green-300 dark:hover:text-green-400 
                                     transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Project Description */}
                    <div className="text-gray-300 dark:text-gray-400 leading-relaxed">
                      {project.description}
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-green-400 dark:text-green-500">
                        <Code size={16} />
                        <span className="font-mono text-sm">Tech Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 bg-gray-800 dark:bg-gray-900 text-green-400 dark:text-green-500 
                                     text-xs font-mono rounded border border-green-500/30 dark:border-green-600/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Responsibilities - Expandable */}
                    <div className="border-t border-gray-700 dark:border-green-500/30 pt-4">
                      <button
                        onClick={() => setSelectedProject(
                          selectedProject === project.id ? null : project.id
                        )}
                        className="flex items-center space-x-2 text-green-400 dark:text-green-500 hover:text-green-300 
                                 dark:hover:text-green-400 transition-colors font-mono text-sm"
                      >
                        <span>{selectedProject === project.id ? '▼' : '▶'}</span>
                        <span>Key Responsibilities</span>
                      </button>
                      
                      {selectedProject === project.id && (
                        <div className="mt-3 space-y-2 text-sm text-gray-300 dark:text-gray-400">
                          {project.responsibilities.map((resp, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <span className="text-green-400 dark:text-green-500 mt-1">•</span>
                              <span>{resp}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </TerminalWindow>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowAllProjects(true)}
              className="bg-transparent border-2 border-green-500 dark:border-green-600 text-green-500 dark:text-green-400 
                       hover:bg-green-500 dark:hover:bg-green-600 hover:text-black dark:hover:text-white 
                       px-8 py-3 rounded-lg font-mono transition-all duration-300 
                       hover:shadow-lg hover:shadow-green-500/25"
            >
              <span>{t.projects.viewAll}</span>
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