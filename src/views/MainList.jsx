import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import CircularProgress from "@mui/material/CircularProgress";

import SortBar from "../components/SortBar";
import GroceryItem from "../components/GroceryItem";

import { useData } from "../context/DataContext";

const internals = {};

export default function MainListPage() {
  const { ListHeader } = internals;

  const { mainList } = useData();

  const [sortDrawer, setSortDrawer] = useState(false);
  const [orderedItems, setOrderedItems] = useState(mainList);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCriteria, setCurrentCriteria] = useState("name");
  const [ascendingOrder, setAscendingOrder] = useState("true");

  const handleAscendingOrder = (criteria) => {
    if (criteria === currentCriteria) {
      setAscendingOrder((prev) => !prev);
    } else {
      setCurrentCriteria(criteria);
      setAscendingOrder(true);
    }

    handleSort(criteria);
  };

  const handleSort = (criteria) => {
    const sortedList = [...mainList].sort((a, b) => {
      if (a[criteria] < b[criteria]) return ascendingOrder ? -1 : 1;
      if (a[criteria] > b[criteria]) return ascendingOrder ? 1 : -1;
      return 0;
    });

    setOrderedItems(sortedList);
  };

  useEffect(() => {
    handleSort(currentCriteria);
  }, [mainList]);

  useEffect(() => {
    if (mainList.length > 0) {
      setIsLoading(false);
    }
  }, [mainList]);

  const handleShowSortDrawer = () => {
    setSortDrawer((prev) => !prev);
  };

  return (
    <>
      <ListHeader>
        <Typography variant="h5">Main List</Typography>
        <Button onClick={handleShowSortDrawer}>
          Sort <SwapVertIcon />
        </Button>
      </ListHeader>
      <SortBar isOpen={sortDrawer} sort={handleAscendingOrder} />
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
            {orderedItems
              .filter((item) => item.isChecked === false)
              .map((item) => {
                return <GroceryItem key={item.id} item={item} />;
              })}
          </List>
          <Typography>Completed</Typography>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {orderedItems
              .filter((item) => item.isChecked === true)
              .map((item) => {
                const labelId = `${item.name}`;

                return <GroceryItem key={item.id} item={item} />;
              })}
          </List>
        </Box>
      )}
    </>
  );
}

internals.ListHeader = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-inline: 8px;
  padding: 10px 8px 0 15px;
`;
