import { useContext, useState, useEffect, createContext } from "react";

const VisibilityContext = createContext();

export function useVisibility() {
  return useContext(VisibilityContext);
}

export function VisibilityProvider({ children }) {
  const [storeModalIsOpen, setStoreModalIsOpen] = useState(false);

  const handleStoreModalIsOpen = (value) => {
    setStoreModalIsOpen(value);
  };

  useEffect(() => {}, []);

  const value = {
    handleStoreModalIsOpen,
    storeModalIsOpen,
  };

  return (
    <VisibilityContext.Provider value={value}>
      {children}
    </VisibilityContext.Provider>
  );
}
