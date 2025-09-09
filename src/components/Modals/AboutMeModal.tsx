import React, { useState } from 'react';
import { Calendar, Code, ExternalLink, Filter, X, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import FormattedStringParser from '../UI/FormatedStringParser';

interface AboutMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutMeModal: React.FC<AboutMeModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'general' | 'client'>('general');

  if (!isOpen) return null;

  const allAboutMe = t.about.about_me;


  const filters = [
    { key: 'general', label: t.about.about_me.filters?.general || 'General' },
    { key: 'client', label: t.about.about_me.filters?.client || 'Client' },
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
            {t.about.viewAll || 'All About Me'}
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
                onClick={() => setActiveFilter(filter.key as 'general' | 'client')}
                className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center space-x-2
                          ${activeFilter === filter.key
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-neutral-200 dark:border-neutral-700'
                  }`}
              >
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          {Object.keys(t.about.about_me[activeFilter]).map((key) => (
            <>
              <div className="grid lg:grid-cols-1 gap-6 p-8">
                <div key={1} className="group">
                  <div className="card p-6 hover:shadow-glow transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-accent-500 to-success-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        <Star size={12} /><Star size={12} /><Star size={12} />
                        {/* <span>FEATURED</span> */}
                      </div>
                    </div>
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2 group-hover:text-primary-500 dark:group-hover:text-secondary-500 transition-colors">
                          {(t.about.about_me as any)[key]}
                        </h3>
                      </div>
                    </div>
                    {/* Project Description */}
                    {(t.about.about_me[activeFilter] as any)[key].map((value: string | string[]) => (
                      <>
                        {
                          typeof value == "string" ?
                            <p style={{ textAlign: 'justify' }} className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                              <FormattedStringParser text={value} />
                            </p>
                            :
                            value.map((v) => (
                              < ul style={{ textAlign: 'justify' }} className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                                <FormattedStringParser text={'🔘 ' + v} />

                              </ul>
                            ))
                        }
                      </>
                    ))}
                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};