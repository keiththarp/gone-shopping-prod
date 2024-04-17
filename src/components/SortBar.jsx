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
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import useAscendingOrder from "../hooks/useAscendingOrder";
import listSorter from "../utils/listSorter";

const sortHeaders = [
  {
    display: "Aisle",
    criteria: "aisleName",
  },
  {
    display: "Name",
    criteria: "name",
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
    useAscendingOrder("aisleName");

  useEffect(() => {
    results(listSorter(currentCriteria, ascendingOrder, list));
  }, [currentCriteria, ascendingOrder, list]);

  const { SortBarBox, ListHeader, SortMenu } = internals;

  return (
    <SortBarBox>
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
                    {currentCriteria === header.criteria &&
                      ascendingOrder &&
                      "▲ "}
                    {currentCriteria === header.criteria &&
                      !ascendingOrder &&
                      "▼ "}
                    {header.display}
                  </ListItemButton>{" "}
                </ListItem>
              );
            })}
          </List>
        </SortMenu>
      </Collapse>
    </SortBarBox>
  );
}

internals.SortBarBox = styled(Box)`
  border-block: 1px solid #000;
  margin-top: 5px;
`;

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
