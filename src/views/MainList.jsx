import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import SortBar from "../components/SortBar";
import GroceryItem from "../components/GroceryItem";

import { useData } from "../context/DataContext";

export default function MainListPage() {
  const { mainList } = useData();

  const [isLoading, setIsLoading] = useState(true);
  const [sortedList, setSortedList] = useState(mainList);

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "50px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
      )}
    </>
  );
}
