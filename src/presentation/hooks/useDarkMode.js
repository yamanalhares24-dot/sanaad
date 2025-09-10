import { useState, useEffect } from 'react';
import { LocalStorageService } from '../../infrastructure/services/LocalStorageService';

const storageService = new LocalStorageService();
const DARK_MODE_KEY = 'darkMode';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = storageService.getItem(DARK_MODE_KEY);
    if (savedMode !== null) {
      setIsDarkMode(savedMode);
      document.body.classList.toggle('dark-mode', savedMode);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    storageService.setItem(DARK_MODE_KEY, newMode);
    document.body.classList.toggle('dark-mode', newMode);
  };

  return { isDarkMode, toggleDarkMode };
};