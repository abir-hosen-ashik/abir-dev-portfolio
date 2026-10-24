import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/** A project's kind: a feature-specific build (marked featured in batools) or enterprise grade. */
export const ProjectKindTag: React.FC<{ featured?: boolean; className?: string }> = ({ featured, className = '' }) => {
  const { t } = useLanguage();
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white ${
      featured ? 'bg-gradient-to-r from-accent-500 to-success-500' : 'bg-gradient-to-r from-primary-600 to-info-600'
    } ${className}`}>
      {featured ? <Zap size={12} /> : <ShieldCheck size={12} />}
      <span>{featured ? t.projects.kind_feature : t.projects.kind_enterprise}</span>
    </span>
  );
};
