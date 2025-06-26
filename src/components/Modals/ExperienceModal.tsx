import React from 'react';
import { Building2, MapPin, Calendar, Briefcase } from 'lucide-react';
import { TerminalWindow } from '../Terminal/TerminalWindow';
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
        className="absolute inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-gray-900 dark:bg-black rounded-lg 
                    border border-gray-700 dark:border-green-500/30 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-800 dark:bg-gray-900 
                      border-b border-gray-700 dark:border-green-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-white dark:text-green-300 font-mono ml-4">
              {t.experience.allTitle || 'Complete Work Experience'}
            </h2>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-red-400 dark:hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        </div>
        
        {/* Experience Summary */}
        <div className="px-6 py-4 bg-gray-800/50 dark:bg-gray-900/50 border-b border-gray-700 dark:border-green-500/30">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2 text-green-400 dark:text-green-500">
              <Briefcase size={16} />
              <span className="font-mono">Total Experience:</span>
            </div>
            <span className="text-white dark:text-green-300 font-mono">5+ Years</span>
            <span className="text-gray-400 dark:text-gray-500">•</span>
            <span className="text-white dark:text-green-300 font-mono">{allExperiences.length} Companies</span>
          </div>
        </div>
        
        {/* Experience Timeline */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          <div className="space-y-6">
            {allExperiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                {/* Timeline Line */}
                {index < allExperiences.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-24 bg-green-500/30 dark:bg-green-600/30"></div>
                )}
                
                <TerminalWindow title={`experience_${index + 1}.log`}>
                  <div className="space-y-4">
                    {/* Company & Position */}
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white dark:text-green-300 mb-2">
                          {exp.position}
                        </h3>
                        <div className="flex items-center space-x-2 text-green-400 dark:text-green-500 mb-3">
                          <Building2 size={18} />
                          <span className="font-mono text-lg">{exp.company}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 dark:text-gray-500 mb-4">
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
                      <div className="w-4 h-4 bg-green-500 dark:bg-green-600 rounded-full border-4 border-gray-900 dark:border-black flex-shrink-0"></div>
                    </div>

                    {/* Responsibilities */}
                    <div className="border-t border-gray-700 dark:border-green-500/30 pt-4">
                      <div className="text-green-400 dark:text-green-500 font-mono text-sm mb-3">
                        Key Responsibilities & Achievements:
                      </div>
                      <div className="space-y-2">
                        {exp.responsibilities.map((resp, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <span className="text-green-400 dark:text-green-500 mt-1 flex-shrink-0">▸</span>
                            <span className="text-gray-300 dark:text-gray-400 leading-relaxed">{resp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Experience Level Indicator */}
                    <div className="border-t border-gray-700 dark:border-green-500/30 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-400 dark:text-green-500 font-mono">
                          Position Level:
                        </span>
                        <div className="flex items-center space-x-2">
                          {index === 0 && (
                            <span className="px-2 py-1 bg-green-500/20 dark:bg-green-600/20 text-green-400 dark:text-green-500 
                                           text-xs font-mono rounded border border-green-500/30 dark:border-green-600/30">
                              CURRENT
                            </span>
                          )}
                          <span className="text-gray-300 dark:text-gray-400 font-mono">
                            {exp.position.includes('Senior') || exp.position.includes('Lead') ? 'Senior' : 
                             exp.position.includes('Engineer') ? 'Mid-Level' : 'Junior'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TerminalWindow>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};