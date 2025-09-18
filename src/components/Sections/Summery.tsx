import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SectionWrapper } from './SectionWrapper';

export const Summery: React.FC = () => {
  const { t } = useLanguage();
  const summery = t.summery;
  const checkList = summery.check_list.list;

  return (
    <section id="summery" className="section-padding relative">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-6">
            {summery.title}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            {summery.sub_title}
          </p>
          <div className="w-24 h-1 mb-5 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mt-6"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-up">
          {checkList.map((item, idx) => {
            // Example: random rating 1-5, you can replace with actual rating from your data
            const rating: number = parseInt(item[1] as any)
            return (
              <div
                key={idx}
                className="flex flex-col items-start space-y-2 bg-white/40 dark:bg-neutral-900/40 glass dark:glass-dark p-4 rounded-2xl shadow-card hover:shadow-glow transition"
              >

                {/* Star rating */}
                <div className="absolute right-2 top-2 flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={i < rating ? '#fbc531' : 'none'}
                      stroke="#fbc531"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="text-primary-500 mt-1 flex-shrink-0" size={22} />
                  <p className="text-neutral-700 dark:text-neutral-300 font-medium">{item[0]}</p>
                </div>
              </div>
            );
          })}
        </div>


        {/* Optional extra block */}
        <SectionWrapper>
          <div className="mt-16 text-center fade-in-up">
            <h3 className="text-2xl font-display font-semibold gradient-text mb-4">
              {summery.highlight_title}
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              {summery.highlight_description}
            </p>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
};
