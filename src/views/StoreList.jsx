import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Typography } from "@mui/material";

import { useData } from "../context/DataContext";

import SortBar from "../components/SortBar";
import GroceryItem from "../components/GroceryItem";

export default function StoreList() {
  const location = useLocation();
  const { allItems } = useData();
  const [storeItems, setStoreItems] = useState(allItems);
  const [sortedList, setSortedList] = useState(allItems);

  const params = new URLSearchParams(location.search);
  const storeName = params.get("storeName");
  useEffect(() => {
    const storeId = params.get("store");
    setStoreItems(allItems.filter((item) => item.preferredStoreId === storeId));
  }, [allItems, location]);

  const handleSortBarResults = (list) => {
    setSortedList(list);
  };

  return (
    <>
      <SortBar
        list={storeItems}
        results={handleSortBarResults}
        title={storeName}
      />
      <Box>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {sortedList
            .filter((item) => item.isChecked === false)
            .map((item) => {
              return <GroceryItem key={item.id} item={item} />;
            })}
        </List>
        <Typography>Completed</Typography>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {sortedList
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return <GroceryItem key={item.id} item={item} />;
            })}
        </List>
      </Box>
    </>
  );
}
