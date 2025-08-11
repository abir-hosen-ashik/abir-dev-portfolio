import React, { useState } from 'react';
import { Calendar, Code, ExternalLink, Filter, X, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured' | 'main'>('all');

  if (!isOpen) return null;

  const allProjects = t.projects.items;
  
  const filteredProjects = allProjects.filter(project => {
    if (activeFilter === 'featured') return project.featured;
    if (activeFilter === 'main') return !project.featured;
    return true;
  });

  const filters = [
    { key: 'all', label: t.projects.filters?.all || 'All Projects', count: allProjects.length },
    { key: 'featured', label: t.projects.filters?.featured || 'Featured', count: allProjects.filter(p => p.featured).length },
    { key: 'main', label: t.projects.filters?.main || 'Main Projects', count: allProjects.filter(p => !p.featured).length }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-7xl max-h-[90vh] bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-primary-500 to-secondary-500">
          <h2 className="text-2xl font-bold text-white">
            {t.projects.allTitle || 'All Projects'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Filters */}
        <div className="px-8 py-6 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center space-x-3 mb-4">
            <Filter className="text-primary-500 dark:text-secondary-500" size={20} />
            <span className="text-primary-500 dark:text-secondary-500 font-semibold">Filter Projects:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as 'all' | 'featured' | 'main')}
                className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center space-x-2
                          ${activeFilter === filter.key 
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow' 
                            : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-neutral-200 dark:border-neutral-700'
                          }`}
              >
                <span>{filter.label}</span>
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                  activeFilter === filter.key 
                    ? 'bg-white/20 text-white' 
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="group">
                <div className="card p-6 hover:shadow-glow transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-accent-500 to-success-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        <Star size={12} />
                        <span>FEATURED</span>
                      </div>
                    </div>
                  )}

                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2 group-hover:text-primary-500 dark:group-hover:text-secondary-500 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                        <Calendar size={14} />
                        <span className="font-mono">{project.duration}</span>
                      </div>
                    </div>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-primary-500 dark:text-secondary-500 hover:bg-primary-50 dark:hover:bg-secondary-900/20 rounded-lg transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>

                  {/* Project Description */}
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Code size={14} className="text-primary-500 dark:text-secondary-500" />
                      <span className="font-semibold text-neutral-700 dark:text-neutral-300 text-sm">Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 
                                   text-primary-600 dark:text-secondary-400 text-xs font-medium rounded-lg border border-primary-200 dark:border-secondary-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                    <div className="text-neutral-700 dark:text-neutral-300 font-semibold text-sm mb-2">
                      Key Responsibilities:
                    </div>
                    <div className="space-y-1">
                      {project.responsibilities.slice(0, 3).map((resp, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">{resp}</span>
                        </div>
                      ))}
                      {project.responsibilities.length > 3 && (
                        <div className="text-neutral-400 dark:text-neutral-500 text-xs font-mono">
                          +{project.responsibilities.length - 3} more responsibilities...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-neutral-400 dark:text-neutral-500">
                No projects found for the selected filter.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};