import { useState, Fragment } from "react";

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

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import ConfirmDialog from "../components/ConfirmModal";

import { useData } from "../context/DataContext";

const internals = {};

export default function MainListPage() {
  const { ListHeader, DeleteIcon } = internals;

  const { getAllItems, allItems, deleteItem } = useData();

  const [checked, setChecked] = useState([0]);
  const [expanded, setExpanded] = useState(-1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");

  const handleToggle = (itemId) => () => {
    const currentIndex = checked.indexOf(itemId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(itemId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleUpdateFavorite = async (currentFav, id) => {
    const docRef = doc(db, "items", id);

    await updateDoc(docRef, {
      isFavorite: !currentFav,
    });
    getAllItems();
  };

  const handleClickDelete = (value) => {
    if (value) {
      deleteItem(deleteItemId);
    }

    setShowDeleteModal(false);
  };

  const handleExpand = (itemId) => () => {
    setExpanded((prev) => (prev === itemId ? -1 : itemId));
  };

  return (
    <>
      <ConfirmDialog
        isOpen={showDeleteModal}
        message={"Delete"}
        onConfirm={handleClickDelete}
      />
      <ListHeader>
        <Typography variant="h5">All Items</Typography>
      </ListHeader>

      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {allItems.map((item) => {
          const labelId = `${item.name}`;

          return (
            <Fragment key={item.id}>
              <ListItem
                key={item.name}
                disablePadding
                sx={{ borderTop: "1px solid #c4c4c4" }}
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(item.id)}
                  dense={true}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(item.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={
                      item.flavor
                        ? `${item.name}  -  ${item.flavor}`
                        : item.name
                    }
                  />
                </ListItemButton>
                <IconButton
                  onClick={() => handleUpdateFavorite(item.isFavorite, item.id)}
                >
                  {item.isFavorite ? (
                    <StarIcon sx={{ color: "#ff0000" }} />
                  ) : (
                    <StarBorderIcon />
                  )}
                </IconButton>
                <IconButton
                  aria-label="comments"
                  onClick={handleExpand(item.id)}
                >
                  <CommentIcon />
                </IconButton>
                <DeleteIcon
                  onClick={() => {
                    setDeleteItemId(item.id);
                    setShowDeleteModal(true);
                  }}
                >
                  <RemoveCircleOutlineOutlined />
                </DeleteIcon>
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
                  <p>Preferred Store: {item.preferredStore || "--"}</p>
                  <p>Section: {item.section || "--"}</p>
                  <p>Price: {item.price || "--"}</p>
                  <p>Notes: {item.notes || "--"}</p>
                </Box>
              </Collapse>
            </Fragment>
          );
        })}
      </List>
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

internals.DeleteIcon = styled(IconButton)`
  &:hover {
    color: #ff0000;
  }
`;
