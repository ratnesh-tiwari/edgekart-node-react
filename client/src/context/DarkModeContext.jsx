import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

function DarkModeContextProvider({ children }) {
  const [isDark, setIsDark] = useState(function () {
    const storedValue = localStorage.getItem('isDarkMode');
    return storedValue
      ? JSON.parse(storedValue)
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // to store dark mode in locale storeage
  useEffect(
    function () {
      localStorage.setItem('isDarkMode', JSON.stringify(isDark));
    },
    [isDark]
  );

  function toggleDarkMode() {
    setIsDark((prev) => !prev);
  }

  // to set dark mode on html page
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  }, [isDark]);

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const contextDark = useContext(DarkModeContext);
  if (contextDark === undefined)
    throw new Error(
      'DarkModeContext was used outside of DarkModeContextProvider'
    );
  return contextDark;
}

export { DarkModeContextProvider, useDarkMode };
