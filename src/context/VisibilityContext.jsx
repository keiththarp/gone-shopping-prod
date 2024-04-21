import { useContext, useState, useEffect, createContext } from "react";

const VisibilityContext = createContext();

export function useVisibility() {
  return useContext(VisibilityContext);
}

export function VisibilityProvider({ children }) {
  const [storeModalIsOpen, setStoreModalIsOpen] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [itemToEditId, setItemToEditId] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [collectionToEdit, setCollectionToEdit] = useState("");

  const handleStoreModalIsOpen = (value) => {
    setStoreModalIsOpen(value);
  };

  const handleAddItemModal = (visible, id) => {
    setItemToEditId(id);
    setShowItemModal(visible);
  };

  const handleConfirmModal = (visibility, message, id, collection, method) => {
    setShowConfirmModal(visibility);
    setConfirmMessage(message);
    setItemToEditId(id);
    setCollectionToEdit(collection);
  };

  useEffect(() => {}, []);

  const value = {
    handleStoreModalIsOpen,
    setShowConfirmModal,
    handleAddItemModal,
    handleConfirmModal,
    storeModalIsOpen,
    showItemModal,
    itemToEditId,
    showConfirmModal,
    confirmMessage,
    collectionToEdit,
  };

  return (
    <VisibilityContext.Provider value={value}>
      {children}
    </VisibilityContext.Provider>
  );
}
