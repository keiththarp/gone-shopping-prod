import { useState, useEffect } from "react";

import List from "@mui/material/List";

import SortBar from "../components/SortBar";
import ProgressSpinner from "../components/ProgressSpinner";
import GroceryItem from "../components/GroceryItem";

import { useData } from "../context/DataContext";

export default function AllItemsPage() {
  const { allItems } = useData();
  const [isLoading, setIsLoading] = useState(true);
  const [sortedList, setSortedList] = useState(allItems);

  useEffect(() => {
    if (allItems.length > 0) {
      setIsLoading(false);
    }
  }, [allItems]);

  const handleSortBarResults = (list) => {
    setSortedList(list);
  };

  return (
    <>
      <SortBar list={allItems} results={handleSortBarResults} title="Pantry" />

      {isLoading ? (
        <ProgressSpinner />
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {sortedList.map((item) => {
            return <GroceryItem key={item.id} item={item} location="pantry" />;
          })}
        </List>
      )}
    </>
  );
}
