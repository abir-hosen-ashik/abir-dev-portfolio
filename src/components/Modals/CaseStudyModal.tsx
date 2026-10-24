import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, Lightbulb, Target, TrendingUp, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Project } from '../../types';
import RichText from '../UI/RichText';

/**
 * A project's case study over the page: the overview, then each challenge with
 * how it was solved and the result. Portalled to <body> (project cards move on
 * hover, which would pin a fixed overlay to the card) and above the
 * "View All" projects modal.
 */
const CaseStudyModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const { t } = useLanguage();
  const p = t.projects;
  const study = project.caseStudy!;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const overflow = document.body.style.overflow;
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 px-6 py-5 bg-gradient-to-r from-primary-500 to-secondary-500">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">{p.case_study}</p>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">{project.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 -m-1 text-white hover:bg-white/20 rounded-lg transition-colors shrink-0" aria-label="Close">
            <X size={22} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {study.overview && (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-500 dark:text-secondary-500 mb-2">{p.overview}</h3>
              <RichText text={study.overview} className="text-justify text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300" />
            </section>
          )}

          {study.challenges.map((c, i) => (
            <section key={i} className="rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
              <div className="flex items-start gap-3 p-4 bg-neutral-50 dark:bg-neutral-900/40">
                <Target size={18} className="text-accent-500 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                    {p.challenge} {String(i + 1).padStart(2, '0')}
                  </p>
                  <RichText text={c.challenge} className="text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed" />
                </div>
              </div>
              {c.solution && (
                <div className="flex items-start gap-3 p-4">
                  <CheckCircle2 size={18} className="text-primary-500 dark:text-secondary-500 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">{p.solution}</p>
                    <RichText text={c.solution} className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed" />
                  </div>
                </div>
              )}
              {c.result && (
                <div className="flex items-start gap-3 px-4 pb-4">
                  <TrendingUp size={18} className="text-success-500 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">{p.result}</p>
                    <RichText text={c.result} className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed" />
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
};

/** "Challenges & solutions" link for a project card; renders nothing without a case study. */
export const CaseStudyButton: React.FC<{ project: Project; className?: string }> = ({ project, className = '' }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  if (!project.caseStudy) return null;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center space-x-2 text-primary-500 dark:text-secondary-500 hover:text-primary-600 dark:hover:text-secondary-600 transition-colors ${className}`}
      >
        <Lightbulb size={16} />
        <span className="text-sm font-medium">{t.projects.case_study}</span>
      </button>
      {open && <CaseStudyModal project={project} onClose={() => setOpen(false)} />}
    </>
  );
};
