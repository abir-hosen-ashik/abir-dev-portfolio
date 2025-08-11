import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Copy, Check, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: `https://github.com/${t.personalInfo.github}`,
      icon: <Github size={20} />,
      username: t.personalInfo.github,
      color: 'from-neutral-700 to-neutral-800'
    },
    {
      name: 'LinkedIn',
      url: `https://linkedin.com/in/${t.personalInfo.linkedin}`,
      icon: <Linkedin size={20} />,
      username: t.personalInfo.linkedin,
      color: 'from-info-500 to-info-600'
    },
    // {
    //   name: 'GitLab',
    //   url: `https://gitlab.com/${t.personalInfo.gitlab}`,
    //   icon: <Code size={20} />,
    //   username: t.personalInfo.gitlab,
    //   color: 'from-accent-500 to-accent-600'
    // }
  ];

  return (
    <section id="contact" className="section-padding bg-neutral-50 dark:bg-neutral-900">
      <div className="container-custom">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-6">
            {t.contact.title}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-6">
            {t.contact.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 fade-in-left">
            <div className="card p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                  Get In Touch
                </h3>
              </div>

              {/* Direct Contact */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between group p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <Mail className="text-white" size={18} />
                    </div>
                    <div>
                      <div className="text-primary-500 dark:text-secondary-500 font-semibold text-sm">Email</div>
                      <div className="text-neutral-700 dark:text-neutral-300 font-mono">{t.personalInfo.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(t.personalInfo.email, 'email')}
                    className="p-2 text-neutral-400 hover:text-primary-500 dark:hover:text-secondary-500 transition-colors"
                  >
                    {copiedField === 'email' ? <Check size={18} className="text-success-500" /> : <Copy size={18} />}
                  </button>
                </div>

                <div className="flex items-center justify-between group p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-success-500 to-accent-500 rounded-lg flex items-center justify-center">
                      <Phone className="text-white" size={18} />
                    </div>
                    <div>
                      <div className="text-success-500 font-semibold text-sm">Phone</div>
                      <div className="text-neutral-700 dark:text-neutral-300 font-mono">{t.personalInfo.phone}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(t.personalInfo.phone, 'phone')}
                    className="p-2 text-neutral-400 hover:text-success-500 transition-colors"
                  >
                    {copiedField === 'phone' ? <Check size={18} className="text-success-500" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
                  {t.contact.social.title}
                </h4>
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl 
                               hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className={`w-10 h-10 bg-gradient-to-r ${social.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <div className="text-white">
                          {social.icon}
                        </div>
                      </div>
                      <div>
                        <div className="text-neutral-800 dark:text-neutral-200 font-semibold">{social.name}</div>
                        <div className="text-neutral-500 dark:text-neutral-400 text-sm font-mono">@{social.username}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="fade-in-right">
            <div className="card p-8">
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-success-500 rounded-xl flex items-center justify-center">
                  <Send className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                  Send Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-700 dark:text-neutral-300 font-semibold mb-2">
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 
                               rounded-xl px-4 py-3 text-neutral-700 dark:text-neutral-300 
                               focus:border-primary-500 dark:focus:border-secondary-500 focus:outline-none 
                               transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 dark:text-neutral-300 font-semibold mb-2">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 
                               rounded-xl px-4 py-3 text-neutral-700 dark:text-neutral-300 
                               focus:border-primary-500 dark:focus:border-secondary-500 focus:outline-none 
                               transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 font-semibold mb-2">
                    {t.contact.form.subject}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 
                             rounded-xl px-4 py-3 text-neutral-700 dark:text-neutral-300 
                             focus:border-primary-500 dark:focus:border-secondary-500 focus:outline-none 
                             transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 font-semibold mb-2">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={2}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 
                             rounded-xl px-4 py-3 text-neutral-700 dark:text-neutral-300 
                             focus:border-primary-500 dark:focus:border-secondary-500 focus:outline-none 
                             transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex justify-center items-center space-x-2 group"
                >
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                  <span>{t.contact.form.send}</span>
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Fix import issue
const Code: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16,18 22,12 16,6" />
    <polyline points="8,6 2,12 8,18" />
  </svg>
);