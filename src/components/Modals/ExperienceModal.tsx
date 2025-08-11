import React from 'react';
import { Building2, MapPin, Calendar, Briefcase, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const allExperiences = t.experience.items;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-info-500 to-primary-500">
          <h2 className="text-2xl font-bold text-white">
            {t.experience.allTitle || 'Complete Work Experience'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Experience Summary */}
        <div className="px-8 py-6 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-info-500">
              <Briefcase size={16} />
              <span className="font-semibold">Total Experience:</span>
            </div>
            <span className="text-neutral-800 dark:text-neutral-200 font-bold">5+ Years</span>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-800 dark:text-neutral-200 font-bold">{allExperiences.length} Companies</span>
          </div>
        </div>
        
        {/* Experience Timeline */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-160px)]">
          <div className="space-y-6">
            {allExperiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                {/* Timeline Line */}
                {index < allExperiences.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-24 bg-gradient-to-b from-primary-500 to-secondary-500 opacity-30"></div>
                )}
                
                <div className="card p-6 hover:shadow-glow transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                  {/* Current Badge */}
                  {index === 0 && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-success-500 to-accent-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        CURRENT
                      </div>
                    </div>
                  )}

                  {/* Company & Position */}
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                        {exp.position}
                      </h3>
                      <div className="flex items-center space-x-2 text-primary-500 dark:text-secondary-500 mb-3">
                        <Building2 size={18} />
                        <span className="text-lg font-semibold">{exp.company}</span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span className="font-mono">{exp.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin size={16} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="w-4 h-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full border-4 border-white dark:border-neutral-800 flex-shrink-0"></div>
                  </div>

                  {/* Responsibilities */}
                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                    <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 mb-4 flex items-center space-x-2">
                      <Briefcase size={16} />
                      <span>Key Responsibilities & Achievements:</span>
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {exp.responsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience Level Indicator */}
                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-500 dark:text-secondary-500 font-semibold">
                        Position Level:
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          exp.position.includes('Senior') || exp.position.includes('Lead') 
                            ? 'bg-gradient-to-r from-success-500 to-accent-500 text-white' 
                            : exp.position.includes('Engineer') 
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                            : 'bg-gradient-to-r from-info-500 to-info-600 text-white'
                        }`}>
                          {exp.position.includes('Senior') || exp.position.includes('Lead') ? 'Senior Level' : 
                           exp.position.includes('Engineer') ? 'Mid Level' : 'Entry Level'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};