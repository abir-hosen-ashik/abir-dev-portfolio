import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Copy, Check } from 'lucide-react';
import { TerminalWindow } from '../Terminal/TerminalWindow';
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
      username: t.personalInfo.github
    },
    {
      name: 'LinkedIn',
      url: `https://linkedin.com/in/${t.personalInfo.linkedin}`,
      icon: <Linkedin size={20} />,
      username: t.personalInfo.linkedin
    },
    {
      name: 'GitLab',
      url: `https://gitlab.com/${t.personalInfo.gitlab}`,
      icon: <Code size={20} />,
      username: t.personalInfo.gitlab
    }
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white dark:text-green-300 mb-6 font-mono">
            {t.contact.title}
          </h2>
          <p className="text-xl text-gray-400 dark:text-gray-500 mb-6">
            {t.contact.subtitle}
          </p>
          <div className="w-24 h-1 bg-green-500 dark:bg-green-600 mx-auto rounded"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <TerminalWindow title="contact_info.json">
              <div className="space-y-6">
                {/* Direct Contact */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <Mail className="text-green-400 dark:text-green-500" size={20} />
                      <div>
                        <div className="text-green-400 dark:text-green-500 font-mono text-sm">Email</div>
                        <div className="text-gray-300 dark:text-gray-400">{t.personalInfo.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(t.personalInfo.email, 'email')}
                      className="p-2 text-gray-400 hover:text-green-400 dark:hover:text-green-500 transition-colors"
                    >
                      {copiedField === 'email' ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <Phone className="text-green-400 dark:text-green-500" size={20} />
                      <div>
                        <div className="text-green-400 dark:text-green-500 font-mono text-sm">Phone</div>
                        <div className="text-gray-300 dark:text-gray-400">{t.personalInfo.phone}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(t.personalInfo.phone, 'phone')}
                      className="p-2 text-gray-400 hover:text-green-400 dark:hover:text-green-500 transition-colors"
                    >
                      {copiedField === 'phone' ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                {/* Social Links */}
                <div className="border-t border-gray-700 dark:border-green-500/30 pt-6">
                  <div className="text-green-400 dark:text-green-500 font-mono text-sm mb-4">
                    {t.contact.social.title}
                  </div>
                  <div className="space-y-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 dark:bg-gray-900/50 
                                 hover:bg-green-500/10 dark:hover:bg-green-600/10 transition-all duration-300 
                                 border border-gray-700 dark:border-green-500/30 hover:border-green-500 dark:hover:border-green-400"
                      >
                        <div className="text-green-400 dark:text-green-500">
                          {social.icon}
                        </div>
                        <div>
                          <div className="text-white dark:text-green-300 font-medium">{social.name}</div>
                          <div className="text-gray-400 dark:text-gray-500 text-sm font-mono">@{social.username}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </TerminalWindow>
          </div>

          {/* Contact Form */}
          <div>
            <TerminalWindow title="send_message.sh">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-green-400 dark:text-green-500 font-mono text-sm mb-4">
                  # Fill out the form below to send a message
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-green-400 dark:text-green-500 font-mono text-sm mb-2">
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-green-500/30 
                               rounded-lg px-4 py-3 text-gray-300 dark:text-gray-400 font-mono 
                               focus:border-green-500 dark:focus:border-green-400 focus:outline-none 
                               transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-green-400 dark:text-green-500 font-mono text-sm mb-2">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-green-500/30 
                               rounded-lg px-4 py-3 text-gray-300 dark:text-gray-400 font-mono 
                               focus:border-green-500 dark:focus:border-green-400 focus:outline-none 
                               transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-green-400 dark:text-green-500 font-mono text-sm mb-2">
                    {t.contact.form.subject}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-green-500/30 
                             rounded-lg px-4 py-3 text-gray-300 dark:text-gray-400 font-mono 
                             focus:border-green-500 dark:focus:border-green-400 focus:outline-none 
                             transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-green-400 dark:text-green-500 font-mono text-sm mb-2">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-green-500/30 
                             rounded-lg px-4 py-3 text-gray-300 dark:text-gray-400 font-mono 
                             focus:border-green-500 dark:focus:border-green-400 focus:outline-none 
                             transition-colors resize-none"
                  />
                </div>

                <button disabled
                  type="submit"
                  className="w-full bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 
                           text-black dark:text-white px-8 py-3 rounded-lg font-mono transition-all duration-300 
                           hover:shadow-lg hover:shadow-green-500/25 flex items-center justify-center space-x-2"
                style={{backgroundColor:"#aaaaaa"}}
                >
                  <Send size={20} />
                  <span>{t.contact.form.send} (disabled!)</span>
                </button>
                <p style={{marginTop:"10px", color:"red"}}>For now direct contact through phone call / what`s app only!</p>
              </form>
            </TerminalWindow>
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