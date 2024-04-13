import styled from "styled-components";
import { Collapse, Box, List, ListItem, ListItemButton } from "@mui/material";

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

export default function SortBar({ isOpen, sort }) {
  const { SortMenu } = internals;

  return (
    <Collapse in={isOpen}>
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
                  onClick={() => sort(header.criteria)}
                >
                  {header.display}
                </ListItemButton>{" "}
              </ListItem>
            );
          })}
        </List>
      </SortMenu>
    </Collapse>
  );
}

internals.SortMenu = styled(Box)`
  display: flex;
`;
