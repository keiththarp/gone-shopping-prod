import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import GroceryItem from "../components/GroceryItem";
import List from "@mui/material/List";

import { useData } from "../context/DataContext";

export default function StoreList() {
  const location = useLocation();
  const { getAllItems, allItems } = useData();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const storeParam = params.get("store");
    console.log(storeParam);
  }, [location.search]);

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {allItems.map((item) => {
        return (
          <GroceryItem
            key={item.id}
            item={item}
            // handleToggle={handleToggle}
            // handleUpdateItem={handleUpdateItem}
            // handleAddItemModal={handleAddItemModal}
          />
        );
      })}
    </List>
  );
}
