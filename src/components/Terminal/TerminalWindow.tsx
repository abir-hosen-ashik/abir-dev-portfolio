import React, { useState, useEffect } from 'react';
import { Minimize2, Maximize2, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface TerminalWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({ 
  children, 
  title = 'Terminal',
  className = '' 
}) => {
  const { t } = useLanguage();
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div className={`bg-gray-900 dark:bg-black rounded-lg shadow-2xl border border-gray-700 dark:border-green-500/30 ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 rounded-t-lg border-b border-gray-700 dark:border-green-500/30">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        
        <div className="text-gray-300 dark:text-green-400 text-sm font-mono">
          {title}
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-gray-300 transition-colors">
            <Minimize2 size={16} />
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <Maximize2 size={16} />
          </button>
          <button className="text-gray-400 hover:text-red-400 transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm">
        {children}
      </div>
    </div>
  );
};