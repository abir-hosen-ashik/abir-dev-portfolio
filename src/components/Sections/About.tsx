import React from 'react';
import { GraduationCap, User, Heart, BookOpen, Award, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding bg-neutral-50 dark:bg-neutral-900">
      <div className="container-custom">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-6">
            {t.about.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio Section */}
          <div className="space-y-8 fade-in-left">
            <div className="card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <User className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                  About Me
                </h3>
              </div>

              <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>{t.personalInfo.objective_p1}</p>
                <p>{t.personalInfo.objective_p2}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                  <div>
                    <span className="text-primary-500 dark:text-secondary-500 font-semibold">Email:</span>
                    <div className="font-mono text-sm">{t.personalInfo.email}</div>
                  </div>
                  <div>
                    <span className="text-primary-500 dark:text-secondary-500 font-semibold">Phone:</span>
                    <div className="font-mono text-sm">{t.personalInfo.phone}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-success-500 rounded-xl flex items-center justify-center">
                  <Heart className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                  {t.ui.beyond_coding}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.about.interests.map((interest, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-neutral-700 dark:text-neutral-300">{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-8 fade-in-right">
            <div className="card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-info-500 to-primary-500 rounded-xl flex items-center justify-center">
                  <GraduationCap className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                  {t.about.education.title}
                </h3>
              </div>

              <div className="space-y-6">
                {t.about.education.items.map((edu, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-gradient-to-b from-primary-500 to-secondary-500">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                        {edu.degree}
                      </h4>
                      <p className="text-primary-500 dark:text-secondary-500 font-medium">
                        {edu.institution}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
                        <div className="flex items-center space-x-1">
                          <Award size={14} />
                          <span>{edu.year}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Preview */}
            <div className="card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-success-500 to-accent-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                  {t.ui.core_expertise}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {t.about.core.map((skill, index) => (
                  <div key={skill[0]} className="text-center p-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg">
                    <div className="text-2xl font-bold gradient-text">{skill[1]}%</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">{skill[0]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};