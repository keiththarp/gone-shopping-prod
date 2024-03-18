import { useContext, useState, useEffect, createContext } from "react";
// import { useNavigate } from "react-router-dom";

import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";

import { db } from "../firebase";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [allItems, setAllItems] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [allSections, setAllSections] = useState([]);

  const getAllItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    const items = [];
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      const item = doc.data();
      items.push({
        id: doc.id,
        name: item.name || "--",
        flavor: item.flavor,
        isFavorite: item.isFavorite,
        price: item.price || "--",
        section: item.sectionData ? item.sectionData.name : "--",
        preferredStore: item.storeData ? item.storeData.name : "--",
        notes: item.notes,
      });
    });
    setAllItems(items);
  };

  const deleteItem = async (itemId) => {
    await deleteDoc(doc(db, "items", itemId));
    getAllItems();
  };

  const getAllStores = async () => {
    const querySnapshot = await getDocs(collection(db, "stores"));
    const stores = [];
    querySnapshot.forEach((doc) => {
      const store = doc.data();
      stores.push({
        id: doc.id,
        name: store.name,
        address: store.address,
        notes: store.notes,
      });
    });
    setAllStores(stores);
  };

  const getAllSections = async () => {
    const querySnapshot = await getDocs(collection(db, "sections"));
    const sections = [];
    querySnapshot.forEach((doc) => {
      const section = doc.data();
      sections.push({
        id: doc.id,
        name: section.name,
      });
    });
    setAllSections(sections);
  };

  useEffect(() => {
    getAllItems();
    getAllStores();
    getAllSections();
  }, []);

  const value = {
    allItems,
    allStores,
    allSections,
    getAllItems,
    deleteItem,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
