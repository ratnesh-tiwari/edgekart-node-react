import { createContext, useContext, useState } from 'react';

const MenuToggleContext = createContext();

function MenuToggleContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <MenuToggleContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </MenuToggleContext.Provider>
  );
}

function useMenuToggle() {
  const contextMenu = useContext(MenuToggleContext);
  if (contextMenu === undefined)
    throw new Error(
      'MenuToggleContext was used outside of MenuToggleContextProvider'
    );
  return contextMenu;
}

export { MenuToggleContextProvider, useMenuToggle };
