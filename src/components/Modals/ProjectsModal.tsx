import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, Calendar, Code, ExternalLink, Filter, Lightbulb, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Project } from '../../types';
import { CaseStudyContent } from './CaseStudyContent';
import RichText from '../UI/RichText';
import { ProjectKindTag } from '../UI/ProjectKindTag';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Opens straight on this project's details (a card clicked on the page); Back shows every project. */
  initialId?: string | null;
}

const Bullet = () => <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2 flex-shrink-0" />;

const TechTags: React.FC<{ items: string[]; small?: boolean }> = ({ items, small }) => (
  <div className="flex flex-wrap gap-1.5">
    {items.map(tech => (
      <span
        key={tech}
        className={`bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 text-primary-600 dark:text-secondary-400
                    font-medium border border-primary-200 dark:border-secondary-700 ${small ? 'px-2 py-0.5 text-xs rounded-lg' : 'px-3 py-1 text-sm rounded-full'}`}
      >
        {tech}
      </span>
    ))}
  </div>
);

/** Everything about one project: description, stack, all responsibilities, link and its case study. */
const ProjectDetails: React.FC<{ project: Project }> = ({ project }) => {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
        <span className="inline-flex items-center gap-1.5"><Calendar size={14} /><span className="font-mono">{project.duration}</span></span>
        <ProjectKindTag featured={project.featured} />
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-1.5 text-primary-500 dark:text-secondary-500 hover:underline font-medium">
            <ExternalLink size={14} />{t.ui.viewProject}
          </a>
        )}
      </div>

      <RichText text={project.description} className="text-[15px] text-neutral-700 dark:text-neutral-300 leading-relaxed" />

      <section>
        <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          <Code size={14} className="text-primary-500 dark:text-secondary-500" />{t.ui.tech_stack}
        </h4>
        <TechTags items={project.techStack} />
      </section>

      {project.responsibilities.length > 0 && (
        <section>
          <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">{t.ui.key_responsibilities}</h4>
          <ul className="space-y-2">
            {project.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <Bullet /><span>{resp}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.caseStudy && (
        <section className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-4">{t.projects.case_study}</h4>
          <CaseStudyContent study={project.caseStudy} />
        </section>
      )}
    </div>
  );
};

export const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose, initialId }) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured' | 'main'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const body = useRef<HTMLDivElement>(null);
  /** Where the list was scrolled, so Back returns to the same card. */
  const listScroll = useRef(0);

  // Each opening starts on the clicked project (if any) or the list.
  useEffect(() => {
    if (isOpen) { setSelectedId(initialId ?? null); listScroll.current = 0; }
  }, [isOpen, initialId]);

  // Details start at the top; the list comes back where it was.
  useLayoutEffect(() => {
    if (body.current) body.current.scrollTop = selectedId ? 0 : listScroll.current;
  }, [selectedId]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (selectedId) setSelectedId(null); else onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, selectedId, onClose]);

  if (!isOpen) return null;

  const allProjects = t.projects.items;
  const selected = allProjects.find(p => p.id === selectedId) ?? null;

  const filteredProjects = allProjects.filter(project => {
    if (activeFilter === 'featured') return project.featured;
    if (activeFilter === 'main') return !project.featured;
    return true;
  });

  const filters = [
    { key: 'all', label: t.projects.filters?.all || 'All Projects', count: allProjects.length },
    { key: 'featured', label: t.projects.kind_feature, count: allProjects.filter(p => p.featured).length },
    { key: 'main', label: t.projects.kind_enterprise, count: allProjects.filter(p => !p.featured).length }
  ];

  const open = (id: string) => {
    listScroll.current = body.current?.scrollTop ?? 0;
    setSelectedId(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-7xl max-h-[90vh] flex flex-col bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 shrink-0">
          {selected && (
            <button
              onClick={() => setSelectedId(null)}
              className="inline-flex items-center gap-1.5 pl-2 pr-3 py-1.5 text-sm font-medium text-white bg-white/15 hover:bg-white/25 rounded-lg transition-colors shrink-0"
            >
              <ArrowLeft size={16} />{t.ui.back || 'Back'}
            </button>
          )}
          <h2 className="flex-1 min-w-0 text-lg sm:text-xl font-bold text-white truncate">
            {selected ? selected.title : t.projects.allTitle || 'All Projects'}
          </h2>
          <button onClick={onClose} className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors shrink-0" aria-label="Close">
            <X size={22} />
          </button>
        </div>

        {/* Filters */}
        {!selected && (
          <div className="px-6 py-3 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 shrink-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 mr-1 text-sm text-primary-500 dark:text-secondary-500 font-semibold">
                <Filter size={15} />{t.ui.filter}:
              </span>
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key as 'all' | 'featured' | 'main')}
                  className={`px-3.5 py-1.5 rounded-lg font-medium text-xs transition-all duration-300 flex items-center gap-1.5
                            ${activeFilter === filter.key
                              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow'
                              : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-neutral-200 dark:border-neutral-700'
                            }`}
                >
                  <span>{filter.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold ${
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
        )}

        <div ref={body} className="p-6 overflow-y-auto">
          {selected ? (
            <ProjectDetails project={selected} />
          ) : (
            <>
              <div className="grid lg:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="group">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => open(project.id)}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(project.id); } }}
                      className="card p-6 h-full cursor-pointer hover:shadow-glow transition-all duration-500 hover:-translate-y-1 relative overflow-hidden
                                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                    >
                      {/* Feature project / enterprise grade */}
                      <div className="absolute top-4 right-4">
                        <ProjectKindTag featured={project.featured} />
                      </div>

                      {/* Project Header */}
                      <div className="flex items-start justify-between mb-4 pr-24">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2 group-hover:text-primary-500 dark:group-hover:text-secondary-500 transition-colors">
                            {project.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                            <Calendar size={14} />
                            <span className="font-mono">{project.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Project Description */}
                      <RichText text={project.description} className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-4" />

                      {/* Tech Stack */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Code size={14} className="text-primary-500 dark:text-secondary-500" />
                          <span className="font-semibold text-neutral-700 dark:text-neutral-300 text-sm">{t.ui.tech_stack}</span>
                        </div>
                        <TechTags items={project.techStack} small />
                      </div>

                      {/* Responsibilities preview */}
                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                        <div className="text-neutral-700 dark:text-neutral-300 font-semibold text-sm mb-2">
                          {t.ui.key_responsibilities}:
                        </div>
                        <div className="space-y-1">
                          {project.responsibilities.slice(0, 3).map((resp, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <Bullet />
                              <span className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">{resp}</span>
                            </div>
                          ))}
                          {project.responsibilities.length > 3 && (
                            <div className="text-neutral-400 dark:text-neutral-500 text-xs font-mono">
                              +{project.responsibilities.length - 3} {t.ui.more_responsibilities}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3 text-sm font-medium text-primary-500 dark:text-secondary-500">
                        <span className="inline-flex items-center gap-1.5">
                          {project.caseStudy && <><Lightbulb size={14} />{t.projects.case_study}</>}
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">{t.ui.view_details || 'View details'} →</span>
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
                    {t.ui.no_projects}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
