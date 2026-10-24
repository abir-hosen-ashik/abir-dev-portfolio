import React from 'react';
import { CheckCircle2, Target, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Project } from '../../types';
import RichText from '../UI/RichText';

/** A project's case study: the overview, then each challenge with how it was solved and the result. */
export const CaseStudyContent: React.FC<{ study: NonNullable<Project['caseStudy']> }> = ({ study }) => {
  const { t } = useLanguage();
  const p = t.projects;
  return (
    <div className="space-y-6">
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
  );
};
