import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, Building2, MapPin, Calendar, Briefcase, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Experience } from '../../types';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Opens straight on this job's details (a card clicked on the page); Back shows every job. */
  initialId?: string | null;
}

const Bullet = () => <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2 flex-shrink-0" />;

/** Rough seniority from the title, shown as a badge. */
const LevelBadge: React.FC<{ position: string }> = ({ position }) => {
  const { t } = useLanguage();
  const senior = position.includes('Senior') || position.includes('Lead');
  const mid = position.includes('Engineer');
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
      senior ? 'bg-gradient-to-r from-success-500 to-accent-500'
        : mid ? 'bg-gradient-to-r from-primary-500 to-secondary-500'
        : 'bg-gradient-to-r from-info-500 to-info-600'
    }`}>
      {senior ? t.ui.senior_level : mid ? t.ui.mid_level : t.ui.entry_level}
    </span>
  );
};

const Meta: React.FC<{ exp: Experience }> = ({ exp }) => (
  <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
    <span className="inline-flex items-center gap-1.5"><Calendar size={14} /><span className="font-mono">{exp.duration}</span></span>
    {exp.location && <span className="inline-flex items-center gap-1.5"><MapPin size={14} />{exp.location}</span>}
  </div>
);

/** Everything about one job: company, dates, place, level and every responsibility. */
const ExperienceDetails: React.FC<{ exp: Experience }> = ({ exp }) => {
  const { t } = useLanguage();
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-primary-500 dark:text-secondary-500">
          <Building2 size={18} />
          <span className="text-lg font-semibold">{exp.company}</span>
          {exp.current && (
            <span className="ml-1 bg-gradient-to-r from-success-500 to-accent-500 text-white px-2.5 py-0.5 rounded-full text-xs font-medium">{t.ui.current}</span>
          )}
        </div>
        <Meta exp={exp} />
        <div className="flex items-center gap-2 pt-1 text-sm">
          <span className="text-primary-500 dark:text-secondary-500 font-semibold">{t.ui.position_level}:</span>
          <LevelBadge position={exp.position} />
        </div>
      </div>

      {exp.responsibilities.length > 0 && (
        <section className="pt-5 border-t border-neutral-200 dark:border-neutral-700">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
            <Briefcase size={14} />{t.ui.key_responsibilities_achievements}
          </h4>
          <ul className="space-y-2.5">
            {exp.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-[15px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <Bullet /><span>{resp}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen, onClose, initialId }) => {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const body = useRef<HTMLDivElement>(null);
  /** Where the list was scrolled, so Back returns to the same card. */
  const listScroll = useRef(0);

  // Each opening starts on the clicked job (if any) or the list.
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

  const allExperiences = t.experience.items;
  const selected = allExperiences.find(e => e.id === selectedId) ?? null;

  const open = (id: string) => {
    listScroll.current = body.current?.scrollTop ?? 0;
    setSelectedId(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-info-500 to-primary-500 shrink-0">
          {selected && (
            <button
              onClick={() => setSelectedId(null)}
              className="inline-flex items-center gap-1.5 pl-2 pr-3 py-1.5 text-sm font-medium text-white bg-white/15 hover:bg-white/25 rounded-lg transition-colors shrink-0"
            >
              <ArrowLeft size={16} />{t.ui.back || 'Back'}
            </button>
          )}
          <h2 className="flex-1 min-w-0 text-lg sm:text-xl font-bold text-white truncate">
            {selected ? selected.position : t.experience.allTitle || 'Complete Work Experience'}
          </h2>
          <button onClick={onClose} className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors shrink-0" aria-label="Close">
            <X size={22} />
          </button>
        </div>

        {/* Experience Summary */}
        {!selected && (
          <div className="px-6 py-3 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 shrink-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 text-info-500">
                <Briefcase size={14} />
                <span className="font-semibold">{t.ui.total_experience}:</span>
              </div>
              <span className="text-neutral-800 dark:text-neutral-200 font-bold">{t.years}+ {t.ui.years}</span>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-800 dark:text-neutral-200 font-bold">{allExperiences.length} {t.ui.companies}</span>
            </div>
          </div>
        )}

        <div ref={body} className="p-6 overflow-y-auto">
          {selected ? (
            <ExperienceDetails exp={selected} />
          ) : (
            <div className="space-y-5">
              {allExperiences.map((exp) => (
                <div
                  key={exp.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => open(exp.id)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(exp.id); } }}
                  className="group card p-6 cursor-pointer hover:shadow-glow transition-all duration-500 hover:-translate-y-1 relative overflow-hidden
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                >
                  {/* Current Badge */}
                  {exp.current && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-success-500 to-accent-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {t.ui.current}
                      </div>
                    </div>
                  )}

                  {/* Company & Position */}
                  <div className="mb-4 pr-20">
                    <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-1.5 group-hover:text-primary-500 dark:group-hover:text-secondary-500 transition-colors">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2 text-primary-500 dark:text-secondary-500 mb-2">
                      <Building2 size={16} />
                      <span className="font-semibold">{exp.company}</span>
                    </div>
                    <Meta exp={exp} />
                  </div>

                  {/* Responsibilities preview */}
                  {exp.responsibilities.length > 0 && (
                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                      <div className="grid md:grid-cols-2 gap-2.5">
                        {exp.responsibilities.slice(0, 4).map((resp, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                            <Bullet />
                            <span className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{resp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                    <LevelBadge position={exp.position} />
                    <span className="font-medium text-primary-500 dark:text-secondary-500">
                      {exp.responsibilities.length > 4 && <span className="mr-3 text-xs font-mono text-neutral-400">+{exp.responsibilities.length - 4} {t.ui.more_responsibilities}</span>}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">{t.ui.view_details} →</span>
                    </span>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
