import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Download, ChevronDown, Sparkles, Code, Cpu } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [currentRole, setCurrentRole] = useState(0);

  const roles = [
    { text: 'AI Engineer', icon: <Cpu size={24} /> },
    { text: 'Full-Stack Developer', icon: <Code size={24} /> },
    { text: 'Software Architect', icon: <Sparkles size={24} /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-[80px] sm:pt-[0px]">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg opacity-10"></div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="container-custom px-4 relative z-10">
        <div className="text-center space-y-8 fade-in-up">
          {/* Greeting */}
          <div className="space-y-4">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium">
              {t.home.greeting}
            </p>

            {/* Name with gradient */}
            <h1 className="text-5xl lg:text-7xl font-display font-bold gradient-text mb-4">
              {t.home.name}
            </h1>

            {/* Animated Role */}
            <div className="h-20 flex items-center justify-center">
              <div key={currentRole}  className="flex animate-fade-in-out items-center space-x-3 text-2xl lg:text-4xl font-semibold text-neutral-800 dark:text-neutral-200">
                <div className="text-primary-500 dark:text-secondary-500 animate-pulse">
                  {roles[currentRole].icon}
                </div>
                <span>{roles[currentRole].text}</span>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              {t.home.subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="inline-flex btn-primary group"
              onClick={() => {
                const url = 'https://tlapmuaszjrzkzccrxkg.supabase.co/storage/v1/object/public/public-bucket/Resume%20-%20Abir%20Hosen.pdf'; // Replace with your URL
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
            >
              <Download size={20} className="group-hover:animate-bounce-gentle px-1 w-8" />
              <span>{t.ui.downloadResume}</span>
            </button>


            <div className="flex space-x-4">
              <a
                title="GitHub Profile"
                href={`https://github.com/${t.personalInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 
                         hover:text-primary-500 dark:hover:text-secondary-500 rounded-xl shadow-card 
                         hover:shadow-card-hover transition-all duration-300 hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a
                title="LinkedIn Profile"
                href={`https://linkedin.com/in/${t.personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 
                         hover:text-primary-500 dark:hover:text-secondary-500 rounded-xl shadow-card 
                         hover:shadow-card-hover transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a
                title="Medium Profile"
                href={`https://medium.com/@${t.personalInfo?.medium}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 
                         hover:text-primary-500 dark:hover:text-secondary-500 rounded-xl shadow-card 
                         hover:shadow-card-hover transition-all duration-300 hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-m-icon lucide-square-m"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M8 16V8l4 4 4-4v8" /></svg>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">5+</div>
              <div className="text-neutral-600 dark:text-neutral-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">20+</div>
              <div className="text-neutral-600 dark:text-neutral-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">10+</div>
              <div className="text-neutral-600 dark:text-neutral-400">Technologies</div>
            </div>
          </div>
        </div>
      </div>


      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToAbout}
          className="text-primary-500 dark:text-secondary-500 animate-bounce-gentle hover:text-primary-600 
                     dark:hover:text-secondary-600 transition-colors p-2"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};