import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, FolderKanban, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { iconFor } from '../UI/icons';
import { ProjectsModal } from '../Modals/ProjectsModal';
import { localizeDigits } from '../../data/loadContent';
import { Project } from '../../types';

// Proficiency is shown as evidence, not self-rating: each skill counts the
// projects whose tech stack uses it (same name, ignoring case, punctuation and
// a trailing "JS"), and lists them on click; a project opens its details.
const skillKey = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/js$/, '');

// Keyed by the category's icon, which also picks its colour.
const iconColors: Record<string, string> = {
  cpu: 'text-primary-500 dark:text-secondary-500',
  code: 'text-info-500',
  globe: 'text-accent-500',
  database: 'text-success-500',
  cloud: 'text-info-600',
  wrench: 'text-neutral-600',
  sparkles: 'text-primary-500 dark:text-secondary-500',
};

const categoryColors: Record<string, string> = {
  cpu: 'from-primary-500 to-secondary-500',
  code: 'from-info-500 to-info-600',
  globe: 'from-accent-500 to-accent-600',
  database: 'from-success-500 to-success-600',
  cloud: 'from-info-600 to-primary-500',
  wrench: 'from-neutral-600 to-neutral-700',
  sparkles: 'from-primary-500 to-secondary-500',
};

/** Skills per page of the fixed skill area (3×4 on wide screens, 2×6 on narrow). */
const PAGE = 12;

const CategoryIcon = ({ icon }: { icon: string }) => {
  const Icon = iconFor(icon);
  return <Icon className={iconColors[icon] ?? iconColors.code} size={24} />;
};

export const TechStack: React.FC = () => {
  const { t, language } = useLanguage();
  const categories = t.techStack.categories;
  const [activeId, setActiveId] = useState<string | undefined>(categories[0]?.id);
  const active = categories.find(c => c.id === activeId) ?? categories[0];
  const activeColor = active ? categoryColors[active.icon] ?? categoryColors.code : '';
  const [openSkill, setOpenSkill] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  /** Projects using each skill, by normalised name. */
  const usage = useMemo(() => {
    const map = new Map<string, Project[]>();
    for (const p of t.projects.items) {
      for (const key of new Set(p.techStack.map(skillKey))) map.set(key, [...(map.get(key) ?? []), p]);
    }
    return map;
  }, [t.projects.items]);
  const projectsFor = (skill: string) => usage.get(skillKey(skill)) ?? [];
  const countLabel = (n: number) => (n === 1 ? t.ui.projects_count_one : t.ui.projects_count.replace('{n}', localizeDigits(n, language)));
  const mostUsed = active
    ? active.skills.map(skill => ({ skill, n: projectsFor(skill).length })).filter(x => x.n > 0).sort((a, b) => b.n - a.n).slice(0, 3)
    : [];
  const openList = openSkill ? projectsFor(openSkill) : [];
  const skills = active?.skills ?? [];
  const pages = Math.max(1, Math.ceil(skills.length / PAGE));
  const current = Math.min(page, pages - 1);
  const pageSkills = skills.slice(current * PAGE, current * PAGE + PAGE);
  const arrow = 'shrink-0 self-center p-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 ' +
    'hover:text-primary-500 dark:hover:text-secondary-500 hover:border-primary-300 dark:hover:border-secondary-500 transition-colors disabled:opacity-25 disabled:pointer-events-none';

  return (
    <section id="tech-stack" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-6">
            {t.techStack.title}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            {t.techStack.subTitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Both cards share one height on wide screens: the taller sets it, the other stretches. */}
        <div className="grid lg:grid-cols-4 gap-8 lg:items-stretch">
          {/* Category Navigation */}
          <div className="lg:col-span-1 fade-in-left flex">
            <div className="card p-6 w-full">
              <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center space-x-2">
                <Zap className="text-primary-500 dark:text-secondary-500" size={20} />
                <span>{t.ui.categories}</span>
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => { setActiveId(category.id); setOpenSkill(null); setPage(0); }}
                    className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 text-left group
                              ${active?.id === category.id
                                ? `bg-gradient-to-r ${categoryColors[category.icon] ?? categoryColors.code} text-white shadow-glow` 
                                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                              }`}
                  >
                    <div className={active?.id === category.id ? 'text-white' : ''}>
                      <CategoryIcon icon={category.icon} />
                    </div>
                    <div>
                      <div className="font-semibold">{category.title}</div>
                      <div className="text-xs opacity-75">{category.skills.length} {t.ui.skills}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Display: fixed header, skill area and footer; the skills page with the arrows. */}
          {active && <div className="lg:col-span-3 fade-in-right flex">
            <div className="card p-6 lg:p-8 w-full flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 shrink-0">
                <CategoryIcon icon={active.icon} />
                <h3 className="flex-1 min-w-0 text-2xl font-bold text-neutral-800 dark:text-neutral-200 truncate">
                  {active.title}
                </h3>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 shrink-0">
                  {localizeDigits(skills.length, language)} {t.ui.skills}
                  {pages > 1 && <> · {localizeDigits(current + 1, language)}/{localizeDigits(pages, language)}</>}
                </span>
              </div>

              {/* Skill area: always the same size */}
              <div className="flex items-stretch gap-2 sm:gap-3 h-[26rem] lg:h-[17.5rem] shrink-0">
                {pages > 1 && (
                  <button type="button" className={arrow} disabled={current === 0} onClick={() => setPage(current - 1)} aria-label="Previous skills">
                    <ChevronLeft size={20} />
                  </button>
                )}
                <div className="flex-1 min-w-0 grid grid-cols-2 lg:grid-cols-3 auto-rows-[3.5rem] content-start gap-3">
                  {pageSkills.map((skill, index) => {
                    const n = projectsFor(skill).length;
                    const selected = openSkill === skill;
                    return (
                      <button
                        key={skill}
                        type="button"
                        disabled={n === 0}
                        onClick={() => setOpenSkill(selected ? null : skill)}
                        title={skill}
                        className={`group px-3 sm:px-4 rounded-xl border text-left transition-all duration-300 disabled:cursor-default
                                 ${selected
                                   ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-400 dark:border-secondary-500 shadow-card-hover'
                                   : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 enabled:hover:border-primary-300 dark:enabled:hover:border-secondary-500 enabled:hover:shadow-card-hover enabled:hover:-translate-y-0.5'}`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <div className={`w-2.5 h-2.5 shrink-0 bg-gradient-to-r ${activeColor} rounded-full group-hover:animate-pulse`}></div>
                            <span className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 group-enabled:group-hover:text-primary-500 dark:group-enabled:group-hover:text-secondary-500 transition-colors font-medium truncate">
                              {skill}
                            </span>
                          </div>
                          {n > 0 && (
                            <span className="hidden sm:inline shrink-0 text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-white dark:bg-neutral-700 text-neutral-500 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-600">
                              {countLabel(n)}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {pages > 1 && (
                  <button type="button" className={arrow} disabled={current === pages - 1} onClick={() => setPage(current + 1)} aria-label="Next skills">
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>

              {/* Footer: the projects behind the picked skill, else the most used skills */}
              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700 lg:flex-1 lg:min-h-0 overflow-y-auto">
                {openSkill && openList.length > 0 ? (
                  <>
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                      {t.ui.used_in} <span className="text-primary-500 dark:text-secondary-500">{openSkill}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {openList.map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setProjectId(p.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-primary-400 hover:text-primary-600 dark:hover:text-secondary-400 transition-colors"
                        >
                          <FolderKanban size={14} />{p.title}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (mostUsed[0]?.n ?? 0) >= 2 ? (
                  // Evidence from the projects, not a self-rating; only when a top skill is used twice or more.
                  <>
                    <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 mb-4">{t.ui.most_used}</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {mostUsed.map(({ skill, n }) => (
                        <button key={skill} type="button" onClick={() => setOpenSkill(skill)} className="text-center group min-w-0">
                          <div className={`w-14 h-14 bg-gradient-to-r ${activeColor} rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                            <span className="text-white font-bold text-lg">{localizeDigits(n, language)}</span>
                          </div>
                          <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300 truncate">{skill}</div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400">{countLabel(n)}</div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>}
        </div>
      </div>
      <ProjectsModal isOpen={!!projectId} initialId={projectId} onClose={() => setProjectId(null)} />
    </section>
  );
};