import React, { useState } from 'react';
import { Calendar, Code, ExternalLink, Filter } from 'lucide-react';
import { TerminalWindow } from '../Terminal/TerminalWindow';
import { useLanguage } from '../../contexts/LanguageContext';
import { Project } from '../../types';

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
        className="absolute inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-7xl max-h-[90vh] bg-gray-900 dark:bg-black rounded-lg 
                    border border-gray-700 dark:border-green-500/30 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-800 dark:bg-gray-900 
                      border-b border-gray-700 dark:border-green-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-white dark:text-green-300 font-mono ml-4">
              {t.projects.allTitle || 'All Projects'}
            </h2>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-red-400 dark:hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        </div>
        
        {/* Filters */}
        <div className="px-6 py-4 bg-gray-800/50 dark:bg-gray-900/50 border-b border-gray-700 dark:border-green-500/30">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="text-green-400 dark:text-green-500" size={20} />
            <span className="text-green-400 dark:text-green-500 font-mono">Filter Projects:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as 'all' | 'featured' | 'main')}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 flex items-center space-x-2
                          ${activeFilter === filter.key 
                            ? 'bg-green-500 dark:bg-green-600 text-black dark:text-white' 
                            : 'bg-gray-700 dark:bg-gray-800 text-gray-300 dark:text-gray-400 hover:bg-green-500/20 dark:hover:bg-green-600/20'
                          }`}
              >
                <span>{filter.label}</span>
                <span className="bg-black/20 dark:bg-white/20 px-2 py-1 rounded text-xs">
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="group">
                <TerminalWindow title={`${activeFilter}_project_${index + 1}.json`}>
                  <div className="space-y-4">
                    {/* Project Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-bold text-white dark:text-green-300">
                            {project.title}
                          </h3>
                          {project.featured && (
                            <span className="px-2 py-1 bg-green-500/20 dark:bg-green-600/20 text-green-400 dark:text-green-500 
                                           text-xs font-mono rounded border border-green-500/30 dark:border-green-600/30">
                              FEATURED
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400 dark:text-gray-500 mb-3">
                          <Calendar size={14} />
                          <span className="font-mono">{project.duration}</span>
                        </div>
                      </div>
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

                    {/* Project Description */}
                    <div className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-green-400 dark:text-green-500">
                        <Code size={14} />
                        <span className="font-mono text-xs">Tech Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-1 bg-gray-800 dark:bg-gray-900 text-green-400 dark:text-green-500 
                                     text-xs font-mono rounded border border-green-500/30 dark:border-green-600/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="border-t border-gray-700 dark:border-green-500/30 pt-3">
                      <div className="text-green-400 dark:text-green-500 font-mono text-xs mb-2">
                        Key Responsibilities:
                      </div>
                      <div className="space-y-1">
                        {project.responsibilities.slice(0, 3).map((resp, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <span className="text-green-400 dark:text-green-500 mt-1 text-xs">▸</span>
                            <span className="text-gray-300 dark:text-gray-400 text-xs leading-relaxed">{resp}</span>
                          </div>
                        ))}
                        {project.responsibilities.length > 3 && (
                          <div className="text-gray-500 dark:text-gray-600 text-xs font-mono">
                            +{project.responsibilities.length - 3} more responsibilities...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TerminalWindow>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 font-mono">
                No projects found for the selected filter.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};