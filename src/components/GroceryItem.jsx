import { useState } from "react";

import styled from "styled-components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import RemoveCircleOutlineOutlined from "@mui/icons-material/RemoveCircleOutlineOutlined";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { Typography } from "@mui/material";
import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";

const internals = {};

export default function GroceryItem({
  item,
  handleToggle,
  handleUpdateItem,
  handleExpand,
  expanded,
  color,
}) {
  const { ItemContainer } = internals;

  return (
    <ItemContainer color={color}>
      <ListItem
        key={item.name}
        disablePadding
        sx={{ borderTop: "1px solid #c4c4c4" }}
      >
        <ListItemButton
          role={undefined}
          onClick={() => handleToggle(item.id, item.isChecked)}
          dense={true}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={item.isChecked}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": item.name }}
            />
          </ListItemIcon>
          <ListItemText
            id={item.name}
            primary={
              item.flavor ? `${item.name}  -  ${item.flavor}` : item.name
            }
          />
        </ListItemButton>
        <IconButton
          onClick={() => handleUpdateItem("fav", item.isFavorite, item.id)}
        >
          {item.isFavorite ? (
            <StarIcon sx={{ color: "#ff0000" }} />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
        <IconButton
          aria-label="comments"
          onClick={() => {
            handleExpand(item.id);
          }}
        >
          <CommentIcon />
        </IconButton>
        <IconButton
          onClick={() => handleUpdateItem("mainList", item.mainList, item.id)}
        >
          <RemoveCircleOutlineOutlined />
        </IconButton>
      </ListItem>
      <Collapse in={expanded === item.id} timeout="auto" unmountOnExit>
        <Box
          sx={{
            background: "#f3f3f3",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <p>Rank: {item.rank}</p>
          <p>Preferred Store: {item.preferredStore || "--"}</p>
          <p>Section: {item.section || "--"}</p>
          <p>Price: {item.price || "--"}</p>
          <p>Notes: {item.notes || "--"}</p>
        </Box>
      </Collapse>
    </ItemContainer>
  );
}

internals.ItemContainer = styled(Box)`
  ${({ color }) => `
    background: rgba(${color}, 0.15);
    border-left: 10px solid rgba(${color ? color : "255, 255, 255"}, 1);
  `}
`;
