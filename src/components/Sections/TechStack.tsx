import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { iconFor } from '../UI/icons';

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

const CategoryIcon = ({ icon }: { icon: string }) => {
  const Icon = iconFor(icon);
  return <Icon className={iconColors[icon] ?? iconColors.code} size={24} />;
};

export const TechStack: React.FC = () => {
  const { t } = useLanguage();
  const categories = t.techStack.categories;
  const [activeId, setActiveId] = useState<string | undefined>(categories[0]?.id);
  const active = categories.find(c => c.id === activeId) ?? categories[0];
  const activeColor = active ? categoryColors[active.icon] ?? categoryColors.code : '';

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

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Category Navigation */}
          <div className="lg:col-span-1fade-in-left">
            <div className="card p-6 sticky top-24">
              <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center space-x-2">
                <Zap className="text-primary-500 dark:text-secondary-500" size={20} />
                <span>{t.ui.categories}</span>
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveId(category.id)}
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

          {/* Skills Display */}
          {active && <div className="lg:col-span-3 fade-in-right">
            <div className="card p-8">
              <div className="flex items-center space-x-3 mb-8">
                <CategoryIcon icon={active.icon} />
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                  {active.title}
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {active.skills.map((skill, index) => (
                  <div
                    key={skill}
                    className="group p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 
                             hover:border-primary-300 dark:hover:border-secondary-500 transition-all duration-300 
                             hover:shadow-card-hover hover:-translate-y-1"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 bg-gradient-to-r ${activeColor} rounded-full group-hover:animate-pulse`}></div>
                        <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-primary-500 dark:group-hover:text-secondary-500 
                                       transition-colors font-medium">
                          {skill}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-400 dark:text-neutral-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* {85 + (index % 15)}% */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skill Level Visualization */}
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-8">
                <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 mb-6">
                  {t.ui.proficiency_overview}
                </h4>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-success-500 to-success-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">{t.ui.expert_percent}</span>
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">{t.ui.expert_level}</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">{t.ui.advance_percent}</span>
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">{t.ui.advance}</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">{t.ui.intermediate_percent}</span>
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">{t.ui.intermediate}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </section>
  );
};