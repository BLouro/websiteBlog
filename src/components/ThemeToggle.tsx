import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';

const ThemeSwitcher: React.FC = () => {

  const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState<string>(userPrefersDark ? 'dark' : 'light');
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.theme = theme;
  }, [theme]);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className="flex justify-center items-center space-x-4 p-4 hover:cursor-pointer">
      {theme === 'light' ? (
        <MoonIcon
          onClick={() => toggleTheme('dark')}
          className=""
        />
      ) : (
        <SunIcon
          onClick={() => toggleTheme('light')}
          className=""
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
