import { useContext, useState, useEffect, createContext } from "react";

const VisibilityContext = createContext();

export function useVisibility() {
  return useContext(VisibilityContext);
}

export function VisibilityProvider({ children }) {
  const [storeModalIsOpen, setStoreModalIsOpen] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [itemToEditId, setItemToEditId] = useState();

  const handleStoreModalIsOpen = (value) => {
    setStoreModalIsOpen(value);
  };

  const handleAddItemModal = (visible, id) => {
    setItemToEditId(id);
    setShowItemModal(visible);
  };

  useEffect(() => {}, []);

  const value = {
    handleStoreModalIsOpen,
    handleAddItemModal,
    storeModalIsOpen,
    showItemModal,
    itemToEditId,
  };

  return (
    <VisibilityContext.Provider value={value}>
      {children}
    </VisibilityContext.Provider>
  );
}
