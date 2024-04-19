import { useContext, useState, useEffect, createContext } from "react";
// import { useNavigate } from "react-router-dom";

// import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [allItems, setAllItems] = useState([]);
  const [mainList, setMainList] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [allAisles, setAllAisles] = useState([]);
  const [usedAccentColors, setUsedAccentColors] = useState([]);

  const getAllItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    const items = [];
    querySnapshot.forEach((doc) => {
      const item = doc.data();
      items.push({
        id: doc.id,
        name: item.name || "--",
        flavor: item.flavor,
        mainList: item.mainList || false,
        isChecked: item.isChecked !== undefined ? item.isChecked : false,
        isFavorite: item.isFavorite || false,
        price: item.price || "--",
        rank: item.rank || 0,
        aisleName: item.aisleName || "--",
        aisleAccentColor: item.aisleAccentColor || "",
        preferredStoreName: item.preferredStoreName || "--",
        preferredStoreId: item.preferredStoreId,
        notes: item.notes,
      });
    });
    setAllItems(items);
    setMainList(items.filter((item) => item.mainList === true));
  };

  const deleteData = async (collection, docId) => {
    await deleteDoc(doc(db, collection, docId));
  };

  const getAllStores = async () => {
    const querySnapshot = await getDocs(collection(db, "stores"));
    const stores = [];
    querySnapshot.forEach((doc) => {
      const store = doc.data();
      stores.push({
        id: doc.id,
        name: store.name,
        isFavorite: store.isFavorite || false,
        website: store.website,
        notes: store.notes,
      });
    });
    setAllStores(stores);
  };

  const getAllAisles = async () => {
    const querySnapshot = await getDocs(collection(db, "aisles"));
    const aisles = [];
    querySnapshot.forEach((doc) => {
      const aisle = doc.data();
      aisles.push({
        id: doc.id,
        name: aisle.name,
        isFavorite: aisle.isFavorite || false,
        accentColor: aisle.accentColor,
        notes: aisle.notes,
      });
    });
    setAllAisles(aisles);
  };

  const updateRelatedItems = async (
    collectionKey,
    relatedId,
    itemUpdateData
  ) => {
    const q = query(
      collection(db, "items"),
      where(collectionKey, "==", relatedId)
    );

    console.log(relatedId);
    const querySnapshot = await getDocs(q);

    const batch = writeBatch(db);

    querySnapshot.forEach((item) => {
      const itemRef = doc(db, "items", item.id);
      console.log(item.id);
      batch.update(itemRef, itemUpdateData);
    });

    await batch.commit();
    getAllItems();
  };

  useEffect(() => {
    getAllItems();
    getAllStores();
    getAllAisles();
  }, []);

  useEffect(() => {
    setUsedAccentColors([
      ...new Set(allItems.map((item) => item.aisleAccentColor)),
    ]);
  }, [allItems]);

  const value = {
    allItems,
    mainList,
    allStores,
    allAisles,
    usedAccentColors,
    deleteData,
    getAllItems,
    getAllStores,
    getAllAisles,
    updateRelatedItems,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
