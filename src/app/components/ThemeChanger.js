'use client';

import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeChanger() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    themeChange(false);
    // Prüfe den initialen Theme-Status
    setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'emerald' : 'dark');
    localStorage.setItem('theme', isDark ? 'emerald' : 'dark');
  };

  return (
    <label className="btn btn-ghost swap swap-rotate">
      <input
        type="checkbox"
        className="theme-controller"
        value="dark"
        checked={isDark}
        onChange={toggleTheme}
      />
      <FiSun className="swap-off h-6 w-6 fill-current" />
      <FiMoon className="swap-on h-6 w-6 fill-current" />
    </label>
  );
}