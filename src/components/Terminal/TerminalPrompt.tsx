import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface TerminalPromptProps {
  command?: string;
  showCursor?: boolean;
  delay?: number;
}

export const TerminalPrompt: React.FC<TerminalPromptProps> = ({ 
  command = '', 
  showCursor = true,
  delay = 0 
}) => {
  const { t } = useLanguage();
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!command) return;

    const timer = setTimeout(() => {
      if (currentIndex < command.length) {
        setDisplayedCommand(command.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, delay + currentIndex * 50);

    return () => clearTimeout(timer);
  }, [command, currentIndex, delay]);

  return (
    <div className="flex items-center text-green-400 dark:text-green-500">
      <span className="text-green-400 dark:text-green-500 mr-2">
        {t.ui.terminal.prompt}
      </span>
      <span>{displayedCommand}</span>
      {showCursor && (
        <span className="animate-pulse ml-1 text-green-400 dark:text-green-500">
          _
        </span>
      )}
    </div>
  );
};