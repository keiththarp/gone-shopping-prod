import { useState } from "react";

import Box from "@mui/material/Box";
import styled from "styled-components";
import { Collapse } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveCircleOutlineOutlined from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import { useData } from "../context/DataContext";
import { useVisibility } from "../context/VisibilityContext";

const internals = {};

export default function GroceryItem({ item, location }) {
  const { handleAddItemModal, handleConfirmModal } = useVisibility();
  const { getAllItems } = useData();
  const [expanded, setExpanded] = useState(-1);

  const handleUpdateItem = async (action, currentVal, id) => {
    const docRef = doc(db, "items", id);

    if (action === "fav") {
      await updateDoc(docRef, {
        isFavorite: !currentVal,
      });
    }
    if (action === "mainList") {
      await updateDoc(docRef, {
        mainList: !currentVal,
        isChecked: false,
      });
    }
    if (action === "toggleCheck") {
      await updateDoc(docRef, {
        isChecked: !currentVal,
      });
    }
    getAllItems();
  };

  const handleExpand = (itemId) => {
    setExpanded((prev) => (prev === itemId ? -1 : itemId));
  };

  const { ItemContainer, DeleteIcon } = internals;

  return (
    <ItemContainer color={item.aisleAccentColor}>
      <ListItem
        key={item.name}
        disablePadding
        sx={{ borderTop: "1px solid #c4c4c4" }}
      >
        {location === "pantry" ? (
          <Tooltip title={"delete"}>
            <DeleteIcon
              onClick={() => {
                handleConfirmModal(true, "Delete", item.id, "items");
              }}
            >
              <HighlightOffIcon />
            </DeleteIcon>
          </Tooltip>
        ) : (
          <Checkbox
            onClick={() =>
              handleUpdateItem("toggleCheck", item.isChecked, item.id)
            }
            edge="start"
            checked={item.isChecked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": item.name }}
          />
        )}

        <ListItemText
          id={item.name}
          primary={item.flavor ? `${item.name}  -  ${item.flavor}` : item.name}
        />
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
          {!item.mainList ? (
            <AddCircleOutlineOutlinedIcon
              sx={{ color: "green", cursor: "pointer" }}
              edge="start"
            />
          ) : (
            <RemoveCircleOutlineOutlined
              sx={{ color: "red", cursor: "pointer" }}
              edge="start"
            />
          )}
        </IconButton>
      </ListItem>
      <Collapse in={expanded === item.id} timeout="auto" unmountOnExit>
        <Box
          sx={{
            background: "#f3f3f3",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => handleAddItemModal(true, item.id)}
            sx={{ position: "absolute", top: "5px", right: "5px" }}
          >
            <EditIcon sx={{ color: "000", fontSize: "23px" }} />
          </IconButton>
          <p>Rank: {item.rank}</p>
          <p>Preferred Store: {item.preferredStoreName || "--"}</p>
          <p>Aisle: {item.aisleName || "--"}</p>
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
    padding-left: 10px;
  `}
`;

internals.DeleteIcon = styled(IconButton)`
  margin-left: -12px;
  &:hover {
    color: #ff0000;
  }
`;
