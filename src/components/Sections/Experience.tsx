import React, { useState } from 'react';
import { Building2, MapPin, Calendar, ArrowRight, Briefcase } from 'lucide-react';
import { ExperienceModal } from '../Modals/ExperienceModal';
import { useLanguage } from '../../contexts/LanguageContext';

export const Experience: React.FC = () => {
  const { t } = useLanguage();
  const [showAllExperience, setShowAllExperience] = useState(false);

  return (
    <>
      <section id="experience" className="section-padding bg-neutral-50 dark:bg-neutral-900">
        <div className="container-custom">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-6">
              {t.experience.title}
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A journey through innovative companies and challenging projects
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {t.experience.items.map((exp, index) => (
                <div key={exp.id} className={`relative fade-in-${index % 2 === 0 ? 'left' : 'right'}`}>
                  {/* Timeline Line */}
                  {index < t.experience.items.length - 1 && (
                    <div className="absolute left-8 top-24 w-0.5 h-32 bg-gradient-to-b from-primary-500 to-secondary-500 opacity-30"></div>
                  )}
                  
                  <div className="card p-8 hover:shadow-glow transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                    {/* Current Badge */}
                    {index === 0 && (
                      <div className="absolute top-7 right-7">
                        <div className="bg-gradient-to-r from-success-500 to-accent-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          CURRENT
                        </div>
                      </div>
                    )}

                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                          {exp.position}
                        </h3>
                        <div className="flex items-center space-x-2 text-primary-500 dark:text-secondary-500 mb-3">
                          <Building2 size={20} />
                          <span className="text-xl font-semibold">{exp.company}</span>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-neutral-500 dark:text-neutral-400 mb-6">
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
                      <div className="w-4 h-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full border-4 border-white dark:border-neutral-900 flex-shrink-0"></div>
                    </div>

                    {/* Responsibilities */}
                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
                      <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 mb-4 flex items-center space-x-2">
                        <Briefcase size={16} />
                        <span>Key Responsibilities:</span>
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {exp.responsibilities.map((resp, idx) => (
                          <div key={idx} className="flex items-start space-x-3 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{resp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Experience Button */}
            <div className="text-center mt-12 fade-in-up">
              <button 
                onClick={() => setShowAllExperience(true)}
                className="inline-flex btn-secondary group"
              >
                <span>{t.experience.viewAll}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform px-1 w-10" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Modal */}
      <ExperienceModal 
        isOpen={showAllExperience}
        onClose={() => setShowAllExperience(false)}
      />
    </>
  );
};