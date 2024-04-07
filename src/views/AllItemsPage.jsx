import { useState, Fragment, useEffect } from "react";

import styled from "styled-components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlined from "@mui/icons-material/RemoveCircleOutlineOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Collapse } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

import ConfirmDialog from "../components/ConfirmModal";

import { useData } from "../context/DataContext";

const internals = {};

export default function AllItemsPage() {
  const { ListHeader, DeleteIcon, SortMenu } = internals;

  const { getAllItems, allItems, deleteData } = useData();

  const [expanded, setExpanded] = useState(-1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [sortDrawer, setSortDrawer] = useState(false);
  const [orderedItems, setOrderedItems] = useState(allItems);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCriteria, setCurrentCriteria] = useState("name");

  const handleSort = (criteria) => {
    setCurrentCriteria(criteria);
    const sortedList = [...allItems].sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });

    setOrderedItems(sortedList);
  };

  useEffect(() => {
    handleSort(currentCriteria);
    if (allItems.length > 0) {
      setIsLoading(false);
    }
  }, [allItems]);

  const handleUpdateFavorite = async (currentFav, id) => {
    const docRef = doc(db, "items", id);

    await updateDoc(docRef, {
      isFavorite: !currentFav,
    });
    getAllItems();
  };

  const handleClickDelete = (value) => {
    if (value) {
      deleteData("items", deleteItemId);
    }

    getAllItems();
    setShowDeleteModal(false);
  };

  const handleExpand = (itemId) => () => {
    setExpanded((prev) => (prev === itemId ? -1 : itemId));
  };

  const handleShowSortDrawer = () => {
    setSortDrawer((prev) => !prev);
  };

  const handleAddToMainList = async (currentStatus, id) => {
    const docRef = doc(db, "items", id);

    await updateDoc(docRef, {
      mainList: !currentStatus,
      rank: currentStatus ? increment(0) : increment(1),
    });

    getAllItems();
  };

  return (
    <>
      <ConfirmDialog
        isOpen={showDeleteModal}
        message={"Delete"}
        onConfirm={handleClickDelete}
      />
      <ListHeader>
        <Typography variant="h5">Pantry</Typography>
        <Button onClick={handleShowSortDrawer}>
          Sort <SwapVertIcon />
        </Button>
      </ListHeader>
      <Collapse in={sortDrawer}>
        <SortMenu>
          <List>
            <ListItem disablePadding disableGutters sx={{ display: "inline" }}>
              <ListItemButton
                sx={{ display: "inline" }}
                onClick={() => handleSort("name")}
              >
                Name
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding disableGutters sx={{ display: "inline" }}>
              <ListItemButton
                sx={{ display: "inline" }}
                onClick={() => handleSort("section")}
              >
                Sect.
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding disableGutters sx={{ display: "inline" }}>
              <ListItemButton
                sx={{ display: "inline" }}
                onClick={() => handleSort("store")}
              >
                Store
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding disableGutters sx={{ display: "inline" }}>
              <ListItemButton
                sx={{ display: "inline" }}
                onClick={() => handleSort("rank")}
              >
                Rank
              </ListItemButton>
            </ListItem>
          </List>
        </SortMenu>
      </Collapse>
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
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {orderedItems.map((item) => {
            const labelId = `${item.name}`;

            return (
              <Fragment key={item.id}>
                <ListItem
                  key={item.name}
                  sx={{ borderTop: "1px solid #e6ecf2" }}
                >
                  <Tooltip title={"delete"}>
                    <DeleteIcon
                      onClick={() => {
                        setDeleteItemId(item.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      <HighlightOffIcon />
                    </DeleteIcon>
                  </Tooltip>

                  <ListItemButton
                    role={undefined}
                    onClick={handleExpand(item.id)}
                    dense={true}
                  >
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
                    onClick={() =>
                      handleUpdateFavorite(item.isFavorite, item.id)
                    }
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

                  {!item.mainList ? (
                    <AddCircleOutlineOutlinedIcon
                      sx={{ color: "green", cursor: "pointer" }}
                      onClick={() => handleAddToMainList(false, item.id)}
                      edge="start"
                    />
                  ) : (
                    <RemoveCircleOutlineOutlined
                      sx={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleAddToMainList(true, item.id)}
                      edge="start"
                    />
                  )}
                </ListItem>
                <Collapse
                  in={expanded === item.id}
                  timeout="auto"
                  unmountOnExit
                >
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

internals.SortMenu = styled(Box)`
  display: flex;
`;

internals.DeleteIcon = styled(IconButton)`
  margin: -15px;
  &:hover {
    color: #ff0000;
  }
`;
