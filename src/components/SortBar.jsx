import { useState, useEffect } from "react";

import {
  Collapse,
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Button,
} from "@mui/material";
import styled from "styled-components";
import SwapVertIcon from "@mui/icons-material/SwapVert";

import useAscendingOrder from "../hooks/useAscendingOrder";
import listSorter from "../utils/listSorter";

const sortHeaders = [
  {
    display: "Name",
    criteria: "name",
  },
  {
    display: "Aisle",
    criteria: "aisleName",
  },
  {
    display: "Store",
    criteria: "preferredStoreName",
  },
  {
    display: "Rank",
    criteria: "rank",
  },
  {
    display: "Fav.",
    criteria: "isFavorite",
  },
];

const internals = {};

export default function SortBar({ list, results, title }) {
  const [showSortDrawer, setShowSortDrawer] = useState(false);

  const [ascendingOrder, currentCriteria, sendCriteria] =
    useAscendingOrder("name");

  useEffect(() => {
    results(listSorter(currentCriteria, ascendingOrder, list));
  }, [currentCriteria, ascendingOrder, list]);

  const { SortMenu, ListHeader } = internals;

  return (
    <>
      <ListHeader>
        <Typography variant="h5">{title}</Typography>
        <Button onClick={() => setShowSortDrawer((prev) => !prev)}>
          Sort <SwapVertIcon />
        </Button>
      </ListHeader>
      <Collapse in={showSortDrawer}>
        <SortMenu>
          <List>
            {sortHeaders.map((header) => {
              return (
                <ListItem
                  key={header.display}
                  disablePadding
                  disableGutters
                  sx={{ display: "inline" }}
                >
                  <ListItemButton
                    sx={{ display: "inline" }}
                    onClick={() => sendCriteria(header.criteria)}
                  >
                    {header.display}
                  </ListItemButton>{" "}
                </ListItem>
              );
            })}
          </List>
        </SortMenu>
      </Collapse>
    </>
  );
}

internals.SortMenu = styled(Box)`
  display: flex;
`;

internals.ListHeader = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-inline: 8px;
  padding: 10px 8px 0 15px;
`;
