import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Typography } from "@mui/material";
import ProgressSpinner from "../components/ProgressSpinner";

import SortBar from "../components/SortBar";
import GroceryItem from "../components/GroceryItem";

import { useData } from "../context/DataContext";

export default function MainListPage() {
  const { mainList } = useData();

  const [isLoading, setIsLoading] = useState(true);
  const [sortedList, setSortedList] = useState(mainList);

  const incompleteItems = sortedList.filter((item) => item.isChecked === false);
  const completedItems = sortedList.filter((item) => item.isChecked === true);

  useEffect(() => {
    if (mainList.length > 0) {
      setIsLoading(false);
    }
  }, [mainList]);

  const handleSortBarResults = (list) => {
    setSortedList(list);
  };

  return (
    <>
      <SortBar
        list={mainList}
        results={handleSortBarResults}
        title="Main List"
      />
      {isLoading ? (
        <ProgressSpinner />
      ) : (
        <Box>
          {incompleteItems.length > 0 ? (
            <>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {incompleteItems.map((item) => (
                  <GroceryItem key={item.id} item={item} location="main" />
                ))}
              </List>
            </>
          ) : (
            <Typography sx={{ textAlign: "center", paddingTop: "15px" }}>
              No items added to Main list
            </Typography>
          )}
          {completedItems.length > 0 && (
            <>
              <Typography>Completed</Typography>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {completedItems.map((item) => (
                  <GroceryItem key={item.id} item={item} location="main" />
                ))}
              </List>
            </>
          )}
        </Box>
      )}
    </>
  );
}
